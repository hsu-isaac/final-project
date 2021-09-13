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
        <div className="container">
          <ul>
            {
              this.state.events.map(events => {
                const { eventId, eventName, dateTime, imageUrl } = events;
                return (
                  <li key={eventId}>
                    <p>{eventName}</p>
                    <p>{dateTime}</p>
                    <img src={imageUrl}></img>
                  </li>
                );
              })
            }
          </ul>
        </div>
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
