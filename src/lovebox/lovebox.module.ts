import { Module } from '@nestjs/common';
import { LoveboxService } from './services/lovebox.service';
import { UserService } from 'src/user/services/user.service';
import { UserModule } from 'src/user/user.module';
import { LoveboxController } from './controllers/lovebox.controller';
import { loveboxProviders } from 'src/database/providers/lovebox.provider';
import { DatabaseModule } from 'src/database/database.module';
import { EncryptionService } from 'src/encryption/encryption.service';
import { EncryptionModule } from 'src/encryption/encryption.module';
import { userProviders } from 'src/database/providers/user.provider';
import { JwtModule } from '@nestjs/jwt';
import { JwtAccessToken } from 'src/constants';
import { AuthService } from 'src/auth/services/auth.service';
import { JwtStrategy } from 'src/auth/services/jwt.strategy';

@Module({
  imports: [
    UserModule,
    DatabaseModule,
    EncryptionModule,
    JwtModule.register({
      secret: JwtAccessToken,
    }),
  ],
  providers: [
    LoveboxService,
    UserService,
    ...loveboxProviders,
    EncryptionService,
    ...userProviders,
    JwtStrategy,
    AuthService
  ],
  controllers: [LoveboxController],
  exports: [LoveboxService],
})
export class LoveboxModule {}
