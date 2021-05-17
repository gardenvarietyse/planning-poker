import { IPoll } from '../model/poll.interface';

export interface IPollStore {
  createPoll: (title: string) => IPoll;
}

export interface IPollStoreConstructor {
  new (): IPollStore;
}
