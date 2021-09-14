import React from 'react';
import CreateEvent from './pages/createEvent';
import ViewEvent from './pages/viewEvents';
import {
  Switch,
  Route
} from 'react-router-dom';

export default class App extends React.Component {
  render() {
    return (
      <Switch>
        <Route exact = {true} path="/">
          <ViewEvent />
        </Route>
        <Route path="/create">
          <CreateEvent />
        </Route>
      </Switch>
    );
  }
}
