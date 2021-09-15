import React, { useState } from 'react';
import { format } from 'date-fns';
import {
  useParams
} from 'react-router-dom';
import { useEffect } from 'react/cjs/react.development';

export default function EventDetails() {
  const [event, setEvent] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    fetch(`/api/events/${id}`)
      .then(res => res.json())
      .then(data => setEvent(data[0]));
  }, []);
  if (!event) {
    return (
      <></>
    );
  }
  const date = new Date(event.dateTime);
  const formattedDate = format(date, 'MMMM do');
  const formattedTime = format(date, 'p');
  return (
      <>
        <h1 className="header no-marg-bottom">{event.eventName}</h1>
        <img src={event.imageUrl}></img>
        <div className="row">
          <p>{formattedDate}</p>
          <p>{formattedTime}</p>
          <p>{event.description}</p>
        </div>
      </>
  );
}
