import { createUserUseCase } from '../useCases/createUserUseCase';
import { AppError } from '../../../errors';
import { prisma } from '../../../prisma/client';
import { hashPassword } from '../utils/passwordUtils';
import axios from 'axios';

jest.mock('../../../prisma/client', () => ({
  prisma: {
    user: {
      findUnique: jest.fn(),
      create: jest.fn(),
    },
    dogProfilePictures: {
      create: jest.fn(),
    },
  },
}));

jest.mock('../utils/passwordUtils', () => ({
  hashPassword: jest.fn(),
}));

jest.mock('axios');

describe('createUserUseCase', () => {
  const mockUser = {
    id: '1',
    name: 'John Doe',
    birthdate: new Date('1990-01-01'),
    email: 'johndoe@example.com',
    password: 'hashed_password',
  };

  const mockDogImage = { message: 'https://dog.ceo/api/img/dog1.jpg' };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('Deve criar um usuário com sucesso', async () => {
    (prisma.user.findUnique as jest.Mock).mockResolvedValue(null);

    (hashPassword as jest.Mock).mockResolvedValue('hashed_password');

    (axios.get as jest.Mock).mockResolvedValue({ data: mockDogImage });

    (prisma.user.create as jest.Mock).mockResolvedValue(mockUser);

    (prisma.dogProfilePictures.create as jest.Mock).mockResolvedValue({});

    process.env.API_BONUS = 'https://fakeapi.com/dog';

    const result = await createUserUseCase(
      'John Doe',
      new Date('1990-01-01'),
      'johndoe@example.com',
      '123456'
    );

    expect(result).toEqual({
      message: 'User created successfully',
    });

    expect(prisma.user.findUnique).toHaveBeenCalledWith({
      where: { email: 'johndoe@example.com' },
    });
    expect(hashPassword).toHaveBeenCalledWith('123456');
    expect(axios.get).toHaveBeenCalledWith(process.env.API_BONUS);
    expect(prisma.user.create).toHaveBeenCalledWith({
      data: {
        name: 'John Doe',
        birthdate: new Date('1990-01-01'),
        email: 'johndoe@example.com',
        password: 'hashed_password',
      },
    });
    expect(prisma.dogProfilePictures.create).toHaveBeenCalledWith({
      data: {
        user_id: '1',
        url: mockDogImage.message,
      },
    });
  });

  it('Deve lançar erro se o usuário já existir', async () => {
    (prisma.user.findUnique as jest.Mock).mockResolvedValue(mockUser);

    await expect(
      createUserUseCase(
        'John Doe',
        new Date('1990-01-01'),
        'johndoe@example.com',
        '123456'
      )
    ).rejects.toThrow(new AppError('User already exists', 409));

    expect(prisma.user.findUnique).toHaveBeenCalledWith({
      where: { email: 'johndoe@example.com' },
    });
  });

  it('Deve lançar erro se a variável de ambiente API_BONUS não estiver configurada', async () => {
    delete process.env.API_BONUS;

    await expect(
      createUserUseCase(
        'John Doe',
        new Date('1990-01-01'),
        'johndoe@example.com',
        '123456'
      )
    ).rejects.toThrow(new AppError('API_BONUS environment variable is not set', 500));
  });

  it('Deve lançar erro se o axios falhar ao buscar a imagem', async () => {
    process.env.API_BONUS = 'https://fakeapi.com/dog';
    
    (prisma.user.findUnique as jest.Mock).mockResolvedValue(null);
    
    (hashPassword as jest.Mock).mockResolvedValue('hashed_password');
    
    (axios.get as jest.Mock).mockRejectedValue(new Error('API Error'));
    
    await expect(
      createUserUseCase(
        'John Doe',
        new Date('1990-01-01'),
        'johndoe@example.com',
        '123456'
      )
    ).rejects.toThrow(new AppError('API Error', 500));
  });
});
