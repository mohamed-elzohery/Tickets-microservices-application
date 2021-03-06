import express, { NextFunction, Request, Response } from 'express';
import { authRouter } from "./routes/authRoutes";
import {errorHandler,  ErrorResponse} from '@elzohery/tickets-common'
import cookieParser from "cookie-parser";

const app = express();
app.use(express.json());
app.use(cookieParser());



app.use('/api/users', authRouter);
app.all('*', (req: Request, res: Response, next:NextFunction) => (
    next(new ErrorResponse(404, 'Route not found', 'NotFound')))
);
app.use(errorHandler);

export default app;