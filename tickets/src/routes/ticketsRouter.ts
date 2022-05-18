import {Router} from 'express';
import Ticket from '../models/Ticket';
import { advResults } from '@elzohery/tickets-common';
import { createTicket, getTickets, getTicket, updateTicket, getTicketById } from '../controllers/ticketsControllers';


const ticketsRouter = Router();

ticketsRouter.route('/')
                .post(createTicket)
                .get(advResults(Ticket), getTickets);

ticketsRouter.route('/:id').all(getTicketById).get(getTicket).patch(updateTicket);

export default ticketsRouter;