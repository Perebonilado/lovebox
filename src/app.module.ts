import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { DatabaseModule } from './database/database.module';
import { EncryptionModule } from './encryption/encryption.module';
import { LoveboxModule } from './lovebox/lovebox.module';
import { InviteModule } from './invite/invite.module';
import { NotificationModule } from './notification/notification.module';

@Module({
  imports: [
    AuthModule,
    UserModule,
    DatabaseModule,
    EncryptionModule,
    LoveboxModule,
    InviteModule,
    NotificationModule,
    ConfigModule.forRoot({ isGlobal: true }),
  ],
})
export class AppModule {}
