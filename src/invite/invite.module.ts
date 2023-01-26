import { Module } from '@nestjs/common';
import { InviteController } from './controllers/invite.controller';
import { InviteService } from './services/invite.service';

import { DatabaseModule } from 'src/database/database.module';
import { EncryptionService } from 'src/encryption/encryption.service';
import { EncryptionModule } from 'src/encryption/encryption.module';
import { userProviders } from 'src/database/providers/user.provider';
import { JwtModule } from '@nestjs/jwt';
import { JwtAccessToken } from 'src/constants';
import { AuthService } from 'src/auth/services/auth.service';
import { JwtStrategy } from 'src/auth/services/jwt.strategy';
import { UserModule } from 'src/user/user.module';
import { inviteProviders } from 'src/database/providers/invite.provider';
import { LoveboxModule } from 'src/lovebox/lovebox.module';
import { NotificationModule } from 'src/notification/notification.module';

@Module({
  imports: [
    UserModule,
    DatabaseModule,
    EncryptionModule,
    JwtModule.register({
      secret: JwtAccessToken,
    }),
    LoveboxModule,
    NotificationModule
  ],
  providers: [
    InviteService,
    EncryptionService,
    ...userProviders,
    ...inviteProviders,
    JwtStrategy,
    AuthService,
  ],
  controllers: [InviteController],
  exports: [InviteService],
})
export class InviteModule {}
