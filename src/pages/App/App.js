import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Landing from 'pages/Landing/Landing';
import Room from 'pages/Room/Room';
import { Helmet } from 'react-helmet';

const App = () => (
  <div className="App">
    <Helmet titleTemplate="%s ♠︎ Poker4Fun" defaultTitle="Poker4Fun" />
    <Router>
      <Switch>
        <Route exact path="/" component={Landing} />
        <Route path="/:room" component={Room} />
      </Switch>
    </Router>
  </div>
);

export default App;
