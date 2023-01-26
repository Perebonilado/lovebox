import { Module } from '@nestjs/common';
import { NotificationController } from './controllers/notification.controller';
import { NotificationService } from './services/notification.service';
import { DatabaseModule } from 'src/database/database.module';
import { notificationProviders } from 'src/database/providers/notification.provider';

@Module({
  imports: [DatabaseModule],
  providers: [NotificationService, ...notificationProviders],
  controllers: [NotificationController],
  exports: [NotificationService],
})
export class NotificationModule {}
