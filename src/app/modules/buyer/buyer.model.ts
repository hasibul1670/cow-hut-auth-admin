import { Schema, model } from 'mongoose';
import { BuyerModel, IBuyer } from './buyer.interface';

export const BuyerSchema = new Schema<IBuyer, BuyerModel>(
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
    budget: {
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

export const Buyer = model<IBuyer>('Buyer', BuyerSchema);
