import { Connection } from 'mongoose';
import { InviteSchema } from '../models/invite.schema';

export const inviteProviders = [
  {
    provide: 'INVITE_MODEL',
    useFactory: (connection: Connection) =>
      connection.model('Invite', InviteSchema),
    inject: ['DATABASE_CONNECTION'],
  },
];
