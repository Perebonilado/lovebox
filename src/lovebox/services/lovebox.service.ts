import { Injectable, Inject, HttpStatus, HttpException } from '@nestjs/common';
import { Model } from 'mongoose';
import { CreateLoveboxSuccessResponse, Lovebox } from 'src/interfaces/lovebox';
import { CreateLoveboxDto } from 'src/dto/lovebox.dto';
import { UserService } from 'src/user/services/user.service';
import { DeleteLoveboxDto } from 'src/dto/lovebox.dto';

@Injectable()
export class LoveboxService {
  constructor(
    @Inject('LOVEBOX_MODEL') private loveBoxModel: Model<Lovebox>,
    private userService: UserService,
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
}
