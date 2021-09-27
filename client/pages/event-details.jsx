import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';
import {
  useParams
} from 'react-router-dom';
import EventLocation from '../components/event-location';
import Spinner from '../components/spinner';

export default function EventDetails() {
  const [event, setEvent] = useState(null);
  const [invites, setInvites] = useState(null);
  const { id } = useParams();
  const [modal, setModal] = useState('modal-hidden');
  const [invited, setInvited] = useState([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    fetch(`/api/events/${id}`)
      .then(res => res.json())
      .then(data => {
        setEvent(data[0]);
        setLoaded(true);
      });
  }, []);
  if (!event) {
    return (
      <></>
    );
  }

  function inviteModal(e) {
    fetch(`/api/events/${id}/uninvited`)
      .then(res => res.json())
      .then(data => {
        setInvites({ data });
        setModal('modal');
      });
  }

  function closeModal(e) {
    setModal('modal-hidden');
  }

  function inviteUsers(e) {
    const index = invited.findIndex(element => element === e.target.name);
    if (index === -1) {
      invited.push(e.target.name);
      setInvited([...invited]);
    } else {
      invited.splice(index, 1);
      setInvited([...invited]);
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    for (let i = 0; i < invited.length; i++) {
      const init = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: invited[i] })
      };
      fetch(`/api/events/${id}/invite`, init)
        .then(() => {
          setInvites('');
          setInvited([]);
        })
        .catch(err => console.error(err));
    }
  }

  const date = new Date(event.dateTime);
  const formattedDate = format(date, 'MMMM do');
  const formattedTime = format(date, 'p');
  if (!loaded) {
    return (
      <Spinner />
    );
  }
  if (invites) {
    return (
      <>
        <div className={modal}>
          <div className="modal-content">
            <form onSubmit={handleSubmit} className="form">
              <div className="column justify-between height-100">
                <div>
                  <div>
                    <h1 className="header sm-margin-top no-marg-bottom">Invite</h1>
                  </div>
                  {
                    invites.data.map(users => {
                      const { name, userId } = users;
                      return (
                        <div key={userId} className="invite-check border-bottom">
                          <input onChange={inviteUsers} name={userId} type="checkbox" id={name} key={name} className="pointer" />
                          <label htmlFor={userId}>{name}</label>
                        </div>
                      );
                    })
                  }
                </div>
                <div>
                  <div className="justify-center">
                    <button disabled={invited.length === 0} className="big-button justify-center" type="submit">Send Invites</button>
                  </div>
                  <div className="justify-center">
                    <button onClick={closeModal} className="sm-margin-top cancel pointer">Cancel</button>
                  </div>
                </div>
              </div>
            </form>
            <div>
            </div>
          </div>
        </div>
        <div className="justify-end width-100 sm-margin-top">
          <div className="pointer">
            <img src="/images/envelope.png" onClick={inviteModal}></img>
          </div>
        </div>
        <h1 className="header sm-margin-top no-marg-bottom">{event.eventName}</h1>
        <img className="event-image-description" src={event.imageUrl}></img>
        <div className="row justify-between border-bottom">
          <p>{formattedDate}</p>
          <p>{formattedTime}</p>
        </div>
        <div className="justify-between row border-bottom padding-top-bottom">
          <img src="/images/blue_geomarker.png"></img>
          <div className="width-20"></div>
          <EventLocation location={event.location} />
        </div>
        <p>{event.description}</p>
      </>
    );
  } else {
    return (
      <>
        <div className="justify-end width-100 sm-margin-top">
          <img src="/images/envelope.png" onClick={inviteModal}></img>
        </div>
        <h1 className="header sm-margin-top no-marg-bottom">{event.eventName}</h1>
        <img className="event-image-description" src={event.imageUrl}></img>
        <div className="row justify-between border-bottom">
          <p>{formattedDate}</p>
          <p>{formattedTime}</p>
        </div>
        <div className="justify-between row border-bottom padding-top-bottom">
          <img src="/images/blue_geomarker.png"></img>
          <div className="width-20"></div>
          <EventLocation location={event.location} />
        </div>
        <p>{event.description}</p>
      </>
    );
  }

}
