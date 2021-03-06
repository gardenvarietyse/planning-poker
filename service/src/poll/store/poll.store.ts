import { IPoll, IUser, IVote } from '../model/poll.interface';

export interface IPollStore {
  createPoll: (title: string) => IPoll;
  getPoll: (id: string) => IPoll;
  addUser: (poll: IPoll, name: string) => IUser;
  setVote: (poll: IPoll, userId: string, vote: string) => IVote;
}

export interface IPollStoreConstructor {
  new (): IPollStore;
}
