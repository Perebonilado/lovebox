import { Injectable, Inject, HttpStatus, HttpException } from '@nestjs/common';
import { Model } from 'mongoose';
import { CreateLoveboxSuccessResponse, Lovebox } from 'src/interfaces/lovebox';
import {
  CreateLoveboxDto,
  DeleteLoveboxDto,
  LeaveLoveboxDto,
} from 'src/dto/lovebox.dto';
import { UserService } from 'src/user/services/user.service';
import { GenericSuccess } from 'src/interfaces/common';
import { NotificationService } from 'src/notification/services/notification.service';
import { GetUserLoveBoxesResponse } from 'src/interfaces/lovebox';

@Injectable()
export class LoveboxService {
  constructor(
    @Inject('LOVEBOX_MODEL') private loveBoxModel: Model<Lovebox>,
    private userService: UserService,
    private notificationService: NotificationService,
  ) {}

  public async createLoveBox(
    payload: CreateLoveboxDto,
    user_id: string,
  ): Promise<CreateLoveboxSuccessResponse> {
    try {
      const { title } = payload;
      const loveBox = new this.loveBoxModel({
        title: title,
        created_by: user_id,
        members: [user_id],
      });
      await loveBox.save();
      await this.userService.addLoveboxToUser({
        lovebox_id: loveBox._id,
        user_id: user_id,
      });
      return {
        status: HttpStatus.OK,
        message: 'Lovebox Successfully created',
      };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  public async deleteLovebox(payload: DeleteLoveboxDto, user_id: string) {
    try {
      const loveBox = await this.loveBoxModel.findById(payload.id);
      if (loveBox.created_by.toString() === user_id) {
        await loveBox.updateOne({ $set: { isDeleted: true } });
        return {
          status: HttpStatus.OK,
          message: 'successfully deleted',
        };
      }
      throw new HttpException(
        'Lovebox can only be deleted by user who created it',
        HttpStatus.UNAUTHORIZED,
      );
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  public async findOneById(lovebox_id: string) {
    return await this.loveBoxModel.findById(lovebox_id);
  }

  public async leaveLovebox(
    payload: LeaveLoveboxDto,
    user_id: string,
  ): Promise<GenericSuccess> {
    const lovebox = await this.loveBoxModel.findById(payload.id);
    lovebox.updateOne({ $pull: { members: user_id } });
    await lovebox.save();
    return {
      message: 'You have succesfully left this lovebox',
      status: HttpStatus.OK,
    };
  }

  public async getUserLoveboxes(
    user_id: string,
  ): Promise<GetUserLoveBoxesResponse> {
    try {
      const loveboxes = await this.loveBoxModel.find(
        { members: user_id, isDeleted: false },
        '_id title members',
      ).populate("members", "_id username");
      return {
        message: 'Successful',
        status: HttpStatus.OK,
        data: loveboxes,
      };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
