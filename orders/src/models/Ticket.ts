import mongoose from 'mongoose';
import Order, {OrderStatus} from './Order';

interface TicketAttrs {
    title: string;
    price: number;
}


export interface TicketDoc extends mongoose.Document {
    title: string;
    price: number;
    isReserved: () => Promise<Boolean>;
}

interface TicketModel extends mongoose.Model<TicketDoc> {
    build(attrs: TicketAttrs): TicketDoc;
}

const TicketSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Title is required'],
        maxlength: [120, 'Too long ticket title.'],
        lowercase: true,
        trim: true
    },
    price: {
        type: Number,
        required: [true, 'Price is required'],
        min: [1, 'Ticket price cannot be less than 1 dollar'],
        max: [999999, 'Ticket price cannot be higher than or equal 1,000,000 dollars.']
    },
},{timestamps: true});

TicketSchema.statics.build = (attrs: TicketAttrs) => {
    return new Ticket(attrs);
}

TicketSchema.methods.isReserved = async function(){
    const reservedOrder = await Order.findOne({
        ticket: this,
        status: {$in: [OrderStatus.COMPLETED, OrderStatus.AWAITING_PAYMENT, OrderStatus.CREATED]}
    });
    return !!reservedOrder;
}
const Ticket = mongoose.model<TicketDoc, TicketModel>('Ticket', TicketSchema);

export default Ticket;