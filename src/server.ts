import express, { Express } from 'express';
import path from 'path';
import morgan from 'morgan';
import { config } from 'dotenv';
config();

import './db';
// All Routes
import userRoutes from './routes/userRoutes';
import routeRoutes from './routes/routeRoutes';

const app: Express = express();
const PORT: number = parseInt(process.env.PORT!) ?? 5000;

app.use(express.json());
if (process.env.NODE_ENV === 'development') app.use(morgan('dev'));
// Routes
app.use('/user', userRoutes);
app.use('/routes', routeRoutes);

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'client', 'build')));
  app.get('*', (_, res) => {
    res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
  });
}

app.listen(PORT, () => {
  console.log(`Server started on PORT ${PORT}`);
});
