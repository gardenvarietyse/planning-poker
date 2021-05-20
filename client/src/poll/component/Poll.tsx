import React, { FunctionComponent, useState } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { StringKeyObject } from '../../util/types';
import { JoinPoll } from './JoinPoll';
import { PollVoting } from './PollVoting';

export const Poll: FunctionComponent<RouteComponentProps> = ({ match }) => {
  const pollId = (match.params as StringKeyObject).pollId;
  
  const [userName, setUserName] = useState<string | null>(null);

  return userName
    ? <PollVoting userName={userName} pollId={pollId} />
    : <JoinPoll joinWithName={setUserName} />;
};
