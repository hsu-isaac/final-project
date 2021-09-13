import React from 'react';

export default class EventList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      events: []
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
          <h1 className="header">Events</h1>
          <ul>
            {
              this.state.events.map(events => {
                const { eventId, eventName, dateTime, imageUrl } = events;
                return (
                  <div key={eventId} className="eventListContainer">
                    <li>
                      <img src={imageUrl} className='eventImage'></img>
                      <div className="row justify-between">
                        <p>{eventName}</p>
                        <p>{dateTime}</p>
                      </div>
                      <div className="row">
                        <p>address placeholder</p>
                      </div>
                    </li>
                  </div>
                );
              })
            }
          </ul>
        </>
      );
    } else {
      return (
        <div className="container">
          <h1>You have no events</h1>
        </div>
      );
    }
  }
}
