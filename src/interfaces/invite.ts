import { Document } from 'mongoose';

export interface Invite extends Document {
  readonly from: string;
  readonly to: string;
  readonly lovebox: string;
  readonly created_at: Date;
  is_accepted: boolean
  is_declined: boolean
}

export interface SendInviteSuccessResponse {
  status: number;
  message: string;
}
