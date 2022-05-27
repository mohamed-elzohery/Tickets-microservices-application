import mongoose from 'mongoose';
import { OrderStatus } from '@elzohery/tickets-common';
import { TicketDoc } from './Ticket';

interface OrderAttrs {
    userId: string;
    ticket: TicketDoc;
    expiresAt: Date;
    status: OrderStatus;
}

interface OrderDoc extends mongoose.Document {
    userId: string;
    ticket: TicketDoc;
    expiresAt: Date;
    status: OrderStatus;
}

interface OrderModel extends mongoose.Model<OrderDoc> {
    build(attr: OrderAttrs): OrderDoc;
}

const orderSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: [true, 'user must be specified'],
    },
    ticket: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Ticket'
    },
    status: {
        type: String,
        enum: Object.values(OrderStatus),
        required: [true, 'Status must be specified'],
        default: OrderStatus.CREATED
    },
    expiresAt: {
        type: mongoose.Schema.Types.Date,
    }
});

orderSchema.statics.build = (attrs: OrderAttrs) => {
    return new OrderModel(attrs);
}

const OrderModel = mongoose.model<OrderDoc, OrderModel>('Order', orderSchema);

export default OrderModel;