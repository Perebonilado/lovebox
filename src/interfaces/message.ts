import { Document } from 'mongoose';

export interface Message extends Document {
  readonly message?: string;
  readonly image_url?: string;
  readonly video_url?: string;
  readonly user: string;
  readonly love_box: string;
  readonly created_at: Date;
  readonly isValid: boolean;
}
