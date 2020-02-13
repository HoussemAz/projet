import React, { useEffect, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import EventItem from '../events/EventItem';
import Ticket from '../../components/tiket/Ticket';
import Spinner from '../layout/Spinner';
import { getEventById } from '../../actions/event';
import { Link } from 'react-router-dom';

const Event = ({ getEventById, event: { event, loading }, match }) => {
  useEffect(() => {
    getEventById(match.params.id);
  }, [getEventById, match.params.id]);

  return loading || event === null ? (
    <Spinner />
  ) : (
    <Fragment>
      <div>
        <Link to='/events'>
          <input
            type='button'
            classeName='btn btn-light'
            value='Back To Events'
          />
        </Link>
        <EventItem classeName='ticketSpace' event={event} showActions={false} />

        <Ticket />
      </div>
    </Fragment>
  );
};

Event.propTypes = {
  getEventById: PropTypes.func.isRequired,
  event: PropTypes.object.isRequired
};
const mapStateToPrps = state => ({
  event: state.event
});
export default connect(mapStateToPrps, { getEventById })(Event);
