import { Document } from 'mongoose';

export interface Notification extends Document {
  readonly created_at: Date;
  readonly category:
    | 'lovebox_exit'
    | 'lovebox_accepted_request'
    | 'new_lovebox_message';
  readonly from: string;
  readonly to: string;
  readonly is_read: boolean;
}
