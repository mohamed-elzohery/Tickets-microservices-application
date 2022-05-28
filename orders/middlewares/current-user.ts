import { catchAsync } from "@elzohery/tickets-common";
import { ErrorResponse } from "@elzohery/tickets-common";
import {Request, Response, NextFunction} from 'express';
import jwt from 'jsonwebtoken';


interface User{
    id: string;
    email: string
}
declare global {
    namespace Express {
      interface Request {
        currentUser?: User;
      }
    }
  }

const getCurrentUser = (req:any, res:Response, next:NextFunction) => {
    const token = req.cookies['token_uid'];
    console.log(token);
    if(!token){
        return next(new ErrorResponse(401, 'Unauthenticated access', 'AuthErr'));
    }
    const decodedToken:any = jwt.verify(token, process.env.JWT_SECRET!);
    req.currentUser = decodedToken;
    next();
}

export {getCurrentUser};