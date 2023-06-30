import mongoose from 'mongoose';
import { IGenericErrorMessage } from '../interfaces/error';

export const handleCastError = (error: mongoose.Error.CastError) => {
  const errors: IGenericErrorMessage[] = [
    { path: error.path, message: 'Invalid Error ID' },
  ];

  return {
    statusCode: 200,
    message: 'Cast Error',
    errorMessages: errors,
  };
};
