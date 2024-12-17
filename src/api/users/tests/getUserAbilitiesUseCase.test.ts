import { prisma } from '../../../prisma/client';
import { getUserAbilitiesUseCase } from '../useCases/getUserAbilitiesUseCase';

jest.mock('../../../prisma/client', () => ({
  prisma: {
    userAbilities: {
      count: jest.fn(),
      findMany: jest.fn(),
    },
    dogProfilePictures: {
      findFirst: jest.fn(),
    },
  },
}));

describe('getUserAbilitiesUseCase', () => {
  const mockUserId = 'user-1';

  it('Deve retornar as habilidades do usuário com sucesso', async () => {
    const mockAbilities = [
      {
        user_id: 'user-1',
        ability: { name: 'Ability 1' },
        years_experience: 5,
        user: { name: 'John Doe', email: 'johndoe@example.com', birthdate: '1990-01-01T00:00:00.000Z' },
      },
      {
        user_id: 'user-1',
        ability: { name: 'Ability 2' },
        years_experience: 3,
        user: { name: 'John Doe', email: 'johndoe@example.com', birthdate: '1990-01-01T00:00:00.000Z' },
      },
    ];

    const mockDogPicture = { url: 'https://dog.ceo/api/img/dog1.jpg' };

    (prisma.userAbilities.count as jest.Mock).mockResolvedValue(mockAbilities.length);
    (prisma.userAbilities.findMany as jest.Mock).mockResolvedValue(mockAbilities);
    (prisma.dogProfilePictures.findFirst as jest.Mock).mockResolvedValue(mockDogPicture);

    const result = await getUserAbilitiesUseCase(mockUserId, 1, 10);

    expect(result).toEqual({
      count: mockAbilities.length,
      rows: [
        {
          user_id: 'user-1',
          name: 'John Doe',
          email: 'johndoe@example.com',
          birthdate: '1990-01-01T00:00:00.000Z',
          ability: 'Ability 1',
          years_experience: 5,
          profilePicture: mockDogPicture.url,
        },
        {
          user_id: 'user-1',
          name: 'John Doe',
          email: 'johndoe@example.com',
          birthdate: '1990-01-01T00:00:00.000Z',
          ability: 'Ability 2',
          years_experience: 3,
          profilePicture: mockDogPicture.url,
        },
      ],
    });
  });

  it('Deve retornar zero habilidades se o usuário não tiver habilidades', async () => {
    (prisma.userAbilities.count as jest.Mock).mockResolvedValue(0);
    (prisma.userAbilities.findMany as jest.Mock).mockResolvedValue([]);

    const result = await getUserAbilitiesUseCase(mockUserId, 1, 10);

    expect(result).toEqual({
      count: 0,
      rows: [],
    });
  });

  it('Deve retornar habilidades paginadas corretamente', async () => {
    const mockAbilities = [
      {
        user_id: 'user-1',
        ability: { name: 'Ability 1' },
        years_experience: 5,
        user: { name: 'John Doe', email: 'johndoe@example.com', birthdate: '1990-01-01T00:00:00.000Z' },
      },
      {
        user_id: 'user-1',
        ability: { name: 'Ability 2' },
        years_experience: 3,
        user: { name: 'John Doe', email: 'johndoe@example.com', birthdate: '1990-01-01T00:00:00.000Z' },
      },
    ];

    const mockDogPicture = { url: 'https://dog.ceo/api/img/dog1.jpg' };

    (prisma.userAbilities.count as jest.Mock).mockResolvedValue(mockAbilities.length);
    (prisma.userAbilities.findMany as jest.Mock).mockResolvedValue(mockAbilities);
    (prisma.dogProfilePictures.findFirst as jest.Mock).mockResolvedValue(mockDogPicture);

    const result = await getUserAbilitiesUseCase(mockUserId, 1, 1); 

    expect(result.rows.length).toBe(2); 
    expect(result.rows[0].ability).toBe('Ability 1');
  });

  it('Deve retornar erro se ocorrer um problema ao buscar imagem de perfil', async () => {
    (prisma.dogProfilePictures.findFirst as jest.Mock).mockResolvedValue(null);

    const result = await getUserAbilitiesUseCase(mockUserId, 1, 10);
    
    expect(result.rows[0].profilePicture).toBe(undefined); 
  });
});
