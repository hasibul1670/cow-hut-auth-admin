/* eslint-disable no-unused-vars */
import { Model, Types } from 'mongoose';
import { IBuyer } from '../buyer/buyer.interface';
import { ISeller } from '../seller/seller.interface';

export type IUser = {
  id: string;
  role: string;
  password: string;
  phoneNumber: string;
  seller?: Types.ObjectId | ISeller;
  buyer?: Types.ObjectId | IBuyer;
};

export type UserModel = {
  isUserExist(
    phoneNumber: string
  ): Promise<Pick<IUser, 'phoneNumber' | 'password' | 'role'>>;
  isPasswordMatched(
    givenPassword: string,
    savedPassword: string
  ): Promise<boolean>;
} & Model<IUser>;
