import React from 'react';
import ReactDOM from 'react-dom';
import CaveMan from './CaveMan';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<CaveMan />, div);
});
