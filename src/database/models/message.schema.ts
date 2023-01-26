import { Schema, SchemaTypes } from 'mongoose';

export const MessageSchema = new Schema({
  message: { type: String, default: '' },
  image_url: { type: String, default: '' },
  video_url: { type: String, default: '' },
  user: { type: SchemaTypes.ObjectId, ref: 'User' },
  lovebox: { type: SchemaTypes.ObjectId, ref: 'Lovebox' },
  created_at: { type: Date, default: Date.now() },
});
