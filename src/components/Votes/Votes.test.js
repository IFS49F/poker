import React from 'react';
import ReactDOM from 'react-dom';
import Votes from './Votes';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Votes />, div);
});
