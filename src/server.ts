import express, { Express } from 'express';
import morgan from 'morgan';
import { config } from 'dotenv';
config();

import './db';
import userRoutes from './routes/userRoutes';

const app: Express = express();
const PORT: number = parseInt(process.env.PORT!) ?? 5000;

app.use(express.json())
if (process.env.NODE_ENV === 'development') app.use(morgan('dev'));
// Routes
app.use('/user', userRoutes);

app.listen(PORT, () => {
  console.log(`Server started on PORT ${PORT}`);
});
