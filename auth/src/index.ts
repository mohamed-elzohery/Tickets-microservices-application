import express from 'express';
import { authRouter } from "./routes/authRoutes";

const app = express();
app.use(express.json());

app.use('/api/users', authRouter);

app.listen(5000, () => console.log('Auth service is running on port 5000...'));