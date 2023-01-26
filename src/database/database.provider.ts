import * as mongoose from 'mongoose';

export const databaseProviders = [
  {
    provide: 'DATABASE_CONNECTION',
    useFactory: (): Promise<typeof mongoose> =>
      mongoose.connect('mongodb+srv://mylohebron:Mongopak@cluster0.nfivtcl.mongodb.net/lovebox?retryWrites=true&w=majority'),
  },
]