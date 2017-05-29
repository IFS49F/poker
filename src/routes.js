import React from 'react';
import { Router, Route } from 'react-router';

import App from './pages/App/App';
import NotFound from './pages/NotFound/NotFound';

const Routes = (props) => (
  <Router {...props}>
    <Route path="/" component={App} />
    <Route path="*" component={NotFound} />
  </Router>
);

export default Routes;
