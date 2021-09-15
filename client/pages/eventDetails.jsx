import React from 'react';

export default class EventDetails extends React.Component {
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
      <>
        <h1>hi</h1>
{/*         <h1 className="header no-marg-bottom">{eventName}</h1>
        <img src={imageUrl}></img>
        <div className="row">
          <p>{formattedDate}</p>
          <p>{formattedTime}</p>
        </div> */}
      </>
    );
  }
}
