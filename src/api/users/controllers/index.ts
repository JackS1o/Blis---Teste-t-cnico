import { Request, Response } from 'express';
import { createUserUseCase } from '../useCases/createUserUseCase';
import { loginUserUseCase } from '../useCases/loginUserUseCase';

export const createUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { name, email, birthdate, password } = req.body;

  const result = await createUserUseCase(name, birthdate, email, password);

  res.status(201).json(result);
};

export const login = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;
  const { token, user } = await loginUserUseCase(email, password);

  res.status(200).json({
    message: 'Login successful',
    token,
    user: { id: user.id, email: user.email, name: user.name },
  });
};


