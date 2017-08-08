import React from 'react';
import ReactDOM from 'react-dom';
import App from 'pages/App/App';

import registerServiceWorker from './registerServiceWorker';
import googleAnalytics from './googleAnalytics';
import './index.css';

googleAnalytics();

ReactDOM.render(
  <App />,
  document.getElementById('root')
);

registerServiceWorker();
