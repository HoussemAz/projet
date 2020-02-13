import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addTicket } from '../../actions/ticket';

const Ticket = ({ addTicket }) => {
  const [TicketData, setTicketData] = useState({
    FirstName: '',
    LastName: '',
    quantités: ''
  });

  const { FirstName, LastName, quantités } = TicketData;
  const onChange = e =>
    setTicketData({ ...TicketData, [e.target.name]: e.target.value });

  return (
    <div className='Ticket'>
      <form
        className='formTicket'
        onSubmit={e => {
          e.preventDefault();
          addTicket(TicketData);
        }}
      >
        <h2>Buy Your Ticket</h2>
        <div className='inputTicket'>
          <input
            type='text'
            placeholder='First Name'
            name='FirstName'
            value={FirstName}
            onChange={e => onChange(e)}
          />
        </div>
        <div className='inputTicket'>
          <input
            type='text'
            placeholder='Last Name'
            name='LastName'
            value={LastName}
            onChange={e => onChange(e)}
          />
        </div>
        <div className='inputTicket'>
          <input
            type='text'
            placeholder='quantités'
            name='quantités'
            value={quantités}
            onChange={e => onChange(e)}
          />
        </div>

        <input type='submit' className='btn btn-primary' value='Valider' />
      </form>
    </div>
  );
};

Ticket.propTypes = {
  addTicket: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  ticket: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth
});
export default connect(mapStateToProps, { addTicket })(Ticket);
