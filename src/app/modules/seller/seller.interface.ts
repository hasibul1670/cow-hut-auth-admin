import { Model } from 'mongoose';

export type UserName = {
  firstName: string;
  lastName: string;
};

export type ISeller = {
  id: string;
  name: UserName;
  address: string;
  income: number;
  profileImage?: string;
};

export type SellerModel = Model<ISeller>;

export type ISellerFilters = {
  searchTerm?: string;
  id?: string;
};
