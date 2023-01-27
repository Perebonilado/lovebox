import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { SendInviteDto } from 'src/dto/invite.dto';
import { Invite, SendInviteSuccessResponse } from 'src/interfaces/invite';
import { LoveboxService } from 'src/lovebox/services/lovebox.service';
import { GenericSuccess } from 'src/interfaces/common';
import { NotificationService } from 'src/notification/services/notification.service';

@Injectable()
export class InviteService {
  constructor(
    @Inject('INVITE_MODEL') private inviteModel: Model<Invite>,
    private loveboxService: LoveboxService,
    private notificationService: NotificationService,
  ) {}

  public async sendInvite(
    payload: SendInviteDto,
    user_id: string,
  ): Promise<SendInviteSuccessResponse> {
    try {
      const inviteExists = await this.inviteModel.findOne({
        to: payload.recipient,
        from: user_id,
        lovebox: payload.lovebox_id,
      });
      if (inviteExists) {
        throw new HttpException(
          'You have unanswered invite to this user for this lovebox',
          HttpStatus.BAD_REQUEST,
        );
      } else {
        if (payload.recipient === user_id) {
          throw new HttpException(
            'You cannot invite yourself to a lovebox',
            HttpStatus.BAD_REQUEST,
          );
        } else {
          const lovebox = await this.loveboxService.findOneById(
            payload.lovebox_id,
          );
          if (lovebox.created_by.toString() === user_id) {
            const newInvite = new this.inviteModel({
              from: user_id,
              to: payload.recipient,
              lovebox: payload.lovebox_id,
            });
            await newInvite.save();
            return {
              message: 'Invite sent successfully',
              status: HttpStatus.OK,
            };
          } else
            throw new HttpException(
              'You may only send invites for a lovebox you created',
              HttpStatus.UNAUTHORIZED,
            );
        }
      }
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  public async acceptInvite(
    invite_id: string,
    user_id: string,
  ): Promise<GenericSuccess> {
    try {
      const invite = await this.inviteModel.findById(invite_id);
      if (invite.to.toString() === user_id) {
        await invite.updateOne({
          $set: { is_accepted: true },
        });
        const lovebox = await this.loveboxService.findOneById(invite.lovebox);
        await lovebox.updateOne({ $push: { members: user_id } });
        await this.notificationService.createNotification({
          from: user_id,
          to: invite.from,
          lovebox: invite.lovebox,
          category: 'lovebox_accepted_request',
        });
        return {
          message: 'Invite accepted successfully',
          status: HttpStatus.ACCEPTED,
        };
      } else
        throw new HttpException(
          'You can only accept invites sent to you',
          HttpStatus.UNAUTHORIZED,
        );
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
