import { userAbilitiesUseCase } from '../useCases/userAbilitiesUseCase';
import { AppError } from '../../../errors';
import { prisma } from '../../../prisma/client';

jest.mock('../../../prisma/client', () => ({
  prisma: {
    abilities: {
      findFirst: jest.fn(),
    },
    userAbilities: {
      findMany: jest.fn(),
      create: jest.fn(),
    },
  },
}));

describe('userAbilitiesUseCase', () => {
  const mockAbility = { id: '1', name: 'typescript', active: true };
  const mockUserAbility = {
    id: '1',
    user_id: '123',
    ability_id: '1',
    years_experience: 3,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('Deve lançar erro se a habilidade não existir ou estiver inativa', async () => {
    (prisma.abilities.findFirst as jest.Mock).mockResolvedValue(null);

    await expect(
      userAbilitiesUseCase('typescript', 3, '123')
    ).rejects.toThrow(new AppError('Ability not found or inactive', 404));
  });

  it('Deve lançar erro se a habilidade já estiver associada ao usuário', async () => {
    (prisma.abilities.findFirst as jest.Mock).mockResolvedValue(mockAbility);
    (prisma.userAbilities.findMany as jest.Mock).mockResolvedValue([mockUserAbility]);

    await expect(
      userAbilitiesUseCase('typescript', 3, '123')
    ).rejects.toThrow(new AppError('Ability already exists', 409));
  });

  it('Deve adicionar a habilidade com sucesso', async () => {
    (prisma.abilities.findFirst as jest.Mock).mockResolvedValue(mockAbility);
    (prisma.userAbilities.findMany as jest.Mock).mockResolvedValue([]);
    (prisma.userAbilities.create as jest.Mock).mockResolvedValue(mockUserAbility);

    const result = await userAbilitiesUseCase('typescript', 3, '123');

    expect(result).toEqual({
      message: 'Ability added successfully',
    });

    expect(prisma.abilities.findFirst).toHaveBeenCalled();
    expect(prisma.userAbilities.findMany).toHaveBeenCalled();
    expect(prisma.userAbilities.create).toHaveBeenCalledWith({
      data: {
        user_id: '123',
        ability_id: '1',
        years_experience: 3,
      },
    });
  });
});
