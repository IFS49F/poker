import React from 'react';
import ReactDOM from 'react-dom';
import GithubCorner from './GithubCorner';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<GithubCorner />, div);
});
