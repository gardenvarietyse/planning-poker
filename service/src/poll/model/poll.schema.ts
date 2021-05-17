import * as Joi from '@hapi/joi';

export const createSchema = Joi.object({
  title: Joi.string().min(1).required(),
});

export const joinSchema = Joi.object({
  name: Joi.string().alphanum().min(1).required(),
});
