import React from 'react';
import './App.css';
import { useSocket } from './reducer/useSocket';

function App() {
  useSocket({
    name: 'bob',
    pollId: '9e7a1cbd-52ff-4533-8265-e250a66155d9',
  }, {
    vote: data => console.log('got data!', data),
    join: data => console.log('you joined', data),
  });
  
  return (
    <div className="App">
      yo
    </div>
  );
}

export default App;
