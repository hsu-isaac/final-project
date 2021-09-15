import React from 'react';
import { format } from 'date-fns';
import {
  Link
} from 'react-router-dom';

import EventLocation from '../components/eventLocation';

export default class EventList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      events: [],
      addresses: {}
    };
  }

  componentDidMount() {
    fetch('/api/events')
      .then(res => res.json())
      .then(data => this.setState({ events: data }));
  }

  render() {
    if (this.state.events) {
      return (
        <>
          <h1 className="header no-marg-bottom ">Events</h1>
          <ul>
            {
              this.state.events.map(events => {
                const { eventId, eventName, dateTime, imageUrl, location } = events;
                const date = new Date(dateTime);
                const formattedDate = format(date, 'MMMM do');
                const formattedTime = format(date, 'p');
                return (
                  <Link to={`/eventId/${eventId}`} style={{ textDecoration: 'none', color: 'black' }} key={eventId}>
                    <li id={eventId}>
                      <img src={imageUrl} id={eventId} className='eventImage'></img>
                      <div className="row justify-between">
                        <p className="bolded-header" id={eventId}>{eventName}</p>
                        <p id={eventId}>{formattedDate}</p>
                      </div>
                      <div className="row justify-between marg-bottom">
                        <p className="no-marg-top truncate address"><EventLocation location={location}/></p>
                        <p className="no-marg-top">{formattedTime}</p>
                      </div>
                    </li>
                  </Link>
                );
              })
            }
          </ul>
        </>
      );
    } else {
      return (
        <div className="single-container">
          <h1>You have no events</h1>
        </div>
      );
    }
  }
}
