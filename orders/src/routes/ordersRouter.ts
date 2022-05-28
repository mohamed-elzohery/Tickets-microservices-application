import express from 'express';
import {
    getOrders,
    createOrder,
    getOrder,
    cancelOrder
} from '../controllers/ordersController';
import {getCurrentUser} from '../../middlewares/current-user'
import { advResults } from '@elzohery/tickets-common';
const ordersRouter = express.Router();

ordersRouter.use(getCurrentUser)
ordersRouter.route('/')
            .get(getOrders)
            .post(createOrder);

ordersRouter.route(':/id').get(getOrder)

ordersRouter.route(':/id/cancel').post(cancelOrder)

export default ordersRouter;