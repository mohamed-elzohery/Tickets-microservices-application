import express, { NextFunction, Request, Response } from 'express';
import {errorHandler,  ErrorResponse} from '@elzohery/tickets-common'
import cookieParser from "cookie-parser";
import ticketsRouter from './routes/ticketsRouter';

const app = express();
app.use(express.json());
app.use(cookieParser());

app.use('/api/tickets', ticketsRouter);

app.all('*', (req: Request, res: Response, next:NextFunction) => (
    next(new ErrorResponse(404, 'Route not found', 'NotFound')))
);
app.use(errorHandler);

export default app;