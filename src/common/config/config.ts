import * as path from 'path';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';
import { SnakeNamingStrategy } from '../type-orm/snake-naming-strategy';

import {
  // WEB
  WEB_PORT,

  // DB
  DB_HOST,
  DB_PORT,
  DB_DATABASE,
  DB_USERNAME,
  DB_PASSWORD,
  DB_LOGGING,
} from './schema';

import { version } from './version';

const ext = path.extname(__filename);

const dbDir = path.relative(
  process.cwd(),
  path.resolve(`${__dirname}/../../db`),
);

export class Config {
  constructor(private readonly envData: Record<string, string>) {}

  protected getValue<T = string>(name: string) {
    return <T>(<unknown>this.envData[name]);
  }

  get webPort() {
    return this.getValue<number>(WEB_PORT);
  }

  get dbConfig() {
    return <PostgresConnectionOptions>{
      type: 'postgres',
      namingStrategy: new SnakeNamingStrategy(),
      dropSchema: false,
      synchronize: false,

      host: this.getValue(DB_HOST),
      port: this.getValue<number>(DB_PORT),
      database: this.getValue(DB_DATABASE),
      username: this.getValue(DB_USERNAME),
      password: this.getValue(DB_PASSWORD),
      logging: this.getValue<boolean>(DB_LOGGING),

      entities: [`${dbDir}/models/**/*.entity${ext}`],
      migrations: [`${dbDir}/migrations/**/*${ext}`],
    };
  }

  get version() {
    return version;
  }
}
