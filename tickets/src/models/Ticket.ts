import mongoose from 'mongoose';

interface TicketAttrs {
    title: string;
    price: number;
    userId: string;
}

interface TicketDoc extends mongoose.Document {
    title: string;
    price: number;
    userId: string;
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
    userId: {
        type: mongoose.SchemaTypes.ObjectId,
        required: [true, 'user is undefined'],
    }
},{timestamps: true});

const Ticket = mongoose.model('Ticket', TicketSchema);

export default Ticket;