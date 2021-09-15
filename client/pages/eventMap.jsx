import React, { Component } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const containerStyle = {
  width: '100%',
  height: '600px'
};

const center = {
  lat: 33.63,
  lng: -117.74
};

const mapsApiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;

export default class MyComponents extends Component {
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
        <h1>Map</h1>
        <LoadScript
          googleMapsApiKey= {mapsApiKey}
        >
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={center}
            zoom={10}
          >
          {this.state.events.map(({ location, eventId }) => (
            <Marker
              key={eventId}
              position={{ lat: location.x, lng: location.y }}
              onClick={() => {
                this.setState({ infoOpen: eventId });
              }}
            >
            </Marker>
          ))}
          </GoogleMap>
        </LoadScript>
      </>
    );
  }
}
