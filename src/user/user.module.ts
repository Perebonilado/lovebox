import { Module } from '@nestjs/common';
import { UserService } from './services/user.service';
import { userProviders } from 'src/database/providers/user.provider';
import { DatabaseModule } from 'src/database/database.module';
import { EncryptionModule } from 'src/encryption/encryption.module';
import { EncryptionService } from 'src/encryption/encryption.service';

@Module({
  imports: [DatabaseModule, EncryptionModule],
  providers: [UserService, ...userProviders, EncryptionService],
  exports: [UserService],
})
export class UserModule {}
