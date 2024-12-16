import { prisma } from '../../../prisma/client';
import { hashPassword } from '../utils/passwordUtils';
import { AppError } from '../../../errors';

export const createUserUseCase = async (
  name: string,
  birthdate: Date,
  email: string,
  password: string
) => {
  const userExists = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (userExists) {
    throw new AppError('User already exists', 409);
  }

  const hashedPassword = await hashPassword(password);

  const user = await prisma.user.create({
    data: {
      name,
      birthdate: new Date(birthdate),
      email,
      password: hashedPassword,
    },
  });

  return {
    message: 'User created successfully',
  }
};
