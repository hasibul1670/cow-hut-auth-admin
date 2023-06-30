import { IBuyer } from './buyer.interface';
import { Buyer } from './buyer.model';

//getAllBuyer Service Section
const getAllBuyers = async () => {
  const result = await Buyer.find({});
  return result;
};

//getSingleBuyer Service Section
const getSingleBuyer = async (id: string) => {
  const result = await Buyer.findById(id);

  return result;
};
//updateBuyer Service Section
const updateBuyer = async (id: string, payload: Partial<IBuyer>) => {
  const result = await Buyer.findByIdAndUpdate({ _id: id }, payload, {
    new: true,
  })

  return result;
};
//deleteBuyer Service Section
const deleteBuyer = async (id: string) => {
  const result = await Buyer.findByIdAndDelete(id);
  return result;
};
export const BuyerService = {
  getAllBuyers,
  getSingleBuyer,
  deleteBuyer,
  updateBuyer,
};
