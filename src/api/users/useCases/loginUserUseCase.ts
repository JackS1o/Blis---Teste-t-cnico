import { prisma } from '../../../prisma/client';
import jwt from 'jsonwebtoken';
import { AppError } from '../../../errors';
import { verifyPassword } from '../utils/passwordUtils';

export const loginUserUseCase = async (email: string, password: string) => {
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (!user) {
    throw new AppError('Invalid email or password', 401);
  }

  const isPasswordValid = await verifyPassword(password, user.password);

  if (!isPasswordValid) {
    throw new AppError('Invalid email or password', 401);
  }

  const token = jwt.sign(
    { id: user.id, email: user.email },
    process.env.JWT_SECRET as string,
    { expiresIn: '1h' }
  );

  return { token, user };
};
