import React from 'react';
import Geocode from 'react-geocode';

const mapsApiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;
Geocode.setApiKey(mapsApiKey);
Geocode.setLocationType('ROOFTOP');
Geocode.setRegion('en');

export default class EventLocation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      address: ''
    };
  }

  componentDidMount() {
    Geocode.fromLatLng(this.props.location.x, this.props.location.y)
      .then(response => {
        const addressText = response.results[0].formatted_address;
        this.setState({ address: addressText });
      },
      error => {
        console.error(error);
      });
  }

  render() {
    return (
      <span className="truncate">{this.state.address}</span>
    );
  }
}
