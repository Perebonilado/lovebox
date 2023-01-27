import { Document, Types } from 'mongoose';
import { GenericSuccess } from './common';

export interface Lovebox extends Document {
  readonly created_at: Date;
  readonly members: string[];
  readonly title: string;
  readonly created_by: string;
  readonly isDeleted: boolean;
}

export interface CreateLoveboxSuccessResponse {
  status: number;
  message: string;
}

export interface GetUserLoveBoxesData {
  _id: string;
  title: string;
  members: {}[];
}

export interface GetUserLoveBoxesResponse extends GenericSuccess {
  data: Omit<
    Lovebox & {
      _id: Types.ObjectId;
    },
    never
  >[];
}
