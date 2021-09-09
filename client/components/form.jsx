import React, { useState } from 'react';
import Map from './map';

export default function EventForm() {
  const [eventName, setEventName] = useState('');
  const [dateTime, setDateTime] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  const handleChange = e => {
    const attribute = e.target.getAttribute('id');
    if (attribute === 'eventName') {
      setEventName(e.target.value);
    } else if (attribute === 'dateTime') {
      setDateTime(e.target.value);
    } else if (attribute === 'description') {
      setDescription(e.target.value);
    } else if (attribute === 'imageUrl') {
      setImageUrl(e.target.value);
    }
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (eventName && dateTime && description && location && imageUrl) {
      const zonedDateTime = `${dateTime}:00Z`;
      const init = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ eventName, zonedDateTime, description, location, imageUrl })
      };
      fetch('/api/events', init)
        .then(() => {
          setEventName('');
          setDateTime('');
          setDescription('');
          setLocation('');
          setLocation('');
          setImageUrl('');
        })
        .catch(err => console.error(err));
    }
  };

  return (
      <>
        <form id="form" onSubmit={handleSubmit}>
          <input type="text" id="eventName" value={eventName} onChange={handleChange} placeholder="Event Name"></input>
          <h2>Location</h2>
          <Map />
          <h2>Date</h2>
          <input type="datetime-local" id="dateTime" value={dateTime} onChange={handleChange}></input>
          <h2>Description</h2>
          <input type="textarea" id="description" value={description} onChange={handleChange}></input>
          <h2>Picture</h2>
          <input type="file" id="imageUrl" accept="image/png, image/jpeg" value={imageUrl} onChange={handleChange}></input>
        </form>
      </>
  );
}
