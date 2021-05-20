export interface IUser {
  id: string;
  name: string;
}

export interface IVote {
  user: IUser;
  vote: string | null;
}

export interface IPoll {
  id: string;
  title: string;
  votes: IVote[];
}

export interface IPollJoin {
  user: IUser;
  poll: IPoll;
}
