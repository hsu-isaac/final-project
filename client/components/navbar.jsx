import React from 'react';

export default class Navbar extends React.Component {
  render() {
    return (
      <nav className="footer">
        <div className="container">
          <div className="iconContainer row-33 justify-center">
            <img src="images/blue_home.png"/>
            <p>Home</p>
          </div>
        </div>
      </nav>
    );
  }
}
