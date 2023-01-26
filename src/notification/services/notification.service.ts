import { Injectable, Inject, HttpStatus, HttpException } from '@nestjs/common';
import { Model } from 'mongoose';
import { Notification } from 'src/interfaces/notification';
import { CreateNotificationDto } from 'src/dto/notification';
import { GenericSuccess } from 'src/interfaces/common';

@Injectable()
export class NotificationService {
  constructor(
    @Inject('NOTIFICATION_MODEL')
    private notificationModel: Model<Notification>,
  ) {}

  public async createNotification(
    payload: CreateNotificationDto,
  ): Promise<GenericSuccess> {
    try {
      const newNotification = new this.notificationModel({ ...payload });
      await newNotification.save();
      return {
        message: 'Notification Successfully created',
        status: HttpStatus.OK,
      };
    } catch (error) {
        throw new HttpException(error.message, HttpStatus.BAD_REQUEST)
    }
  }
}
