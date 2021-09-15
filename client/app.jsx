import React from 'react';
import CreateEvent from './pages/createEvent';
import EventList from './components/eventList';
import EventDetails from './pages/eventDetails';
import Navbar from './components/navbar';
import {
  Switch,
  Route
} from 'react-router-dom';

export default class App extends React.Component {
  render() {
    return (
      <>
        <Switch>
          <Route exact = {true} path="/">
            <div className="real-container">
              <div className="single-container">
                <EventList />
              </div>
            </div>
          </Route>
          <Route path="/create">
            <CreateEvent />
          </Route>
          <Route path="/eventId/:id">
            <div className="real-container">
              <div className="single-container">
                <EventDetails />
              </div>
            </div>
          </Route>
        </Switch>
        <Navbar />
      </>
    );
  }
}
