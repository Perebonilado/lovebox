import { Schema, SchemaTypes } from 'mongoose';
import { maxNumberOfLoveboxMembers } from 'src/constants';

export const LoveBoxSchema = new Schema({
  created_at: { type: Date, default: Date.now() },
  members: {
    type: [{ type: SchemaTypes.ObjectId, ref: 'User' }],
    validate: [
      arrayLimit,
      `{PATH} exceeds the limit of ${maxNumberOfLoveboxMembers}`,
    ],
  },
  title: { type: String, required: true },
  created_by: { type: SchemaTypes.ObjectId, ref: 'User', required: true },
  isDeleted: { type: Boolean, default: false },
});

function arrayLimit(val: string[]) {
  return val.length <= maxNumberOfLoveboxMembers;
}
