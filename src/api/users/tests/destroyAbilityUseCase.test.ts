import { destroyAbilityUseCase } from '../useCases/destroyAbilityUseCase';
import { AppError } from '../../../errors';
import { prisma } from '../../../prisma/client';

jest.mock('../../../prisma/client', () => ({
  prisma: {
    abilities: {
      findMany: jest.fn(),
    },
    userAbilities: {
      deleteMany: jest.fn(),
    },
  },
}));

describe('destroyAbilityUseCase', () => {
  const mockAbilities = [
    { id: '1', name: 'Ability1', active: true },
    { id: '2', name: 'Ability2', active: true },
  ];

  const mockUserId = 'user1';

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('Deve deletar as habilidades com sucesso', async () => {
    (prisma.abilities.findMany as jest.Mock).mockResolvedValue(mockAbilities);

    (prisma.userAbilities.deleteMany as jest.Mock).mockResolvedValue({ count: 2 });

    const result = await destroyAbilityUseCase(['Ability1', 'Ability2'], mockUserId);

    expect(result).toEqual({ message: 'Ability deleted successfully' });
    expect(prisma.abilities.findMany).toHaveBeenCalledWith({
      where: { name: { in: ['ability1', 'ability2'] }, active: true },
    });
    expect(prisma.userAbilities.deleteMany).toHaveBeenCalledWith({
      where: {
        user_id: mockUserId,
        ability_id: { in: ['1', '2'] },
      },
    });
  });

  it('Deve lançar erro se as habilidades não forem encontradas', async () => {
    (prisma.abilities.findMany as jest.Mock).mockResolvedValue([]);

    await expect(
      destroyAbilityUseCase(['Ability1', 'Ability2'], mockUserId)
    ).rejects.toThrow(new AppError('Ability not found', 404));

    expect(prisma.abilities.findMany).toHaveBeenCalledWith({
      where: { name: { in: ['ability1', 'ability2'] }, active: true },
    });
  });

  it('Deve lançar erro se não houver habilidades associadas ao usuário', async () => {
    (prisma.abilities.findMany as jest.Mock).mockResolvedValue(mockAbilities);

    (prisma.userAbilities.deleteMany as jest.Mock).mockResolvedValue({ count: 0 });

    await expect(
      destroyAbilityUseCase(['Ability1', 'Ability2'], mockUserId)
    ).rejects.toThrow(new AppError('Ability not found', 404));

    expect(prisma.abilities.findMany).toHaveBeenCalledWith({
      where: { name: { in: ['ability1', 'ability2'] }, active: true },
    });
    expect(prisma.userAbilities.deleteMany).toHaveBeenCalledWith({
      where: {
        user_id: mockUserId,
        ability_id: { in: ['1', '2'] },
      },
    });
  });

  it('Deve retornar erro se o array de habilidades estiver vazio', async () => {
    await expect(
      destroyAbilityUseCase([], mockUserId)
    ).rejects.toThrow(new AppError('No abilities provided', 400));
  });
});
