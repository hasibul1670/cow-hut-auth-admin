import cors from 'cors';
import express, { Application } from 'express';
import { StatusCodes } from 'http-status-codes';
import morgan from 'morgan';
import globalErrorHandler from './app/middlewares/globalErrorHandler';
import routes from './app/routes';

import cookieParser from 'cookie-parser';
const app: Application = express();

app.use(cors());
app.use(morgan('dev'));
app.use(cookieParser());

//parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/v1', routes);

app.get('/', async (req, res) => {
  res.send(
    `Welcome to Cow Hut Application running on https://cow-hut-ten.vercel.app/`
  );
});

app.use(globalErrorHandler);

//handle Not Found ROute
app.use((req, res) => {
  res.status(StatusCodes.NOT_FOUND).json({
    success: false,
    message: 'Route Not Found',
    errorMessage: [
      {
        path: req.originalUrl,
        message: 'API Not Found',
      },
    ],
  });
});

export default app;
