import { catchAsync, ErrorResponse } from "@elzohery/tickets-common";
import { Request, Response, NextFunction } from "express";

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
    console.log(req.currentUser);
    res.status(200).json('get All Orders');
});

export const getOrder = catchAsync(async (req: Request, res: any, next: NextFunction) => {
    res.status(200).json({message: 'ticket is fetched successfully.', data: res.order, success: true});
});

export const createOrder = catchAsync(async (req: Request, res: any, next: NextFunction) => {
    // const {title, userId, price} = req.body;
    // const ticket = Ticket.build({title, userId, price});
    // await ticket.save();
    // await new TicketCreatedPublisher(natsClient.client).publish({
    //     id: ticket.id,
    //     title: ticket.title,
    //     price: ticket.price,
    //     userId: ticket.userId
    // });
    return res.status(201).json({message: 'created order'});
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