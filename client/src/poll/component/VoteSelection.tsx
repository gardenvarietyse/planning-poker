import React, { FunctionComponent } from 'react';

export const VoteSelection: FunctionComponent<VoteSelectionProps> = ({ votes, castVote }) => (
  <div className="users">
    <ul>
      {votes.map(vote => (
        <li key={vote}>
          <button onClick={() => castVote(vote)}>
            {vote}
          </button>
        </li>
        ))}
    </ul>
  </div>
);

type VoteSelectionProps = {
  votes: string[];
  castVote: (vote: string) => void;
};
