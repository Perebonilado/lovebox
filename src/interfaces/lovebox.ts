import { Document } from 'mongoose';

export interface Lovebox extends Document {
  readonly created_at: Date;
  readonly members: string[];
  readonly title: string;
  readonly created_by: string;
  readonly isDeleted: boolean
}

export interface CreateLoveboxSuccessResponse {
  status: number;
  message: string;
}
