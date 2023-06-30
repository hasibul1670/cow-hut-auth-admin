import { StatusCodes } from 'http-status-codes';
import { Schema, model } from 'mongoose';
import ApiError from '../../../handlingError/ApiError';
import { breeds, categories, labels, locations } from './cow.constant';
import { CowModel, ICow } from './cow.interface';

export const CowSchema = new Schema<ICow, CowModel>(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    age: {
      type: Number,
      required: true,
    },

    price: {
      type: Number,
      required: true,
    },

    weight: {
      type: Number,
      required: true,
    },

    breed: {
      type: String,
      enum: breeds,
    },
    label: {
      type: String,
      enum: labels,
    },
    location: {
      type: String,
      enum: locations,
    },
    catagory: {
      type: String,
      enum: categories,
    },

    seller: {
      type: Schema.Types.ObjectId,
      ref: 'Seller',
      required: true,
    },

    profileImage: {
      type: String,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

CowSchema.pre('save', async function (next) {
  if (this.isModified('label') && this.label === 'sold out') {
    return next();
  }
  const isExist = await Cow.findOne({ name: this.name });
  if (isExist) {
    throw new ApiError(StatusCodes.CONFLICT, 'This Cow is already exist!');
  }
  next();
});


export const Cow = model<ICow, CowModel>('Cow', CowSchema);
