import React from 'react';
import ReactDOM from 'react-dom';
import Join from './Join';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Join />, div);
});
