import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Landing from 'pages/Landing/Landing';
import Room from 'pages/Room/Room';

const App = () => (
  <Router>
    <Switch>
      <Route exact path="/" component={Landing} />
      <Route path="/:room" component={Room} />
    </Switch>
  </Router>
);

export default App;
