import React from 'react';
import {
  Link
} from 'react-router-dom';

export default class Navbar extends React.Component {
  render() {
    return (
      <nav className="footer">
        <div className="container justify-center">
          <div className="iconContainer row-33 justify-center column">
            <Link to="/" style={{ textDecoration: 'none' }} className="justify-center column">
              <img className="icon" src="/images/black_home.png" />
              <p className="iconCaption">Home</p>
            </Link>
          </div>
          <div className="iconContainer row-33 justify-center column">
            <Link to="/create" style={{ textDecoration: 'none' }} className="justify-center column">
              <img className="icon" src="/images/blue_plus_square.png" />
              <p className="iconCaption active">New</p>
            </Link>
          </div>
          <div className="iconContainer row-33 justify-center column">
          </div>
        </div>
      </nav>
    );
  }
}
