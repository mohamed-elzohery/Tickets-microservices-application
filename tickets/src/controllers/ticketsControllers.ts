import { catchAsync } from "@elzohery/tickets-common";
import { Request, Response, NextFunction } from "express";
import Ticket from "../models/Ticket";

export const getTickets = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    res.status(200).json({message: 'tickets are here'});
});

export const createTicket = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const {body} = req;
    await Ticket.create(body);
    return res.status(201).json({message: 'created ticket'});
});