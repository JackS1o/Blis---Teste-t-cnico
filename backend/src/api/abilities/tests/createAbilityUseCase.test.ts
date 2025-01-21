import { prisma } from '../../../prisma/client';
import { createAbilityUseCase } from '../useCases/createAbilityUseCase';
import { AppError } from '../../../errors';

jest.mock('../../../prisma/client', () => ({
  prisma: {
    abilities: {
      findFirst: jest.fn(),
      create: jest.fn(),
    },
  },
}));

describe('createAbilityUseCase', () => {
  const mockName = 'abilityName';
  const mockAbility = { id: 'ability-1', name: mockName.toLowerCase(), active: true };

  it('Deve criar uma habilidade com sucesso', async () => {
    (prisma.abilities.findFirst as jest.Mock).mockResolvedValue(null); 
    (prisma.abilities.create as jest.Mock).mockResolvedValue(mockAbility);

    const result = await createAbilityUseCase(mockName);

    expect(result).toEqual(mockAbility);
    expect(prisma.abilities.findFirst).toHaveBeenCalledWith({
      where: { name: mockName.toLowerCase() },
    });
    expect(prisma.abilities.create).toHaveBeenCalledWith({
      data: { name: mockName.toLowerCase(), active: true },
    });
  });

  it('Deve lançar erro se a habilidade já existir', async () => {
    const existingAbility = { id: 'existing-ability', name: mockName.toLowerCase(), active: true };
    
    (prisma.abilities.findFirst as jest.Mock).mockResolvedValue(existingAbility); 

    await expect(createAbilityUseCase(mockName)).rejects.toThrow(
      new AppError('Ability already exists', 409)
    );
    expect(prisma.abilities.findFirst).toHaveBeenCalledWith({
      where: { name: mockName.toLowerCase() },
    });
    expect(prisma.abilities.create).not.toHaveBeenCalled();
  });

  it('Deve lançar erro se ocorrer algum erro inesperado', async () => {
    (prisma.abilities.findFirst as jest.Mock).mockResolvedValue(null); 
    (prisma.abilities.create as jest.Mock).mockRejectedValue(new Error('Unexpected error')); 

    await expect(createAbilityUseCase(mockName)).rejects.toThrow('Unexpected error');
  });
});
