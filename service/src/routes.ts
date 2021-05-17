import * as Hapi from '@hapi/hapi';
import { registerHandler as registerCreatePollHandler } from './poll/handler/createPoll';
import { InMemoryPollStore } from './poll/store/in-memory-poll.store';

export const registerAll = (server: Hapi.Server) => {
  registerCreatePollHandler(server, InMemoryPollStore);
};
