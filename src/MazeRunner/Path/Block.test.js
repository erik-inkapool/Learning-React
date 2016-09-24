import React from 'react';
import ReactDOM from 'react-dom';
import Block from './Block';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Block blockWidth={1} xPos={0} yPos={0} walls={[0,0,0,0]} color="red" />, div);
});
