import { Module } from '@nestjs/common';
import { AuthService } from './services/auth.service';
import { UserService } from 'src/user/services/user.service';
import { userProviders } from 'src/database/providers/user.provider';
import { DatabaseModule } from 'src/database/database.module';
import { UserModule } from 'src/user/user.module';
import { AuthController } from './controllers/auth.controllers';
import { EncryptionModule } from 'src/encryption/encryption.module';
import { EncryptionService } from 'src/encryption/encryption.service';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtAccessToken } from 'src/constants';
import { LocalStrategy } from './services/local.strategy';

@Module({
  imports: [
    DatabaseModule,
    UserModule,
    EncryptionModule,
    PassportModule,
    JwtModule.register({
      secret: JwtAccessToken,
    }),
  ],
  providers: [
    AuthService,
    UserService,
    ...userProviders,
    EncryptionService,
    LocalStrategy,
  ],
  controllers: [AuthController],
  exports: [LocalStrategy, EncryptionService]
})
export class AuthModule {}
