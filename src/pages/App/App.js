import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Landing from 'pages/Landing/Landing';
import Room from 'pages/Room/Room';
import './App.css';

const App = () => (
  <Router>
    <div>
      <Route exact path="/" component={Landing} />
      <Route path="/:room" component={Room} />
    </div>
  </Router>
);

export default App;
