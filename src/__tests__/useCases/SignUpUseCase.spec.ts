import { SignUpUseCase } from '../../application/useCases/SignUpUseCase';
import { IAccount } from '../../application/interfaces/IAccount';
import { IRepository } from '../../application/interfaces/IRepository';
import { IHashProvider } from '../../application/interfaces/IHashProvider';
import { EmailAlreadyExistsError } from '../../application/errors/EmailAlreadyExistsError';

// Mock das dependências
const mockAccountRepository: jest.Mocked<IRepository> = {
  findByEmail: jest.fn(),
  create: jest.fn(),
  findAll: jest.fn(),
  findById: jest.fn(),
};

const mockHashProvider: jest.Mocked<IHashProvider> = {
  hash: jest.fn(),
  compare: jest.fn(),
};

describe('SignUpUseCase', () => {
  let signUpUseCase: SignUpUseCase;

  beforeEach(() => {
    // Resetar os mocks antes de cada teste
    jest.clearAllMocks();
    signUpUseCase = new SignUpUseCase(mockAccountRepository, mockHashProvider, 10);
  });

  it('should create a new user successfully', async () => {
    // Arrange
    const userData = { name: 'Test User', email: 'test@example.com', password: 'password123' };
    const hashedPassword = 'hashedPassword';
    const createdUser: IAccount = { id: '1', ...userData, password: hashedPassword, role: 'USER' };

    mockAccountRepository.findByEmail.mockResolvedValue(undefined);
    mockHashProvider.hash.mockResolvedValue(hashedPassword);
    mockAccountRepository.create.mockResolvedValue(createdUser);

    // Act
    const result = await signUpUseCase.execute(userData);

    // Assert
    expect(result).toEqual({ id: createdUser.id, name: createdUser.name, email: createdUser.email });
    expect(mockAccountRepository.findByEmail).toHaveBeenCalledWith(userData.email);
    expect(mockHashProvider.hash).toHaveBeenCalledWith(userData.password, 10);
    expect(mockAccountRepository.create).toHaveBeenCalledWith({
      ...userData,
      password: hashedPassword,
      role: 'USER',
    });
  });

  it('should throw EmailAlreadyExistsError if email is already in use', async () => {
    // Arrange
    const userData = { name: 'Test User', email: 'test@example.com', password: 'password123' };
    const existingUser: IAccount = { id: '1', ...userData, password: 'hashedPassword', role: 'USER' };

    mockAccountRepository.findByEmail.mockResolvedValue(existingUser);

    // Act & Assert
    await expect(signUpUseCase.execute(userData)).rejects.toThrow(EmailAlreadyExistsError);
    expect(mockAccountRepository.findByEmail).toHaveBeenCalledWith(userData.email);
    expect(mockHashProvider.hash).not.toHaveBeenCalled();
    expect(mockAccountRepository.create).not.toHaveBeenCalled();
  });
});
