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

export const getOrders = catchAsync(async (req: any, res: any, next: NextFunction) => {
    const orders = await Order.find({
        userId: req.currentUser
    }).populate('ticket');

    res.status(200).json({message: 'get All Orders', data: orders});
});

export const getOrder = catchAsync(async (req: any, res: any, next: NextFunction) => {
    const {orderId} = req.body;
    const order = await Order.findById(orderId).populate('ticket');
    if(!order) return next(new ErrorResponse(404, 'Order not found', 'order'));
    if(order.userId !== req.currentUser) return next(new ErrorResponse(403, 'Unauthorized user access', 'order'));
    res.status(200).json({message: 'order is fetched successfully.', data: order, success: true});
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

    const order =  Order.build({
        expiresAt: expiration,
        status: OrderStatus.CREATED,
        userId: req.currentUser,
        ticket
    })

    await order.save();
    return res.status(201).json({message: 'created order', data: order});
});

export const cancelOrder = catchAsync(async (req: any, res: any, next: NextFunction) => {
    const {orderId} = req.body;
    const order = await Order.findById(orderId).populate('ticket');
    if(!order) return next(new ErrorResponse(404, 'Order not found', 'order'));
    if(order.userId !== req.currentUser) return next(new ErrorResponse(403, 'Unauthorized user access', 'order'));
    order.status = OrderStatus.CANCELLED;
    await order.save();
    res.status(200).json({message: 'order is deleted successfully.'});
});