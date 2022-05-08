import express from 'express';
import { authRouter } from "./routes/authRoutes";
import {errorHandler} from './middlewares/app-error-handler'
import {connect} from 'mongoose';
import cookieParser from "cookie-parser";

const app = express();
app.use(express.json());
app.use(cookieParser());

connect('mongodb://auth-mongo-srv:27017/users', () => {
    console.log('connected to data base');
});

app.use('/api/users', authRouter);
app.use(errorHandler);

app.listen(5000, () => console.log('Auth service is running on port 5000...'));