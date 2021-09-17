import React from 'react';

export default class Login extends React.Component {
  render() {
    return (
      <div className="real-container">
        <div className="single-container column justify-center">
          <h1 className="title">Hangouts</h1>
          <img src="/images/people_image.png"></img>
            <a href="/auth/google">
              <button className="big-button">Sign In</button>
            </a>
        </div>
      </div>
    );
  }
}
