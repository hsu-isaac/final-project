import React, { Component } from 'react';
import { GoogleMap, Marker, InfoWindow } from '@react-google-maps/api';
import { format } from 'date-fns';

const containerStyle = {
  width: '100%',
  height: '575px'
};

const center = {
  lat: 33.63,
  lng: -117.74
};

export default class EventMap extends Component {
  constructor(props) {
    super(props);
    this.state = {
      events: [],
      infoOpen: null
    };
  }

  componentDidMount() {
    fetch('/api/events')
      .then(res => res.json())
      .then(data => this.setState({ events: data }));
  }

  render() {
    return (
      <>
        <h1 className="header margin-top">Map</h1>
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={center}
            zoom={10}
            onClick={() => {
              this.setState({ infoOpen: null });
            }}
          >
          {this.state.events.map(({ location, eventId, dateTime, description, eventName, imageUrl }) => (
            <Marker
              key={eventId}
              position={{ lat: location.x, lng: location.y }}
              onClick={() => {
                this.setState({ infoOpen: eventId });
              }}
            >
              {this.state.infoOpen === eventId &&
                <InfoWindow
                  position={{ lat: location.x, lng: location.y }}>
                  <div className="infowindow">
                    <h1 className='header'>{eventName}</h1>
                    <img src={imageUrl} className='infoImage'></img>
                    <p>{description}</p>
                    <div className="row justify-between">
                      <p>{format(new Date(dateTime), 'MMMM do')}</p>
                      <p>{format(new Date(dateTime), 'p')}</p>
                    </div>
                  </div>
                </InfoWindow>
              }
            </Marker>
          ))}
          </GoogleMap>
      </>
    );
  }
}
