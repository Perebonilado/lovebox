import { Schema, SchemaTypes } from 'mongoose';

export const NotificationSchema = new Schema({
  created_at: { type: Date, default: Date.now() },
  category: {
    type: String,
    enum: ['lovebox_exit', 'lovebox_accepted_request', 'new_lovebox_message'],
  },
  lovebox: { type: SchemaTypes.ObjectId, ref: 'Lovebox' },
  from: { type: SchemaTypes.ObjectId, ref: 'User' },
  to: { type: SchemaTypes.ObjectId, ref: 'User' },
  is_read: { type: Boolean, default: false },
});
