import { catchAsync, ErrorResponse } from "@elzohery/tickets-common";
import { Request, Response, NextFunction } from "express";
import Ticket, {TicketDoc} from "../models/Ticket";
import {FilterQuery} from 'mongoose';

interface pagination {
    next?: {
        page: number;
        limit: number;
    };
    prev?: {
        page: number;
        limit: number;
    };
}

interface AdvancedResponse extends Response {
    adjustRes: {
        success: boolean;
        count: number;
        pagination: pagination;
        data: any;
    };
}

interface hasTicket extends Response {
    ticket?: TicketDoc
}

export const getTicketById = catchAsync(async (req: Request, res: hasTicket, next: NextFunction) => {
    const {id: ticketId} = req.params;
    const ticket = await Ticket.findById(ticketId)! as TicketDoc;
    if(ticket === null){
        next(new ErrorResponse(404, 'ticket not found', 'ticket'));
    }
    res.ticket = ticket;
    next();
});

export const getTickets = catchAsync(async (req: Request, res: AdvancedResponse, next: NextFunction) => {
    const {adjustRes} = res;
    console.log(adjustRes);
    console.log("adjustRes");
    res.status(200).json(adjustRes);
});

export const getTicket = catchAsync(async (req: Request, res: hasTicket, next: NextFunction) => {
    res.status(200).json({message: 'ticket is fetched successfully.', data: res.ticket, success: true});
});

export const createTicket = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const {title, userId, price} = req.body;
    const ticket = Ticket.build({title, userId, price});
    await ticket.save();
    return res.status(201).json({message: 'created ticket', data: ticket, success: true});
});

export const updateTicket = catchAsync(async (req: Request, res: hasTicket, next: NextFunction) => {
    const {title, userId, price} = req.body;
    const ticket = res.ticket;
    const newTicket = await Ticket.updateOne(ticket as FilterQuery<TicketDoc>, {title, userId, price}, {new: true, runValidators: true});
    res.status(200).json({message: 'ticket is updated successfully.', data: newTicket, success: true});
});