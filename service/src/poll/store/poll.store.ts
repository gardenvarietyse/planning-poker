import { IPoll } from '../model/poll.interface';

export interface IPollStore {
  createPoll: (title: string) => IPoll;
  getPoll: (id: string) => IPoll;
  addUser(pollId: string, userId: string, name: string): boolean;
  setVote(pollId: string, userId: string, vote: string): boolean;
}

export interface IPollStoreConstructor {
  new (): IPollStore;
}
