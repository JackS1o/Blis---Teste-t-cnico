import { Request, Response } from 'express';
import { createUserUseCase } from '../useCases/createUserUseCase';
import { loginUserUseCase } from '../useCases/loginUserUseCase';
import { createUserDocumentUseCase } from '../useCases/createUserDocumentUseCase';
import { AppError } from '../../../errors';
import { IGetUserAuthInfoRequest } from '../types/definitionfile';
import { userAbilitiesUseCase } from '../useCases/userAbilitiesUseCase';

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

export const createUserDocument = async (
  req: IGetUserAuthInfoRequest,
  res: Response
): Promise<void> => {
  const { name } = req.body;
  const userId = req.user?.id;

  if (!userId) {
    throw new AppError('User not authenticated', 401);
  }

  if (!req.file) {
    throw new AppError('File is required', 400);
  }

  const filePath = `/uploads/${req.file.filename}`;

  const document = await createUserDocumentUseCase(userId, name, filePath);

  res.status(201).json({
    message: 'Document created successfully',
    document,
  });
};

export const userAbilities = async (
  req: IGetUserAuthInfoRequest,
  res: Response
) => {
  const { ability, years_experience } = req.body;
  const userId = req.user?.id;

  if (!userId) {
    throw new AppError('User not authenticated', 401);
  }

  const abilities = await userAbilitiesUseCase(
    ability,
    years_experience,
    userId
  );
  res.status(200).json(abilities);
};
