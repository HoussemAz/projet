import React from 'react';

import Moment from 'react-moment';
import { Link } from 'react-router-dom';

const EventDashboard = ({
  eventName,
  poster,
  description,
  dateDebut,
  dateFin,
  prix
}) => {
  return (
    <div className='event'>
      <img src={poster} />
      <div className='info'>
        <h4>{eventName && eventName}</h4>

        <div className='pp'>{description}</div>
        <div className='pp'>
          Date du debut <Moment format='YYYY/MM/DD'>{dateDebut}</Moment>
        </div>
        <div className='pp'>
          Date de la fin <Moment format='YYYY/MM/DD'>{dateFin}</Moment>
        </div>
        <div className='pp'>{prix}</div>
        <Link to='/login' type='button' className='btn btn-secondary'>
          Buy
        </Link>
      </div>
    </div>
  );
};

export default EventDashboard;
