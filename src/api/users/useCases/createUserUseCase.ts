
import { prisma } from "../../../prisma/client";
import { hashPassword } from "../utils/passwordUtils";

export const createUserUseCase = async (name: string, email: string, password: string) => {
  const hashedPassword = await hashPassword(password); 

  const user = await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
    },
  });

  return user; 
};
