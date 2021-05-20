import React, { FunctionComponent } from 'react';
import "./VoteSelection.scss";

export const VoteSelection: FunctionComponent<VoteSelectionProps> = ({ votes, castVote }) => (
  <div className="vote-buttons">
    <span>Select your vote</span>
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
