import { IHashProvider } from "../../application/interfaces/IHashProvider";
import { hash, compare } from "bcryptjs";

export class HashProvider implements IHashProvider{

  async hash(password: string, salt: number): Promise<string>{

    const passwordHash = await hash(password, salt);

    return passwordHash;
  }

  async compare(password: string, hashPassword: string): Promise<boolean>{

    const isPasswordCorrect = compare(password, hashPassword);

    return isPasswordCorrect;
  }

}
