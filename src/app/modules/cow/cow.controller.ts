import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { paginationFields } from '../../../constants/pagination';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendReponse from '../../../shared/sendResponse';
import { cowFilterableFields } from './cow.constant';
import { ICow } from './cow.interface';
import { CowService } from './cow.service';

const sendCowResponse = async (res: Response, message: string, data: any) => {
  sendReponse<ICow>(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message,
    data,
  });
};
//create a Cow
const createCow = catchAsync(async (req: Request, res: Response) => {
  const { ...CowData } = req.body;
  const result = await CowService.createCow(CowData);
  sendCowResponse(res, 'Cow is created successfully', result);
});

//Get all Cows
const getAllCows = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, cowFilterableFields);
  const paginationOptions = pick(req.query, paginationFields);

  const result = await CowService.getAllCows(filters, paginationOptions);

  sendCowResponse(res, ' All Cow Cows fetched successfully', result);
});
//Get a Single Cow
const getSingleCow = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await CowService.getSingleCow(id);
  sendCowResponse(res, 'Single Cow is found', result);
});
//Update Cow;

const updateCow = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const { user } = req;
  const result = await CowService.updateCow(id, user, req.body);
  await sendCowResponse(res, `Cow is updated successfully`, result);
});

//Delete a Single Cow
const deleteCow = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const { user } = req;
  const result = await CowService.deleteCow(id, user);
  await sendCowResponse(res, `Cow is Deleted successfully`, result);
});
export const CowController = {
  createCow,
  deleteCow,
  getAllCows,
  getSingleCow,
  updateCow,
};
