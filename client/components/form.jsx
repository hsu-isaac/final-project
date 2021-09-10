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
    } else if (attribute === 'location') {
      setLocation(e.target.value);
    }
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (eventName && dateTime && description && location) {
      const zonedDateTime = `${dateTime}:00Z`;
      const init = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ eventName, dateTime: zonedDateTime, description, location, imageUrl })
      };
      fetch('/api/events', init)
        .then(() => {
          setEventName('');
          setDateTime('');
          setDescription('');
          setLocation('');
          setImageUrl('');
        })
        .catch(err => console.error(err));
    }
  };

  const mapInput = ({ lat, lng }) => {
    setLocation(`(${lat}, ${lng})`);
  };

  return (
      <>
        <form id="form" onSubmit={handleSubmit}>
          <div className="wide-row">
            <div className="column-half">
              <input className="width-100" type="text" id="eventName" value={eventName} onChange={handleChange} placeholder="Event Name" required></input>
              <h2>Location</h2>
              <Map onSearch={mapInput} required/>
            </div>
            <div className="column-half">
              <h2 className="margin-top">Date</h2>
              <input type="datetime-local" id="dateTime" value={dateTime} onChange={handleChange} required></input>
              <h2>Description</h2>
              <textarea className="width-100 rounded" rows="10" id="description" value={description} onChange={handleChange} required></textarea>
              <h2>Picture</h2>
              <input type="file" id="imageUrl" accept="image/png, image/jpeg" value={imageUrl} onChange={handleChange}></input>
            </div>
          </div>

          <div className="justify-center">
            <button className="big-button justify-center" type="submit">Create Event</button>
          </div>
        </form>
        <div className="footerSpace"></div>
      </>
  );
}
