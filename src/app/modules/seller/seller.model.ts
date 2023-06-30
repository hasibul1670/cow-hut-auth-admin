import  { Schema, model } from 'mongoose';
import { ISeller, SellerModel } from './seller.interface';

export const SellerSchema = new Schema<ISeller, SellerModel>(
  {
    id: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: {
        firstName: {
          type: String,
          required: true,
        },
        lastName: {
          type: String,
          required: true,
        },
      },
      required: true,    
    },
    address: {
      type: String,
      required: true,
    },
    income: {
      type: Number,
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

export const Seller = model<ISeller>('Seller', SellerSchema);
