import React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { StringKeyObject } from '../../util/types';

export const Poll = ({ match }: RouteComponentProps) => {
  const pollId = (match.params as StringKeyObject).pollId;

  return <div>poll placeholder ({pollId})</div>;
};
