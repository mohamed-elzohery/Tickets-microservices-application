import {ErrorResponse} from '../utils/ErrorResponse';
import { Request, Response, NextFunction } from 'express';

const errorHandler = (err: any, req: Request, res: Response, next: NextFunction): void => {
    let {message, code, name} = err;
    const error:any = new ErrorResponse( code || 500, message || 'Server Error', name || 'unknown error');
    //handle non-mongoose-ObjectID-like values.
    if(err.name && err.name === 'CastError'){
        error.message = 'Cannot find',
        error.code = 404;
    }

    //Schema validation errors
    //handle normal validation errors.
    if(err.name && err.name === 'ValidationError'){
        error.message = Object.keys(err.errors).map(error => err.errors[error].properties.message),
        error.code = 400
    }

    if(err.name && err.name === 'JsonWebTokenError'){
        error.message = 'Token is not valid',
        error.code = 400
    }

    //handle duplicate key error.
    if(err.code && err.code === 11000){
        error.message = 'Email is taken',
        error.code = 400;
    }

    //handle unique key validation
    res.status(error.code).json({error, success: false});
}

export {errorHandler};