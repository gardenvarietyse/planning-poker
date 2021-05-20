import React, { FunctionComponent } from 'react';
import { IVote } from '../api/poll.interface';
import './UserVotes.scss';

export const UserVotes: FunctionComponent<UserVotesProps> = ({ votes }) => (
  <div className="users">
    <ul>
      {votes.map(v => (
        <li key={v.user.id}>
          <div className="users__name">
            {v.user.name}
          </div>
          <div className={`users__vote ${v.vote ? '' : 'users__vote--unknown'}`}>
            {v.vote || '?'}
          </div>
        </li>
        ))}
    </ul>
  </div>
);

type UserVotesProps = {
  votes: IVote[];
};
