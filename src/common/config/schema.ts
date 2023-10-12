import * as Joi from 'joi';

export const DEFAULT_PORT = 3000;

export const WEB_PORT = 'WEB_PORT';

export const DB_HOST = 'DB_HOST';
export const DB_PORT = 'DB_PORT';
export const DB_DATABASE = 'DB_DATABASE';
export const DB_USERNAME = 'DB_USERNAME';
export const DB_PASSWORD = 'DB_PASSWORD';
export const DB_LOGGING = 'DB_LOGGING';

export const schema = Joi.object().keys({
  // WEB
  [WEB_PORT]: Joi.number().default(DEFAULT_PORT),

  // DB
  [DB_HOST]: Joi.string().default('localhost'),
  [DB_PORT]: Joi.number().default(5432),
  [DB_DATABASE]: Joi.string().required(),
  [DB_USERNAME]: Joi.string().required(),
  [DB_PASSWORD]: Joi.string().required(),
  [DB_LOGGING]: Joi.boolean().default(false),
});
