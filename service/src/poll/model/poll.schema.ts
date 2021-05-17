import * as Joi from '@hapi/joi';

export const postSchema = Joi.object({
  title: Joi.string().min(1).required(),
});
