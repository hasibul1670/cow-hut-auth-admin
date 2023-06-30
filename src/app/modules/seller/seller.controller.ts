import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../../shared/catchAsync';
import sendReponse from '../../../shared/sendResponse';
import { ISeller } from './seller.interface';
import { SellerService } from './seller.service';

const sendSellerResponse = async (
  res: Response,
  message: string,
  data: any
) => {
  sendReponse<ISeller>(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message,
    data,
  });
};

//Get all Sellers
const getAllSellers = catchAsync(async (req: Request, res: Response) => {
  const result = await SellerService.getAllSellers();
  sendSellerResponse(res, ' All Seller Sellers fetched successfully', result);
});

//Get a Single Seller
const getSingleSeller = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await SellerService.getSingleSeller(id);
  sendSellerResponse(res, 'Single Seller is found', result);
});

//Update Seller
const updateSeller = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await SellerService.updateSeller(id, req.body);
  await sendSellerResponse(res, `Seller is Updated successfully`, result);
});

//Delete a Single Seller
const deleteSeller = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await SellerService.deleteSeller(id);
  await sendSellerResponse(res, `Seller is Deleted successfully`, result);
});

export const SellerController = {
  deleteSeller,
  getAllSellers,
  getSingleSeller,
  updateSeller,
};
