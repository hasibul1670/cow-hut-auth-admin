import { Model } from 'mongoose';

export type UserName = {
  firstName: string;
  lastName: string;
};

export type IBuyer = {
  id: string;
  name: UserName;
  address: string;
  budget: number;
  profileImage?: string;
};

export type BuyerModel = Model<IBuyer>;

export type IBuyerFilters = {
  searchTerm?: string;
  id?: string;
  name?: string;
};
