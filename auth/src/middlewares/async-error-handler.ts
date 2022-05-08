import { Request, Response, NextFunction } from "express";

const asyncErrorHandler = (fn: Function) => async (req: Request, res: Response, next: NextFunction) => {
    try{
        await fn(req, res, next);
    }catch(err){
        next(err);
    }
}

export {asyncErrorHandler as catchAsync};