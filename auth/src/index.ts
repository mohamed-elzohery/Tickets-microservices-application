import express from 'express';
import { authRouter } from "./routes/authRoutes";
import dotenv from 'dotenv';
import {errorHandler} from './middlewares/app-error-handler'
import mongoose, {connect} from 'mongoose';
import cookieParser from "cookie-parser";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cookieParser());

mongoose.connect('mongodb://localhost:27017/users', () => {
    console.log('connected to data base');
});

app.use('/api/users', authRouter);
app.use(errorHandler);

app.listen(5000, () => console.log('Auth service is running on port 5000...'));