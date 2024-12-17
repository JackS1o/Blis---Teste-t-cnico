import { prisma } from '../../../prisma/client';
import { updateAbilityUseCase } from '../useCases/updateAbilityUseCase';
import { AppError } from '../../../errors';

jest.mock('../../../prisma/client', () => ({
  prisma: {
    abilities: {
      update: jest.fn(),
    },
  },
}));

describe('updateAbilityUseCase', () => {
  const mockId = 'ability-1';
  const mockAbility = { id: mockId, name: 'Ability1', active: true };

  it('Deve atualizar a habilidade com sucesso', async () => {
    (prisma.abilities.update as jest.Mock).mockResolvedValue({
      ...mockAbility,
      active: false, 
    });

    const result = await updateAbilityUseCase(mockId, false);

    expect(result).toEqual({ ...mockAbility, active: false }); 
    expect(prisma.abilities.update).toHaveBeenCalledWith({
      where: { id: mockId },
      data: { active: false },
    });
  });

  it('Deve lançar erro se a habilidade não existir', async () => {
    (prisma.abilities.update as jest.Mock).mockRejectedValue(new Error('Habilidade não encontrada')); 

    await expect(updateAbilityUseCase(mockId, false)).rejects.toThrow(
      new AppError('Habilidade não encontrada', 404)
    );
    expect(prisma.abilities.update).toHaveBeenCalledWith({
      where: { id: mockId },
      data: { active: false },
    });
  });

  it('Deve lançar erro se ocorrer algum erro inesperado', async () => {
    (prisma.abilities.update as jest.Mock).mockRejectedValue(new Error('Erro inesperado')); 

    await expect(updateAbilityUseCase(mockId, false)).rejects.toThrow('Erro inesperado');
  });
});
