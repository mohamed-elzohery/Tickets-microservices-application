import express, { NextFunction, Request, Response } from 'express';
import { authRouter } from "./routes/authRoutes";
import {errorHandler} from './middlewares/app-error-handler'
import cookieParser from "cookie-parser";
import { ErrorResponse } from './utils/ErrorResponse';

const app = express();
app.use(express.json());
app.use(cookieParser());



app.use('/api/users', authRouter);
app.all('*', (req: Request, res: Response, next:NextFunction) => (
    next(new ErrorResponse(404, 'Route not found', 'NotFound')))
);
app.use(errorHandler);

export default app;