import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import Movies from './_components/movies';
import axios from 'axios';
import 'tachyons/css/tachyons.css';

ReactDOM.render(<Movies />, document.getElementById('root'));

// * The project should be written in react, using ES6 (or Typescript if you prefer)
// * The project should be a website and NOT a mobile app, use chrome devtools or something similar to select a mobile version.
// * Use create-react-app as an easy way of setting up the project
// * We’d like you to write tests, preferably in a test-driven development manner, but not necessary. You can decide what layers to test.
// * We want to see clean, modular, readable and secure code
// * As mentioned, fetch the data from the Open Movie DB, http://www.omdbapi.com/

serviceWorker.unregister();
