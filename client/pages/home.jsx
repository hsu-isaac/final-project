import React from 'react';
import Navbar from '../components/navbar.jsx';
import EventForm from '../components/form.jsx';

export default function Home(props) {
  return (
    <>
      <div className="real-container">
        <div className="container">
          <EventForm />
          <Navbar />
        </div>
      </div>
    </>
  );
}
