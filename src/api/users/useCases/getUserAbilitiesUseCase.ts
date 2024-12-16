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
      user: true
    },
    skip: (page - 1) * limit,
    take: limit,
    orderBy: {
      ability: {
        createdAt: 'desc'
      }
    }
  });

  return {
    count,
    rows: abilities.map((ability) => {
      return {
        user_id: ability.user_id,
        name: ability.user.name,
        email: ability.user.email,
        birthdate: ability.user.birthdate,
        ability: ability.ability.name,
        years_experience: ability.years_experience,
      };
    })
  };
};
