import { prisma } from '../../../prisma/client';
import { AppError } from '../../../errors';

export const createUserDocumentUseCase = async (
  userId: string,
  name: string,
  filePath: string
) => {
  try {
    const document = await prisma.userDocuments.create({
      data: {
        user_id: userId,
        name,
        url: filePath,
      },
    });
    return document;
  } catch (error: Error | any) {
    console.log(error);
    throw new AppError('Failed to create document', 500);
  }
};
