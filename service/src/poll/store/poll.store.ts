import { IPoll } from '../model/poll.interface';

export interface IPollStore {
  createPoll: (title: string) => IPoll;
  getPoll: (id: string) => IPoll;
  addUser(pollId: string, userId: string, name: string);
}

export interface IPollStoreConstructor {
  new (): IPollStore;
}
