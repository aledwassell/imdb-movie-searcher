import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import Movies from './_components/movies';
import 'tachyons/css/tachyons.css';

ReactDOM.render(<Movies />, document.getElementById('root'));
serviceWorker.unregister();
