import React, { FunctionComponent, useReducer, useState } from 'react';
import { ALLOWED_VOTES, voteInPoll } from '../api';
import { IPoll, IPollJoin, IUser, IVote } from '../api/poll.interface';
import { POLL_CONFIG } from '../config/poll.config';
import { useSocket } from '../hook/useSocket';
import { addUser, pollReducer, setPoll, setVote } from '../state/pollReducer';
import { UserVotes } from './UserVotes';
import { VoteSelection } from './VoteSelection';

/*
  a bit too much logic & presentation mixed here I think
*/

const EMPTY_POLL: IPoll = {
  id: '',
  title: '',
  votes: [],
};

export const PollVoting: FunctionComponent<PollVoteProps> = ({ pollId, userName }) => {
  const [userId, setUserId] = useState('');

  const [poll, pollDispatch] = useReducer(pollReducer, EMPTY_POLL);
  
  const joinedPoll = (data: IPollJoin) => {
    const { user, poll } = data;
    console.log(`joined as ${user.id}`);

    setUserId(user.id);
    pollDispatch(setPoll(poll));
  };

  const userVoted = (vote: IVote) => {
    pollDispatch(setVote(vote));
  };

  const userJoined = (user: IUser) => {
    pollDispatch(addUser(user));
  };

  useSocket({
    name: userName,
    pollId,
  }, {
    joined: joinedPoll,
    user_voted: userVoted,
    user_joined: userJoined,
  },
    POLL_CONFIG.socketEndpoint,
  );

  const castVote = async (vote: string) => {
    const result = await voteInPoll(poll.id, userId, vote);

    if (!result.ok) {
      // todo: error message
    }
  };

  return poll ? (
    <>
      <h3>{poll.title}</h3>
      <h5>(user id {userId})</h5>
      <div className="poll-voting">
        <UserVotes votes={poll.votes} />
        <VoteSelection votes={ALLOWED_VOTES} castVote={castVote} />
      </div>
    </>
  ) : null;
};

type PollVoteProps = {
  pollId: string;
  userName: string;
};
