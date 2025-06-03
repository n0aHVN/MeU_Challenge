import express, { json } from 'express';
import { productRouter } from './routes/productRouter';
import { ErrorHandlerMiddleware } from './middlewares/error-handler';

const app = express();

app.use(json());
app.use(productRouter);

app.use(ErrorHandlerMiddleware);

export {app};