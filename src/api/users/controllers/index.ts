import { Request, Response } from 'express';
import { createUserUseCase } from '../useCases/createUserUseCase';

export const createUser = async (req: Request, res: Response): Promise<void> => {
  const { name, email, password } = req.body;

  const result = await createUserUseCase(name, email, password);

  res.status(201).json(result); 
};
