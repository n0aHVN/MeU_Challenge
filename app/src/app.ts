import express, { json } from 'express';
import { productRouter } from './routes/product.router';
import { ErrorHandlerMiddleware } from './middlewares/error-handler';
import { userRouter } from './routes/user.router';
import cookieSession from 'cookie-session';
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