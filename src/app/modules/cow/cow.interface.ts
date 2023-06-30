import { Model, Types } from 'mongoose';
import { ISeller } from '../seller/seller.interface';

export type Location =
  | 'Dhaka'
  | 'Chattogram'
  | 'Barishal'
  | 'Rajshahi'
  | 'Sylhet'
  | 'Comilla'
  | 'Rangpur'
  | 'Mymensingh';
export type Breed =
  | 'Brahman'
  | 'Nellore'
  | 'Sahiwal'
  | 'Gir'
  | 'Indigenous'
  | 'Tharparkar'
  | 'Kankrej';

export type Category = 'Dairy' | 'Beef' | 'DualPurpose';
export type Label = 'for sale' | 'sold out';

export type ICow = {
  name: string;
  age: number;
  price: number;
  location: Location;
  breed: Breed;
  weight: number;
  catagory: Category;
  label: Label;
  seller: Types.ObjectId | ISeller;
  profileImage?: string;
};

export type CowModel = Model<ICow, Record<string, unknown>>;

export type ICowFilters = {
  searchTerm?: string;
  id?: string;
  location?: string;
  breed?: string;
  name?: string;
  price?: number;
  minPrice?: number;
  maxPrice?: number;
};
