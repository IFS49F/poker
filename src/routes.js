import React from 'react';
import { Router, Route } from 'react-router';

import App from 'pages/App/App';
import Room from 'pages/Room/Room';

const Routes = (props) => (
  <Router {...props}>
    <Route path="/" component={App} />
    <Route path="*" component={Room} />
  </Router>
);

export default Routes;
