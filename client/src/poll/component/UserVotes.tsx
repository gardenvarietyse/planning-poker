import React, { FunctionComponent } from 'react';
import { IVote } from '../api/poll.interface';

export const UserVotes: FunctionComponent<UserVotesProps> = ({ votes }) => (
  <div className="users">
    <ul>
      {votes.map(v => (
        <li key={v.user.id}>{v.user.name} ({v.vote}) </li>
        ))}
    </ul>
  </div>
);

type UserVotesProps = {
  votes: IVote[];
};
