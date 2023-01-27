import { Document } from 'mongoose';

export interface Message extends Document {
  readonly message?: string;
  readonly image_url?: string;
  readonly video_url?: string;
  readonly user: string;
  readonly lovebox: string;
  readonly created_at: Date;
}
