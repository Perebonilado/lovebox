import { Injectable, Inject, HttpException, HttpStatus } from '@nestjs/common';
import { Model } from 'mongoose';
import { SendMessageToLoveboxDto } from 'src/dto/message.dto';
import { GenericSuccess } from 'src/interfaces/common';
import { Message } from 'src/interfaces/message';
import { LoveboxService } from 'src/lovebox/services/lovebox.service';

@Injectable()
export class MessageService {
  constructor(
    @Inject('MESSAGE_MODEL') private messageModel: Model<Message>,
    private loveboxService: LoveboxService,
  ) {}

  public async sendMessageToLovebox(
    payload: SendMessageToLoveboxDto,
    user_id: string,
  ): Promise<GenericSuccess> {
    try {
      const lovebox = await this.loveboxService.findOneById(payload.lovebox);
      if (!lovebox.members.includes(user_id))
        throw new HttpException(
          'You cannot send a message to a lovebox you dont belong to',
          HttpStatus.UNAUTHORIZED,
        );
      else {
        const newMessage = new this.messageModel({ ...payload, user: user_id });
        await newMessage.save();
        return {
          message: 'Message successfully sent',
          status: HttpStatus.OK,
        };
      }
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
