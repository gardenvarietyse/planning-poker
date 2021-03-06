import React, { FunctionComponent, useState } from 'react';

export const JoinPoll: FunctionComponent<JoinPollProps> = ({ joinWithName }) => {
  const [userName, setUserName] = useState('');
  
  const onChangeUserName = (e: React.FormEvent<HTMLInputElement>) => {
    setUserName(e.currentTarget.value);
  };

  // reuse create-poll styles for convenience
  return (
    <>
      <h3>Enter your name</h3>
      <div className="create-poll">
        <input data-testid="join-poll-name" className="create-poll__title" onChange={onChangeUserName} value={userName} />
        <button className="create-poll__submit" onClick={() => joinWithName(userName)} disabled={userName.length === 0}>
          Join
        </button>
      </div>
    </>
  );
};

type JoinPollProps = {
  joinWithName: (name: string) => void;
};
