import * as Hapi from '@hapi/hapi';

import { registerHandler as registerCreatePollHandler } from './handler/createPoll';
import { registerHandler as registerJoinPollHandler } from './handler/joinPoll';

import { InMemoryPollStore } from './store/in-memory-poll.store';
import { IPollStoreConstructor } from './store/poll.store';

export const registerPollFeature = (server: Hapi.Server, storeCtor: IPollStoreConstructor = InMemoryPollStore) => {
  const store = new storeCtor();

  registerCreatePollHandler(server, store);
  registerJoinPollHandler(server, store);
};
