import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';

import './App.scss';
import { CreatePoll } from './poll/component/CreatePoll';
import { Poll } from './poll/component/Poll';

export const App = () => (
  <Router>
    <div className="main">
      <h1>planning poker</h1>
      <Switch>
        <Route path="/poll/:pollId" component={Poll} />
        <Route path="/" component={CreatePoll} />
      </Switch>
    </div>
  </Router>
);

