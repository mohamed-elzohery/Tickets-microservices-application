import { catchAysnc } from "../middlewares/async-error-handler";
import { ErrorResponse } from "../utils/ErrorResponse";
import {User} from '../models/User';
import {Request, Response, NextFunction} from 'express';

const register = catchAysnc(async (req:Request, res:Response, next: NextFunction) => {
    const {username, email, password} = req.body;
    const user: any = await User.create({username, email, password});
    const token = user.createToken();
    res.json({success: true, data: user, token, message: 'User created successfully.'});
})

const login = catchAysnc(async (req:Request, res:Response, next: NextFunction) => {
    const {email, password: enteredPassword} = req.body;
    if(!(email && enteredPassword)){
        return next(new ErrorResponse(400, 'Please enter email and password.', 'LoginErr'));
    }
    const user: any = await User.findOne({email});
    if(!(user !== null && await user.isPasswordsMatched(enteredPassword))){
        return next(new ErrorResponse(400, 'Invalid email or password.', 'LoginErr'))
    }
    const token = user.createToken();
    res.json({success: true, data: user, token, message: 'User is logged in successfully.'});
})

const signout = () => {}

const getCurrentUser = () => {

}


export {register, login};