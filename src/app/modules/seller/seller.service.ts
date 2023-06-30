import { ISeller } from "./seller.interface";
import { Seller } from "./seller.model";

//getAllSeller Service Section
const getAllSellers = async () => {
  const result = await Seller.find({});
  return result;
};

//getSingleSeller Service Section
const getSingleSeller = async (id: string) => {
  const result = await Seller.findById(id);

  return result;
};
//updateSeller Service Section
const updateSeller = async (id: string, payload: Partial<ISeller>) => {
  const result = await Seller.findByIdAndUpdate({ _id: id }, payload, {
    new: true,
  })

  return result;
};
//deleteSeller Service Section
const deleteSeller = async (id: string) => {
  const result = await Seller.findByIdAndDelete(id);
  return result;
};
export const SellerService = {
  getAllSellers,
  getSingleSeller,
  deleteSeller,
  updateSeller,
};
