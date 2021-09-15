import React, { useState } from 'react';
import { format } from 'date-fns';
import {
  useParams
} from 'react-router-dom';
import { useEffect } from 'react/cjs/react.development';
import EventLocation from '../components/eventLocation';

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
        <img className="eventImageDescription" src={event.imageUrl}></img>
        <div className="row justify-between border-bottom">
          <p>{formattedDate}</p>
          <p>{formattedTime}</p>
        </div>
        <div className="justify-between row border-bottom padding-top-bottom">
          <img src="/images/blue_geomarker.png"></img>
          <div className="width-20"></div>
          <EventLocation location={event.location} />
        </div>

          <p>{event.description}</p>
      </>
  );
}
