import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import router from './routes';

const app: Application = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Application Routes
app.use('/api/v1', router);

const getController = (req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: '--Welcome to the Job Board API--',
  });
};

app.get('/', getController);

export default app;
