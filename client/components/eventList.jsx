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
                  <p>{imageUrl}</p>
                </li>
              );
            })
          }
        </ul>
      </div>
    );
  }
}
