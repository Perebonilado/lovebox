import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from 'src/dto/user.dto';
import {
  AddLoveboxToUserSuccessResponse,
  User,
  ValidateNewUserArgs,
} from 'src/interfaces/user';
import { Model, Types } from 'mongoose';
import { EncryptionService } from 'src/encryption/encryption.service';
import { AddLoveboxToUser } from 'src/interfaces/user';
import * as mongoose from "mongoose"

@Injectable()
export class UserService {
  constructor(
    @Inject('USER_MODEL') private userModel: Model<User>,
    private encryptionService: EncryptionService,
  ) {}

  public async create(body: CreateUserDto) {
    const { password, ...payload } = body;
    const hashedPassword = await this.encryptionService.encryptValue(password);
    const user = new this.userModel({ password: hashedPassword, ...payload });
    const savedUser = await user.save();
    return savedUser;
  }

  public async userAccountExists(args: ValidateNewUserArgs): Promise<boolean> {
    const userEmailDup = await this.userModel.findOne({
      email: args.email,
    });
    const usernameDup = await this.userModel.findOne({
      username: args.username,
    });
    if (usernameDup || userEmailDup) return true;
    return false;
  }

  public async findOneUser(email: string): Promise<User> {
    return await this.userModel.findOne({ email: email });
  }

  public async addLoveboxToUser({
    lovebox_id,
    user_id,
  }: AddLoveboxToUser): Promise<AddLoveboxToUserSuccessResponse> {
    try {
      // const mongooseUserId = Types.ObjectId.createFromHexString(user_id);
      // const mongooseLoveboxId = Types.ObjectId.createFromHexString(lovebox_id);
      await this.userModel.findByIdAndUpdate(user_id, {
        $push: { loveboxes: lovebox_id },
      });
      return {
        status: HttpStatus.OK,
        message: 'user successfully added to lovebox',
      };
    } catch (error) {
      throw new HttpException(
        error.message,
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
