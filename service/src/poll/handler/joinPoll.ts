import * as Hapi from '@hapi/hapi';

import { joinSchema } from '../model/poll.schema';
import { IPollStore } from '../store/poll.store';

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
  const user = store.addUser(poll, name);

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
