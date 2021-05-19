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
