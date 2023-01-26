import { Module } from '@nestjs/common';
import { MessageService } from './services/message.service';
import { MessageController } from './controllers/message.controller';

import { LoveboxModule } from 'src/lovebox/lovebox.module';
import { DatabaseModule } from 'src/database/database.module';
import { EncryptionModule } from 'src/encryption/encryption.module';
import { JwtModule } from '@nestjs/jwt';
import { JwtAccessToken } from 'src/constants';
import { NotificationModule } from 'src/notification/notification.module';
import { messageProviders } from 'src/database/providers/message.provider';
import { loveboxProviders } from 'src/database/providers/lovebox.provider';

@Module({
  imports: [
    LoveboxModule,
    DatabaseModule,
    EncryptionModule,
    JwtModule.register({
      secret: JwtAccessToken,
    }),
    NotificationModule,
  ],
  providers: [MessageService, ...messageProviders, ...loveboxProviders],
  controllers: [MessageController],
})
export class MessageModule {}
