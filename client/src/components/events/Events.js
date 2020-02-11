import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import EventItem from './EventItem';
import { getEvents } from '../../actions/event';
import { filterbyname } from '../../actions/filter';
import EventForm from './EventForm';

const Events = ({ getEvents, filterbyname, event: { events, loading } }) => {
  useEffect(() => {
    getEvents();
  }, [getEvents]);

  return loading ? (
    <Spinner />
  ) : (
    <Fragment>
      <div className='lead'>
        <h3 className='eventworld'>Welcome to Eventi</h3>
        <EventForm />
        <div className='body'>
          {events.map(event => (
            <EventItem event={event} />
          ))}
        </div>
      </div>
    </Fragment>
  );
};
Events.propTypes = {
  auth: PropTypes.func.isRequired,
  getEvents: PropTypes.func.isRequired,
  event: PropTypes.object.isRequired,
  filterbyname: PropTypes.func.isRequired
};
const mapStateToProps = state => ({
  event: state.event,
  auth: state.auth
});
export default connect(mapStateToProps, { getEvents, filterbyname })(Events);
