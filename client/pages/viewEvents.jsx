import React from 'react';
import Navbar from '../components/navbar.jsx';
import EventList from '../components/eventList';
import EventDetails from '../pages/eventDetails';
import {
  Switch,
  Route
} from 'react-router-dom';

export default function ViewEvents(props) {
  return (
    <div className="real-container">
      <div className="single-container">
        <Switch>
          <Route exact = {true} path="/">
            <EventList />
          </Route>
          <Route path="/eventId/:id">
            <EventDetails />
          </Route>
        </Switch>
      </div>
      <Navbar />
    </div>
  );
}
