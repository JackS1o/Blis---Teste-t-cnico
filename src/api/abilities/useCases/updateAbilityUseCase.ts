import { prisma } from '../../../prisma/client';

export const updateAbilityUseCase = async (id: string, active: boolean) => {
  const ability = await prisma.abilities.update({
    where: {
      id,
    },
    data: {
      active,
    },
  });
  return ability;
};
