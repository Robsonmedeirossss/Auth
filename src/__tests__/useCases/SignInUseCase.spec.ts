import { SignInUseCase } from '../../application/useCases/SignInUseCase';
import { IAccount } from '../../application/interfaces/IAccount';
import { IRepository } from '../../application/interfaces/IRepository';
import { IHashProvider } from '../../application/interfaces/IHashProvider';
import { ITokenJwtProvider } from '../../application/interfaces/ITokenJwtProvider';
import { InvalidCredentials } from '../../application/errors/InvalidCredentials';

// Mock das dependências
process.env.SECRET_KEY = 'test-secret';

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

const mockTokenProvider: jest.Mocked<ITokenJwtProvider> = {
  sign: jest.fn(),
  verify: jest.fn(),
};

describe('SignInUseCase', () => {
  let signInUseCase: SignInUseCase;

  beforeEach(() => {
    jest.clearAllMocks();
    signInUseCase = new SignInUseCase(mockAccountRepository, mockHashProvider, mockTokenProvider);
  });

  it('should return a token on successful login', async () => {
    // Arrange
    const loginData = { email: 'test@example.com', password: 'password123' };
    const user: IAccount = { id: '1', name: 'Test User', email: loginData.email, password: 'hashedPassword', role: 'user' };
    const token = 'jwt.token.string';

    mockAccountRepository.findByEmail.mockResolvedValue(user);
    mockHashProvider.compare.mockResolvedValue(true);
    mockTokenProvider.sign.mockReturnValue(token);

    // Act
    const result = await signInUseCase.execute(loginData);

    // Assert
    expect(result).toEqual(token);
    expect(mockAccountRepository.findByEmail).toHaveBeenCalledWith(loginData.email);
    expect(mockHashProvider.compare).toHaveBeenCalledWith(loginData.password, user.password);
    expect(mockTokenProvider.sign).toHaveBeenCalledWith(
      { sub: user.id, iat: expect.any(Number), role: user.role },
      'test-secret',
      { expiresIn: '1d' }
    );
  });

  it('should throw InvalidCredentials if user is not found', async () => {
    // Arrange
    const loginData = { email: 'test@example.com', password: 'password123' };
    mockAccountRepository.findByEmail.mockResolvedValue(undefined);

    // Act & Assert
    await expect(signInUseCase.execute(loginData)).rejects.toThrow(InvalidCredentials);
    expect(mockHashProvider.compare).not.toHaveBeenCalled();
    expect(mockTokenProvider.sign).not.toHaveBeenCalled();
  });

  it('should throw InvalidCredentials if password does not match', async () => {
    // Arrange
    const loginData = { email: 'test@example.com', password: 'wrongpassword' };
    const user: IAccount = { id: '1', name: 'Test User', email: loginData.email, password: 'hashedPassword', role: 'user' };

    mockAccountRepository.findByEmail.mockResolvedValue(user);
    mockHashProvider.compare.mockResolvedValue(false);

    // Act & Assert
    await expect(signInUseCase.execute(loginData)).rejects.toThrow(InvalidCredentials);
    expect(mockTokenProvider.sign).not.toHaveBeenCalled();
  });
});
