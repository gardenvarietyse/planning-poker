import { POLL_CONFIG } from '../config/poll.config';

export const createPoll = async (title: string) => {
  const createEndpoint = `${POLL_CONFIG.apiEndpoint}/poll`;
  const body = {
    title,
  };

  return fetch(createEndpoint, {
    method: 'POST',
    body: JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json'
    }
  });
};

export const ALLOWED_VOTES = ['0', '1/2', '1', '2', '3', '5', '8', '13'];
export const voteInPoll = async (pollId: string, userId: string, vote: string) => {
  const createEndpoint = `${POLL_CONFIG.apiEndpoint}/poll/vote`;
  const body = {
    pollId,
    userId,
    vote,
  };

  return fetch(createEndpoint, {
    method: 'PUT',
    body: JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json'
    }
  });
};
