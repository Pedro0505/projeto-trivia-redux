import React from 'react';
import { Route, Switch } from 'react-router';
import Game from './pages/Game';
import Login from './pages/Login';
import Ranking from './pages/Ranking';
import Settings from './pages/Settings';
import Feedback from './pages/Feedback';

class App extends React.Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" render={ () => <Login /> } />
        <Route exact path="/game" render={ () => <Game /> } />
        <Route exact path="/ranking" render={ () => <Ranking /> } />
        <Route exact path="/settings" render={ () => <Settings /> } />
        <Route exact path="/feedback" render={ () => <Feedback /> } />
      </Switch>
    );
  }
}

export default App;
