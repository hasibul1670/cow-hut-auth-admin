/* eslint-disable no-undef */
import { JwtPayload } from 'jsonwebtoken';
import { buildWhereConditions } from '../../../helpers/buildWhereCondition';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import { User } from '../users/user.model';
import { cowSearchableFields } from './cow.constant';
import { ICow, ICowFilters } from './cow.interface';
import { Cow } from './cow.model';
//createCow Service Section
const createCow = async (payload: ICow) => {
  const result = (await Cow.create(payload)).populate('seller');
  return result;
};
//getAllCow Service Section
const getAllCows = async (
  filters: ICowFilters,
  paginationOptions: IPaginationOptions
): Promise<IGenericResponse<ICow[]>> => {
  const { limit, page, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(paginationOptions);
  const { searchTerm, ...filtersData } = filters;

  const { whereConditions, sortConditions } = buildWhereConditions(
    searchTerm,
    filtersData,
    cowSearchableFields,
    sortBy,
    sortOrder
  );

  const result = await Cow.find(whereConditions)
    .populate('seller')
    .sort(sortConditions)
    .skip(skip)
    .limit(limit);

  const total = await Cow.countDocuments();

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};
//getSingleCow Service Section
const getSingleCow = async (id: string) => {
  const result = await Cow.findById(id).populate('seller');

  return result;
};

const updateCow = async (id: string, user: JwtPayload | null, payload: Partial<ICow>) => {

  if (!user || !user.phoneNumber) {
    throw new Error('Unauthorized');
  }

  const loggedInUser = await User.findOne({ phoneNumber: user.phoneNumber });
  const cow = await Cow.findOne({ _id: id });

  if (!loggedInUser || !cow) {
    throw new Error('User or Cow not found');
  }

  if (String(loggedInUser.seller) !== String(cow.seller)) {
    throw new Error('You are not authorized to update this Cow🐮');
  }

  const result = await Cow.findByIdAndUpdate({ _id: id }, payload, { new: true }).populate('seller');
  return result;
};

//deleteCow Service Code
const deleteCow = async (id: string, user: JwtPayload | null) => {
  if (!user || !user.phoneNumber) {
    throw new Error('Unauthorized');
  }
  const loggedInUser = await User.findOne({ phoneNumber: user.phoneNumber });
  const cow = await Cow.findOne({ _id: id });

  if (!loggedInUser || !cow) {
    throw new Error('User or Cow not found');
  }
  if (String(loggedInUser.seller) !== String(cow.seller)) {
    throw new Error('You are not authorized to delete this Cow');
  }

  const result = await Cow.findByIdAndDelete(id).populate('seller');
  return result;
};

export const CowService = {
  createCow,
  getAllCows,
  getSingleCow,
  deleteCow,
  updateCow,
};
