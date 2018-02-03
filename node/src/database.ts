import * as mongoose from 'mongoose';
import { Mongoose } from 'mongoose';

export class Database {
  constructor(private databaseUri: string) {
  }

  public connect(): Promise<Mongoose> {
    return mongoose.connect(this.databaseUri);
  }
}
