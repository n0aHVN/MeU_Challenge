import express, { json } from 'express';
import { productRouter } from './routes/productRouter';
import { ErrorHandlerMiddleware } from './middlewares/error-handler';
import { userRouter } from './routes/userRouter';
import cookieSession from 'cookie-session';
import { sign } from 'jsonwebtoken';
import './types/express.types';
const app = express();

app.use(json());
app.use(cookieSession({
    signed: false,
    secure: false,
}))

app.use(productRouter);
app.use(userRouter);

app.use(ErrorHandlerMiddleware);

export {app};