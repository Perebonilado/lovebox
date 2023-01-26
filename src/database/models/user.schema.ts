import * as mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true, dropDups: true },
  email: { type: String, required: true, unique: true, dropDups: true },
  password: { type: String, required: true },
  loveboxes: {
    type: [{ type: mongoose.SchemaTypes.ObjectId, ref: 'Lovebox' }],
  },
});
