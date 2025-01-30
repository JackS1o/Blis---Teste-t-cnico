import express, { Request, Response, NextFunction } from 'express';
import routes from '../api/routes';
import { errorHandler } from '../errors';
import { AppError } from '../errors';
import path from 'path';
import cors from 'cors';

const app = express();

app.use(cors());

app.use(express.json());

app.use('/uploads', express.static(path.resolve(__dirname, '../uploads')));

app.use('/users', routes.users);
app.use('/abilities', routes.abilities);

app.use(
  (err: Error | AppError, req: Request, res: Response, next: NextFunction) => {
    errorHandler(err, req, res, next);
  }
);

export default app;
