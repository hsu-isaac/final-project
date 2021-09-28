import React from 'react';
import {
  Link
} from 'react-router-dom';

export default class Navbar extends React.Component {
  render() {
    return (
      <>
        <nav className="footer">
          <div className="container justify-center">
            <div className="icon-container row-33 justify-center column">
              <Link to="/" style={{ textDecoration: 'none' }} className="justify-center column">
                <img className="icon" src="/images/black_home.png" />
                <p className="icon-caption">Home</p>
              </Link>
            </div>
            <div className="icon-container row-33 justify-center column">
              <Link to="/create" style={{ textDecoration: 'none' }} className="justify-center column">
                <img className="icon" src="/images/blue_plus_square.png" />
                <p className="icon-caption active">New</p>
              </Link>
            </div>
            <div className="icon-container row-33 justify-center column">
              <Link to="/map" style={{ textDecoration: 'none' }} className="justify-center column">
                <img className="icon" src="/images/black_geomarker.png" />
                <p className="icon-caption">Map</p>
              </Link>
            </div>
          </div>
        </nav>
        <nav className="nav-header">
          <div className="container flex">
            <div className="icon-container column justify-center">
              <Link to="/" style={{ textDecoration: 'none' }} className="justify-center column">
                <img className="header-image" src="./images/people_image.png"></img>
              </Link>
            </div>
            <div className="icon-container column justify-center">
              <Link to="/" style={{ textDecoration: 'none' }} className="justify-center column">
                <p className="icon-caption">Home</p>
              </Link>
            </div>
            <div className="icon-container column justify-center">
              <Link to="/create" style={{ textDecoration: 'none' }} className="justify-center column">
                <p className="icon-caption header-caption">New</p>
              </Link>
            </div>
            <div className="icon-container column justify-center">
              <Link to="/map" style={{ textDecoration: 'none' }} className="justify-center column">
                <p className="icon-caption header-caption">Map</p>
              </Link>
            </div>
          </div>
        </nav>
      </>
    );
  }
}
