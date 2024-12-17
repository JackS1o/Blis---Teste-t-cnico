import { createUserDocumentUseCase } from '../useCases/createUserDocumentUseCase';
import { AppError } from '../../../errors';
import { prisma } from '../../../prisma/client';

jest.mock('../../../prisma/client', () => ({
  prisma: {
    userDocuments: {
      create: jest.fn(),
    },
  },
}));

describe('createUserDocumentUseCase', () => {
  const mockDocument = {
    id: '1',
    user_id: '123',
    name: 'document_name',
    url: 'path/to/file.pdf',
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('Deve criar um documento com sucesso', async () => {
    (prisma.userDocuments.create as jest.Mock).mockResolvedValue(mockDocument);

    const result = await createUserDocumentUseCase(
      '123',
      'document_name',
      'path/to/file.pdf'
    );

    expect(result).toEqual(mockDocument);

    expect(prisma.userDocuments.create).toHaveBeenCalledWith({
      data: {
        user_id: '123',
        name: 'document_name',
        url: 'path/to/file.pdf',
      },
    });
  });

  it('Deve lançar um erro caso o prisma.userDocuments.create falhe', async () => {
    (prisma.userDocuments.create as jest.Mock).mockRejectedValue(new Error('DB Error'));

    await expect(
      createUserDocumentUseCase('123', 'document_name', 'path/to/file.pdf')
    ).rejects.toThrow(new AppError('Failed to create document', 500));

    expect(prisma.userDocuments.create).toHaveBeenCalledWith({
      data: {
        user_id: '123',
        name: 'document_name',
        url: 'path/to/file.pdf',
      },
    });
  });
});
