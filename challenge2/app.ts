import express, { json } from 'express';
import { getProductRouter } from './routes/getProductRouter';

const app = express();

app.use(json());
app.use(getProductRouter);

export {app};