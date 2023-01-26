import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class EncryptionService {
  private readonly saltRounds = 10;

  public async encryptValue(value: string): Promise<string> {
    return await bcrypt.hash(value, this.saltRounds);
  }

  public async decryptValue({
    hash,
    password,
  }: {
    hash: string;
    password: string;
  }):Promise<boolean> {
    return await bcrypt.compare(password, hash);
  }
}
