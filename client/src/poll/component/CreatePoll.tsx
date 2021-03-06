import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { createPoll } from '../api';
import './CreatePoll.scss';

export const CreatePoll = () => {
  const history = useHistory();
  
  const [creatingPoll, setCreatingPoll] = useState(false);
  const [pollTitle, setPollTitle] = useState('');
  
  const onChangeTitle = (e: React.FormEvent<HTMLInputElement>) => {
    setPollTitle(e.currentTarget.value);
  };

  const onClickCreate = async () => {
    setCreatingPoll(true);

    const result = await createPoll(pollTitle);

    if (!result.ok) {
      setCreatingPoll(false);
      // todo: error message?
    }

    const resultJson = await result.json();
    const { id } = resultJson;

    history.push(`/poll/${id}`);
  };

  return (
    <>
      <h3>Enter poll title</h3>
      <div className="create-poll">
        <input className="create-poll__title" onChange={onChangeTitle} value={pollTitle} disabled={creatingPoll} />
        <button className="create-poll__submit" onClick={onClickCreate} disabled={pollTitle.length === 0 || creatingPoll}>
          Create
        </button>
      </div>
    </>
  );
};

