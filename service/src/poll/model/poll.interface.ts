export interface IUser {
  id: string;
  name: string;
}

export interface IVote {
  user: IUser;
  vote: string;
}

export interface IPoll {
  id: string;
  title: string;
  votes: IVote[];
}
