import { EmailAlreadyExistsError } from "../errors/EmailAlreadyExistsError";
import { IHashProvider } from "../interfaces/IHashProvider";
import { IRepository } from "../interfaces/IRepository";

interface IInput{
  name: string;
  email: string;
  password: string;
}

type IOutput = Error | Record<string, string>;

export class SignUpUseCase{

  constructor(
    private readonly accountRepository: IRepository,
    private readonly hashProvider: IHashProvider,
    private readonly salt: number,
  ) {}

  async execute({ name, email, password }: IInput): Promise<IOutput>{

    const accountAlreadyExists = await this.accountRepository.findByEmail(email);

    if(accountAlreadyExists){
      throw new EmailAlreadyExistsError;
    }

    const hash = await this.hashProvider.hash(password, this.salt);

    const account = await this.accountRepository.create({name, email, password: hash});

    return { id: account.id!, name, email, };

  }
}
