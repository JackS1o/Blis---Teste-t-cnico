import { prisma } from '../../../prisma/client';

export const getUserAbilitiesUseCase = async (userId: string, page: number, limit: number) => {
  const count = await prisma.userAbilities.count({
    where: {
      user_id: userId,
    },
  })

  const abilities = await prisma.userAbilities.findMany({
    where: {
      user_id: userId,
    },
    include: {
      ability: true,
    },
    skip: (page - 1) * limit,
    take: limit
  });

  return {
    count,
    rows: abilities.map((ability) => {
      return {
        id: ability.id,
        name: ability.ability.name,
        years_experience: ability.years_experience,
      };
    }),
  };
};
