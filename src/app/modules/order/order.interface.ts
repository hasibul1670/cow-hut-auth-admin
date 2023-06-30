import { Model, Types } from 'mongoose';
import { IBuyer } from '../buyer/buyer.interface';
import { ICow } from '../cow/cow.interface';

export type IOrder = {
  cow: Types.ObjectId | ICow;
  buyer: Types.ObjectId | IBuyer;
};

export type OrderModel = Model<IOrder>;
