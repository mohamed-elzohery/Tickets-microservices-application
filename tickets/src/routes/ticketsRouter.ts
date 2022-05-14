import {Router} from 'express';
import { createTicket, getTickets } from '../controllers/ticketsControllers';

const ticketsRouter = Router();

ticketsRouter.route('/')
                .post(createTicket)
                .get(getTickets);

export default ticketsRouter;