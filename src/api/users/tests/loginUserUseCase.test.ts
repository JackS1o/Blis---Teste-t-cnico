import { prisma } from '../../../prisma/client';
import { loginUserUseCase } from '../useCases/loginUserUseCase';
import jwt from 'jsonwebtoken';
import { AppError } from '../../../errors';
import { verifyPassword } from '../utils/passwordUtils';

jest.mock('../../../prisma/client', () => ({
  prisma: {
    user: {
      findUnique: jest.fn(),
    },
  },
}));

jest.mock('jsonwebtoken', () => ({
  sign: jest.fn(),
}));

jest.mock('../utils/passwordUtils', () => ({
  verifyPassword: jest.fn(),
}));

describe('loginUserUseCase', () => {
  const mockEmail = 'test@example.com';
  const mockPassword = 'password123';
  const mockUser = {
    id: 'user-1',
    email: mockEmail,
    password: 'hashedPassword',
  };
  const mockToken = 'mock-jwt-token';

  it('Deve fazer login com sucesso e retornar o token e o usuário', async () => {
    (prisma.user.findUnique as jest.Mock).mockResolvedValue(mockUser);
    (verifyPassword as jest.Mock).mockResolvedValue(true);
    (jwt.sign as jest.Mock).mockReturnValue(mockToken);

    const result = await loginUserUseCase(mockEmail, mockPassword);

    expect(result).toEqual({
      token: mockToken,
      user: mockUser,
    });
    expect(prisma.user.findUnique).toHaveBeenCalledWith({ where: { email: mockEmail } });
    expect(verifyPassword).toHaveBeenCalledWith(mockPassword, mockUser.password);
    expect(jwt.sign).toHaveBeenCalledWith(
      { id: mockUser.id, email: mockUser.email },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );
  });

  it('Deve lançar erro se o email não existir', async () => {
    (prisma.user.findUnique as jest.Mock).mockResolvedValue(null);

    await expect(loginUserUseCase(mockEmail, mockPassword)).rejects.toThrow(
      new AppError('Invalid email or password', 401)
    );
  });

  it('Deve lançar erro se a senha estiver incorreta', async () => {
    (prisma.user.findUnique as jest.Mock).mockResolvedValue(mockUser);
    (verifyPassword as jest.Mock).mockResolvedValue(false);

    await expect(loginUserUseCase(mockEmail, mockPassword)).rejects.toThrow(
      new AppError('Invalid email or password', 401)
    );
  });

  it('Deve gerar o token corretamente', async () => {
    (prisma.user.findUnique as jest.Mock).mockResolvedValue(mockUser);
    (verifyPassword as jest.Mock).mockResolvedValue(true);
    (jwt.sign as jest.Mock).mockReturnValue(mockToken);

    const result = await loginUserUseCase(mockEmail, mockPassword);

    expect(result.token).toBe(mockToken);
    expect(jwt.sign).toHaveBeenCalled();
  });
});
