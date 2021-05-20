import { IPoll, IUser, IVote } from '../api/poll.interface';

export type PollReducerAction = {
  type: 'setPoll',
  poll: IPoll,
} | {
  type: 'addUser',
  user: IUser,
} | {
  type: 'setVote',
  vote: IVote,
};

export const setPoll = (poll: IPoll): PollReducerAction => ({ type: 'setPoll', poll });
export const addUser = (user: IUser): PollReducerAction => ({ type: 'addUser', user });
export const setVote = (vote: IVote): PollReducerAction => ({ type: 'setVote', vote });

export const pollReducer = (state: IPoll, action: PollReducerAction): IPoll => {
  switch (action.type) {
    case 'setPoll':
      return action.poll;

    case 'addUser':
      const { user } = action;
      return {
        ...state,
        votes: [
          ...state.votes,
          {
            user,
            vote: null,
          }
        ],
      };

      case 'setVote':
        const { vote: newVote } = action;

        const updatedVotes = [...state.votes];
        const userVote = updatedVotes.find(v => v.user.id === newVote.user.id);

        if (!userVote) {
          throw new Error('Invalid user voted');
        }

        userVote.vote = newVote.vote;

        return {
          ...state,
          votes: updatedVotes,
        }
  }
};
