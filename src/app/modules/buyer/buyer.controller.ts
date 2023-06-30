import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../../shared/catchAsync';
import sendReponse from '../../../shared/sendResponse';
import { IBuyer } from './buyer.interface';
import { BuyerService } from './buyer.service';

const sendBuyerResponse = async (res: Response, message: string, data: any) => {
  sendReponse<IBuyer>(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message,
    data,
  });
};

//Get all Buyers
const getAllBuyers = catchAsync(async (req: Request, res: Response) => {
  const result = await BuyerService.getAllBuyers();
  sendBuyerResponse(res, ' All Buyer Buyers fetched successfully', result);
});

//Get a Single Buyer
const getSingleBuyer = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await BuyerService.getSingleBuyer(id);
  sendBuyerResponse(res, 'Single Buyer is found', result);
});

//Update Buyer
const updateBuyer = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await BuyerService.updateBuyer(id, req.body);
  await sendBuyerResponse(res, `Buyer is Updated successfully`, result);
});

//Delete a Single Buyer
const deleteBuyer = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await BuyerService.deleteBuyer(id);
  await sendBuyerResponse(res, `Buyer is Deleted successfully`, result);
});

export const BuyerController = {
  deleteBuyer,
  getAllBuyers,
  getSingleBuyer,
  updateBuyer,
};
