import React from 'react';
import ReactDOM from 'react-dom';
import Actions from './Actions';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Actions />, div);
});
