import { Connection } from 'mongoose';
import { LoveBoxSchema } from '../models/lovebox.schema';

export const loveboxProviders = [
  {
    provide: 'LOVEBOX_MODEL',
    useFactory: (connection: Connection) =>
      connection.model('Lovebox', LoveBoxSchema),
    inject: ['DATABASE_CONNECTION'],
  },
];
