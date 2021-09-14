import React from 'react';
import { format } from 'date-fns';
import Geocode from 'react-geocode';

const mapsApiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;
Geocode.setApiKey(mapsApiKey);
Geocode.setLocationType('ROOFTOP');
Geocode.setRegion('en');

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
                if (!this.state.addresses[`${location.x},${location.y}`]) {
                  Geocode.fromLatLng(location.x, location.y).then(
                    response => {
                      const address = response.results[0].formatted_address;
                      this.setState(prevState => ({
                        addresses: {
                          ...prevState.addresses,
                          [`${location.x},${location.y}`]: address.slice(0, -5)
                        }
                      }));
                    },
                    error => {
                      console.error(error);
                    }
                  );
                }
                return (
                  <div key={eventId} className="eventListContainer">
                    <li>
                      <img src={imageUrl} className='eventImage'></img>
                      <div className="row justify-between">
                        <p className="bolded-header">{eventName}</p>
                        <p>{formattedDate}</p>
                      </div>
                      <div className="row justify-between marg-bottom">
                        <p className="no-marg-top truncate address">{this.state.addresses[`${location.x},${location.y}`]}</p>
                        <p className="no-marg-top">{formattedTime}</p>
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
