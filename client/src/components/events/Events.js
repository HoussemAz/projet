import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import EventItem from './EventItem';
import { getEvents } from '../../actions/event';

const Events = ({ getEvents, event: { events, loading } }) => {
  useEffect(() => {
    getEvents();
  }, [getEvents]);

  return loading ? (
    <Spinner />
  ) : (
    <Fragment>
      <div className='lead'>
        <h3 className='eventworld'>Welcome to Eventi</h3>
        <div className='body'>
          {events.map(event => (
            // <div>test</div>
            <EventItem
              // key={event._id}
              event={event}
            />
            // <div className='wrapper'>
            //   <div className='card'>
            //     <img src={event.poster} />
            //     <div className='info'>
            //       <h4>{event.eventName}</h4>
            //       <p>{event.description}</p>
            //       <p>{event.location}</p>
            //       <p>{event.dateDebut}</p>
            //       <p>{event.dateFin}</p>
            //       <p>{event.ticket}</p>
            //       <p>{event.prix}</p>
            //       <a href='#' className='btn'>
            //         Buy
            //       </a>
            //     </div>
            //   </div>
            // </div>
          ))}
        </div>
      </div>
    </Fragment>
  );
};
Events.propTypes = {
  auth: PropTypes.func.isRequired,
  getEvents: PropTypes.func.isRequired,
  event: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  event: state.event,
  auth: state.auth
});
export default connect(mapStateToProps, { getEvents })(Events);
