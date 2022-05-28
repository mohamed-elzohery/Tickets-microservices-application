import { catchAsync, ErrorResponse, OrderStatus } from "@elzohery/tickets-common";
import { Request, Response, NextFunction } from "express";
import Ticket from '../models/Ticket';
import Order from '../models/Order';
import mongoose from "mongoose";

const EXPIRE_SECONDS = 60 * 15;

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

// interface hasTicket extends Response {
//     ticket?: TicketDoc
// }

export const getOrderById = catchAsync(async (req: Request, res: any, next: NextFunction) => {
    // const {id: ticketId} = req.params;
    // const ticket = await Ticket.findById(ticketId)! as TicketDoc;
    // if(ticket === null){
    //     next(new ErrorResponse(404, 'ticket not found', 'ticket'));
    // }
    // res.ticket = ticket;
    next();
});

export const getOrders = catchAsync(async (req: any, res: any, next: NextFunction) => {
    const orders = await Order.find({
        userId: req.currentUser
    }).populate('ticket');

    res.status(200).json({message: 'get All Orders', data: orders});
});

export const getOrder = catchAsync(async (req: Request, res: any, next: NextFunction) => {
    res.status(200).json({message: 'ticket is fetched successfully.', data: res.order, success: true});
});

export const createOrder = catchAsync(async (req: any, res: any, next: NextFunction) => {
    const {ticketId} = req.body;
    if(!mongoose.isValidObjectId(ticketId)) return next(new ErrorResponse(400, 'not valid ticket id', 'ticketId'));

    const ticket = await Ticket.findById(ticketId);
    if(!ticket){
        return next(new ErrorResponse(404, 'Ticket not found', 'ticket'));
    }

    const isReserved = await ticket.isReserved();

    if(isReserved){
        return next(new ErrorResponse(400, 'Ticket is already reserved', 'ticket'));
    }

    const expiration = new Date();
    expiration.setSeconds(expiration.getSeconds() + EXPIRE_SECONDS);

    const order = await Order.build({
        expiresAt: expiration,
        status: OrderStatus.CREATED,
        userId: req.currentUser,
        ticket
    })

    await order.save();
    return res.status(201).json({message: 'created order', data: order});
});

export const deleteOrder = catchAsync(async (req: Request, res: any, next: NextFunction) => {
    // const {title, userId, price} = req.body;
    // const ticket = res.ticket;
    // const newTicket = await Ticket.updateOne(ticket as FilterQuery<TicketDoc>, {title, userId, price}, {new: true, runValidators: true});
    // new TicketUpdatedPublisher(natsClient.client).publish({
    //     id: ticket!.id,
    //     title,
    //     userId,
    //     price
    // })
    res.status(200).json({message: 'order is deleted successfully.'});
});