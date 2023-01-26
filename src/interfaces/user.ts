import { Document, Types } from 'mongoose';

export interface User extends Document {
  readonly username: string;
  readonly email: string;
  readonly password: string;
  readonly loveboxes: string[];
}

export interface ValidateNewUserArgs {
  email: string;
  username: string;
}

export interface FindOneUserResponse {
  email: string;
  sub: string;
}

export interface AddLoveboxToUser {
  user_id: string;
  lovebox_id: string
}

export interface AddLoveboxToUserSuccessResponse {
  status: number,
  message: string
}
