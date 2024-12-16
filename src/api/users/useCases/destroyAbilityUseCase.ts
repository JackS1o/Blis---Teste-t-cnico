import { AppError } from '../../../errors';
import { prisma } from '../../../prisma/client';

export const destroyAbilityUseCase = async (abilities: Array<string>, userId: string) => {
  const abilitiesList = abilities.map((ability) => {
    const abilityLowerCase = ability.toLowerCase();
    return abilityLowerCase;
  });

  const abilityId = await prisma.abilities.findMany({
    where: {
      name: {
        in: abilitiesList,
      },
      active: true,
    },
  });

  const result = await prisma.userAbilities.deleteMany({
    where: {
      user_id: userId,
      ability_id: {
        in: abilityId.map((ability) => ability.id),
      },
    },
  });

  return result;
};
