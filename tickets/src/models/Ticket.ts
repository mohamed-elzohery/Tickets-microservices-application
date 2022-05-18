import mongoose from 'mongoose';

interface TicketAttrs {
    title: string;
    price: number;
    userId: string;
}

interface TicketModel extends mongoose.Model<TicketDoc> {
    build(attrs: TicketAttrs): TicketDoc;
}

interface TicketDoc extends mongoose.Document {
    title: string;
    price: number;
    userId: string;
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
    userId: {
        type: mongoose.SchemaTypes.ObjectId,
        required: [true, 'user is undefined'],
    },
},{timestamps: true});

TicketSchema.statics.build = (attrs: TicketAttrs) => {
    return new Ticket(attrs);
}
const Ticket = mongoose.model<TicketDoc, TicketModel>('Ticket', TicketSchema);




export {TicketDoc};
export default Ticket;