import React from 'react';
import ReactDOM from 'react-dom';
import Movies from './movies';

it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Movies />, div);
    ReactDOM.unmountComponentAtNode(div);
});