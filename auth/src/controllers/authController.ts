import { catchAsync } from "../middlewares/async-error-handler";
import { ErrorResponse } from "../utils/ErrorResponse";
import {User} from '../models/User';
import {Request, Response, NextFunction} from 'express';
import jwt from 'jsonwebtoken';


const register = catchAsync(async (req:Request, res:Response, next: NextFunction) => {
    const {username, email, password} = req.body;
    const user: any = await User.create({username, email, password});
    const token = user.createToken();
    res.cookie('token_uid', token, {
        httpOnly: true,
        expires: new Date(Date.now() + +process.env.JWT_AGE!),
        path: '/'
    });
    res.json({success: true, data: user, token, message: 'User created successfully.'});
})

const login = catchAsync(async (req:Request, res:Response, next: NextFunction) => {
    const {email, password: enteredPassword} = req.body;
    if(!(email && enteredPassword)){
        return next(new ErrorResponse(400, 'Please enter email and password.', 'LoginErr'));
    }
    const user: any = await User.findOne({email});
    if(!(user !== null && await user.isPasswordsMatched(enteredPassword))){
        return next(new ErrorResponse(400, 'Invalid email or password.', 'LoginErr'))
    }
    const token = user.createToken();
    res.cookie('token_uid', token, {
        httpOnly: true,
        expires: new Date(Date.now() + +process.env.JWT_AGE!),
        path: '/'
    });
    res.json({success: true, data: user, token, message: 'User is logged in successfully.'});
})

const logout = (req:Request, res:Response, next: NextFunction ) => {
    res.clearCookie('token_uid');
    res.json({success: true, message: 'User is logged out.'});
}

const getCurrentUser = catchAsync(async (req:Request, res:Response, next: NextFunction) => {
   const token = req.cookies['token_uid'];
   if(!token){
        return res.send({success: true, data: {currentUser: null}, message: 'token is not available.'});
   }
   const decodedToken:any = jwt.verify(token, process.env.JWT_SECRET!);
   const id = decodedToken.id;
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
       return res.send({success: true, data: {currentUser: null}, message: 'token is not valid.'});
    }
    const user = await User.findById(decodedToken.id);
    if(!user){
    return res.send({success: true, data: {currentUser: null}, message: 'token is not valid.'});
    }
    res.send({success: true, data: {currentUser: user}, message: 'valid token'})
})

export {register, login, getCurrentUser, logout};