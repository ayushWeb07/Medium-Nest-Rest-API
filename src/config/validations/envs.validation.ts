import * as Joi from 'joi';

export default Joi.object({
  NODE_ENV: Joi.string()
    .required()
    .valid('development', 'production', 'testing'),
  SERVER_PORT: Joi.number().required().port(),
  JWT_ACCESS_SECRET_KEY: Joi.string().required().length(64), // 256 bits
  JWT_ACCESS_EXPIRES: Joi.number().required(),
  JWT_REFRESH_SECRET_KEY: Joi.string().required().length(64), // 256 bits
  JWT_REFRESH_EXPIRES: Joi.number().required(),
  API_VERSION: Joi.string().required(),
  DATABASE_URL: Joi.string().required(),
});
