import { prisma } from '../../../prisma/client';
import { hashPassword } from '../utils/passwordUtils';
import { AppError } from '../../../errors';
import axios from 'axios';

export const createUserUseCase = async (
  name: string,
  birthdate: Date,
  email: string,
  password: string
) => {
  const apiBonusUrl = process.env.API_BONUS;

  if (!apiBonusUrl) {
    throw new AppError('API_BONUS environment variable is not set', 500);
  }

  const userExists = await prisma.user.findUnique({
    where: { email },
  });

  if (userExists) {
    throw new AppError('User already exists', 409);
  }

  const hashedPassword = await hashPassword(password);

  const { data } = await axios.get(apiBonusUrl);

  const user = await prisma.user.create({
    data: {
      name,
      birthdate,
      email,
      password: hashedPassword,
    },
  });

  await prisma.dogProfilePictures.create({
    data: {
      user_id: user.id,
      url: data.message,
    },
  });

  return { message: 'User created successfully' };
};

