import React from 'react';

export default class Navbar extends React.Component {
  render() {
    return (
      <nav>
        <div className="container">
          <div className="iconContainer">
            <img src="images/blue_home.png"/>
            <p>Home</p>
          </div>
        </div>
      </nav>
    );
  }
}
