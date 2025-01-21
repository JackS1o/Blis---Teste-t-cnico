import { AppError } from '../../../errors';
import { prisma } from '../../../prisma/client';

export const userAbilitiesUseCase = async (
  ability: string,
  years_experience: number,
  userId: string
) => {
  const abilityLowerCase = ability.toLowerCase();

  const abilities = await prisma.abilities.findFirst({
    where: {
      name: abilityLowerCase,
    },
  });

  if (!abilities || abilities.active === false) {
    throw new AppError('Ability not found or inactive', 404);
  }

  const userAbilitiesExists = await prisma.userAbilities.findMany({
    where: {
      user_id: userId,
      ability_id: abilities.id,
    },
  });

  if (userAbilitiesExists.length > 0) {
    throw new AppError('Ability already exists', 409);
  }

  await prisma.userAbilities.create({
    data: {
      user_id: userId,
      ability_id: abilities.id,
      years_experience,
    },
  });

  return {
    message: 'Ability added successfully',
  };
};
