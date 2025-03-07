import express, { Application, Request, Response } from 'express';
import cors from 'cors';

const app: Application = express();

// Middlewares
app.use(cors());
app.use(express.json());

const getController = (req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: '--Welcome to the Job Board API--',
  });
};

app.get('/', getController);

export default app;
