import { AppError } from '../../../errors';
import { prisma } from '../../../prisma/client';

export const createAbilityUseCase = async (name: string) => {
  const nameLowerCase = name.toLowerCase();

  const abilityExists = await prisma.abilities.findFirst({
    where: {
      name: nameLowerCase,
    },
  });

  if (abilityExists) {
    throw new AppError('Ability already exists', 409);
  }

  const ability = await prisma.abilities.create({
    data: {
      name: nameLowerCase,
      active: true,
    },
  });
  return ability;
};
