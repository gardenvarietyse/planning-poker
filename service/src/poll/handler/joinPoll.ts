import * as Hapi from '@hapi/hapi';
import { v4 as uuid } from 'uuid';

import { joinSchema } from '../model/poll.schema';
import { IPollStore } from '../store/poll.store';

const UUID_V4_REGEX = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/;

export const handler = (store: IPollStore) => (request: Hapi.Request, h: Hapi.ResponseToolkit) => {
  const { error } = joinSchema.validate(request.payload);

  if (error) {
    return h.response({ error: 'invalid_body' }).code(400);
  }

  const payload = request.payload as any;
  const { pollId, name } = payload;

  const poll = store.getPoll(pollId);

  if (!poll) {
    return h.response({ error: 'not_found' }).code(404);
  }

  // todo: allow rejoining with valid user id
  const user = store.addUser(pollId, name);

  return h.response({
    userId: user.id,
    poll,
  }).code(200);
};

export const registerHandler = (server: Hapi.Server, store: IPollStore) => {
  server.route({
    method: 'POST',
    path: '/poll/join',
    handler: handler(store),
  });
};
