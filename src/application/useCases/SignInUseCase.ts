import { InvalidCredentials } from "../errors/InvalidCredentials";
import { IRepository } from "../interfaces/IRepository";
import { IHashProvider } from "../interfaces/IHashProvider";
import { ITokenJwtProvider } from "../interfaces/ITokenJwtProvider";

interface IInput {
  email: string;
  password: string;
}

type IOutput = string;

export class SignInUseCase{

  constructor(
    private readonly accountRepository: IRepository,
    private readonly hashProvider: IHashProvider,
    private readonly tokenJwtProvider: ITokenJwtProvider,
  ){}

  async execute({ email, password }: IInput): Promise<IOutput>{

      const account = await this.accountRepository.findByEmail(email);

      if(!account){
        throw new InvalidCredentials();
      }

      const isPasswordValid = this.hashProvider.compare(password, account.password);

      if(!isPasswordValid){
        throw new InvalidCredentials();
      }

      const acessToken = this.tokenJwtProvider.sign(
        {
          sub: account.id,
          iat: Date.now(),
          role: account.role,
        },
        `${process.env.SECRET_KEY}`,
        { expiresIn: '1d' }
      );

      return acessToken;
  }

}
