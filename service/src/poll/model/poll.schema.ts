import * as Joi from '@hapi/joi';
import { UUID_V4_REGEX } from '../../util/regex';

export const createSchema = Joi.object({
  title: Joi.string().min(1).required(),
});

export const joinSchema = Joi.object({
  pollId: Joi.string().pattern(UUID_V4_REGEX).required(),
  name: Joi.string().alphanum().min(1).required(),
});

const ALLOWED_VOTES = ['0', '1/2', '1', '2', '3', '5', '8', '13'];

export const voteSchema = Joi.object({
  pollId: Joi.string().pattern(UUID_V4_REGEX).required(),
  userId: Joi.string().pattern(UUID_V4_REGEX).required(),
  vote: Joi.string().valid(...ALLOWED_VOTES).required(),
});
