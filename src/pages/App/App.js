import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Landing from 'pages/Landing/Landing';
import Room from 'pages/Room/Room';
import GithubCorner from 'components/GithubCorner/GithubCorner';
import './App.css';

const App = () => (
  <Router>
    <div>
      <Route exact path="/" component={Landing} />
      <Route path="/:room" component={Room} />
      <GithubCorner url='https://github.com/IFS49F' />
    </div>
  </Router>
);

export default App;
