import { Request, Response, NextFunction } from "express";

export const getTickets = (req: Request, res: Response, next: NextFunction) => {
    res.status(200).json({message: 'tickets are here'});
} 

export const createTicket = (req: Request, res: Response, next: NextFunction) => {
    res.status(201).json({message: 'created ticket'});
} 