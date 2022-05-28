import express from 'express';
import {
    getOrders,
    createOrder,
    getOrder,
    deleteOrder
} from '../controllers/ordersController';
import {getCurrentUser} from '../../middlewares/current-user'
import { advResults } from '@elzohery/tickets-common';
const ordersRouter = express.Router();

// ordersRouter.route('*').all(getCurrentUser);

ordersRouter.route('/')
            .get(getOrders)
            .post(createOrder);

ordersRouter.route(':/id')
            .get(getOrder)
            .delete(deleteOrder)

export default ordersRouter;