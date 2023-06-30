/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import bcrypt from 'bcrypt';
import { StatusCodes } from 'http-status-codes';
import { JwtPayload } from 'jsonwebtoken';
import mongoose from 'mongoose';
import config from '../../../config/index';
import { ENUM_USER_ROLE } from '../../../enums/user';
import ApiError from '../../../handlingError/ApiError';
import { Admin } from '../admin/admin.model';
import { IBuyer } from '../buyer/buyer.interface';
import { Buyer } from '../buyer/buyer.model';
import { Cow } from '../cow/cow.model';
import { IOrder } from '../order/order.interface';
import { Order } from '../order/order.model';
import { ISeller } from '../seller/seller.interface';
import { Seller } from '../seller/seller.model';
import { IUser } from './user.interface';
import { User } from './user.model';
import { generateBuyerId, generateSellerId } from './user.util';

//create A seller
const createSeller = async (
  seller: ISeller,
  user: IUser
): Promise<IUser | null> => {
  if (!user.password) {
    user.password = config.default_user_pass as string;
  }
  user.role = 'seller';

  let newUserAllData = null;
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    const id = await generateSellerId();
    user.id = id; //s-00001
    seller.id = id; //s-00001

    const newSeller = await Seller.create([seller], { session });

    if (!newSeller.length) {
      throw new ApiError(StatusCodes.BAD_REQUEST, 'Failed to create Seller');
    }

    user.seller = newSeller[0]._id;
    const newUser = await User.create([user], { session });

    if (!newUser.length) {
      throw new ApiError(StatusCodes.BAD_REQUEST, 'Failed to create user');
    }
    newUserAllData = newUser[0];

    await session.commitTransaction();
    await session.endSession();
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    throw error;
  }

  if (newUserAllData) {
    newUserAllData = await User.findOne({ id: newUserAllData.id }).populate({
      path: 'seller',
    });
  }
  return newUserAllData;
};

//create a buyer
const createbuyer = async (
  buyer: IBuyer,
  user: IUser
): Promise<IUser | null> => {
  if (!user.password) {
    user.password = config.default_user_pass as string;
  }
  user.role = 'buyer';

  let newUserAllData = null;
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    const id = await generateBuyerId();
    user.id = id;
    buyer.id = id;

    const newBuyer = await Buyer.create([buyer], { session });

    if (!newBuyer.length) {
      throw new ApiError(StatusCodes.BAD_REQUEST, 'Failed to create buyer');
    }

    user.buyer = newBuyer[0]._id;

    const newUser = await User.create([user], { session });

    if (!newUser.length) {
      throw new ApiError(StatusCodes.BAD_REQUEST, 'Failed to create user');
    }
    newUserAllData = newUser[0];

    await session.commitTransaction();
    await session.endSession();
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    throw error;
  }

  if (newUserAllData) {
    newUserAllData = await User.findOne({ id: newUserAllData.id }).populate({
      path: 'buyer',
    });
  }

  return newUserAllData;
};

//getAllUser Service Section
const getAllUsers = async () => {
  const result = await User.find({}).populate('seller').populate('buyer');
  return result;
};

//getSingleUser Service Section
const getSingleUser = async (id: string) => {
  const result = await User.findById(id).populate('seller').populate('buyer');
  return result;
};

//deleteUser Service Section
const deleteUser = async (id: string) => {
  const user = await User.findById(id);
  if (!user) {
    throw new ApiError(StatusCodes.NOT_FOUND, 'User not found');
  }

  const result = await User.findByIdAndDelete(id);

  let buyerDelete = null;
  let sellerDelete = null;

  if (user.buyer) {
    buyerDelete = await Buyer.findByIdAndDelete({ _id: user.buyer });
  }
  if (user.seller) {
    sellerDelete = await Seller.findByIdAndDelete({ _id: user.seller });
  }
  return { result, buyerDelete, sellerDelete };
};

//order a Cowwww

const orderCow = async (order: IOrder) => {
  const session = await mongoose.startSession();
  let newOrderData = null;
  try {
    session.startTransaction();

    const cow = await Cow.findById(order.cow).session(session);
    if (!cow) {
      throw new Error('Cow not found');
    }
    // Check if the cow is available for sale
    if (cow.label !== 'for sale') {
      throw new Error('The cow is not available for sale');
    }

    // Find the seller
    const seller = await Seller.findById(cow.seller).session(session);
    if (!seller) {
      throw new Error('Seller not found');
    }

    // Find the buyer
    const buyer = await Buyer.findById(order.buyer).session(session);
    if (!buyer) {
      throw new Error('Buyer not found');
    }
    // Check if the buyer has enough budget to buy the cow
    if (buyer.budget < cow.price) {
      throw new Error('Buyer does not have enough budget to buy the cow');
    }

    // Update the cow's status to sold
    cow.label = 'sold out';
    await cow.save();

    // Transfer money from buyer to seller
    seller.income += cow.price;
    buyer.budget -= cow.price;
    await seller.save();
    await buyer.save();

    const newOrder = await Order.create(
      {
        cow: cow._id,
        buyer: buyer._id,
      },
      { session }
    );

    newOrderData = newOrder[0];

    // Populate the 'buyer' field in the newOrder document
    const populatedOrder = await Order.findById(newOrderData._id)
      .populate('buyer')
      .populate('cow');

    await session.commitTransaction();
    await session.endSession();
    return populatedOrder;
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    throw error;
  }
};

const getAllOrders = async (user: JwtPayload | null) => {
  if (!user) {
    throw new Error('Unauthorized');
  }
  let orders;
  if (user.role === ENUM_USER_ROLE.BUYER) {
    const buyer = await User.findOne({ phoneNumber: user.phoneNumber });
    if (!buyer) {
      throw new Error('Buyer not found');
    }
    orders = await Order.find({ buyer: buyer.buyer })
      .populate('cow')
      .populate('buyer');
  } else if (user.role === ENUM_USER_ROLE.SELLER) {
    const loggedInSeller = await User.findOne({
      phoneNumber: user.phoneNumber,
    });
    if (!loggedInSeller) {
      throw new Error('Seller not found');
    }

    const cowSeller = await Cow.find({ seller: loggedInSeller.seller });

    orders = await Order.find({ cow: { $in: cowSeller } })
      .populate({
        path: 'cow',
        populate: {
          path: 'seller',
          model: 'Seller',
        },
      })
      .populate('buyer');
  } else if (user.role === ENUM_USER_ROLE.ADMIN) {
    orders = await Order.find({}).populate('cow').populate('buyer');
  }
  return orders;
};

const myProfile = async (user: JwtPayload | null) => {
  if (!user) {
    throw new Error('Unauthorized');
  }
  let result;

  if (user.role === ENUM_USER_ROLE.BUYER) {
    const buyer = await User.findOne({ phoneNumber: user.phoneNumber });
    if (!buyer) {
      throw new Error('Buyer not found');
    }
    result = await User.find({ buyer: buyer.buyer }).populate('buyer');
  } else if (user.role === ENUM_USER_ROLE.SELLER) {
    const seller = await User.findOne({ phoneNumber: user.phoneNumber });
    if (!seller) {
      throw new Error('seller not found');
    }
    result = await User.find({ seller: seller.seller }).populate('seller');
  } else if (user.role === ENUM_USER_ROLE.ADMIN) {
    result = await Admin.findOne({ phoneNumber: user.phoneNumber });
    if (!result) {
      throw new Error('admin not found');
    }
  }

  return result;
};

//updateUser Service Section

const updateUserProfile = async (user: JwtPayload | null, payload: any) => {
  if (!user) {
    throw new Error('Unauthorized');
  }

  if (payload.password) {
    const hashedPassword = await bcrypt.hash(
      payload.password,
      Number(config.default_salt_rounds)
    );
    payload.password = hashedPassword;
  }

  let result;

  if (user.role === ENUM_USER_ROLE.BUYER) {
    const buyer = await User.findOne({ phoneNumber: user.phoneNumber });
    if (!buyer) {
      throw new Error('Buyer not found');
    }

    result = await User.findOneAndUpdate(
      { phoneNumber: user.phoneNumber },
      { password: payload.password },
      { new: true }
    ).populate('buyer');
    const id = buyer?.buyer;
    await Buyer.findByIdAndUpdate({ _id: id }, payload, {
      new: true,
    });
  } else if (user.role === ENUM_USER_ROLE.SELLER) {
    const seller = await User.findOne({ phoneNumber: user.phoneNumber });
    if (!seller) {
      throw new Error('seller not found');
    }

    result = await User.findOneAndUpdate(
      { phoneNumber: user.phoneNumber },
      { password: payload.password },
      { new: true }
    ).populate('seller');
    const id = seller?.seller;
    await Seller.findByIdAndUpdate({ _id: id }, payload, {
      new: true,
    });
  } else if (user.role === ENUM_USER_ROLE.ADMIN) {
    result = await Admin.findOneAndUpdate(
      { phoneNumber: user.phoneNumber },
      payload,
      { new: true }
    );
  }

  return result;
};

const getSingleOrder = async (id: string) => {
  const result = await Order.findById(id).populate('cow').populate('buyer');
  return result;
};

export const UserService = {
  createSeller,
  getSingleOrder,
  createbuyer,
  orderCow,
  getAllOrders,
  deleteUser,
  updateUserProfile,
  getSingleUser,
  getAllUsers,
  myProfile,
};
