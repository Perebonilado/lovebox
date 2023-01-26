import { Schema, SchemaTypes } from 'mongoose';

export const InviteSchema = new Schema({
  from: { type: SchemaTypes.ObjectId, required: true, ref: 'User' },
  to: { type: SchemaTypes.ObjectId, required: true, ref: 'User' },
  lovebox: { type: SchemaTypes.ObjectId, required: true, ref: 'Lovebox' },
  created_at: { type: Date, default: Date.now() },
  is_accepted: { type: Boolean, default: false },
});
