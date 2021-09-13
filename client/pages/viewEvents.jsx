import React from 'react';
import Navbar from '../components/navbar.jsx';
import EventList from '../components/eventList';

export default function ViewEvents(props) {
  return (
    <div className="real-container">
      <div className="container">
        <EventList></EventList>
      </div>
      <Navbar />
    </div>
  );
}
