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
    <div className='post-form'>
      <form
        className='form'
        onSubmit={e => {
          e.preventDefault();
          addTicket(TicketData);
        }}
      >
        <input
          type='text'
          placeholder='First Name'
          name='FirstName'
          value={FirstName}
          onChange={e => onChange(e)}
        />
        <input
          type='text'
          placeholder='Last Name'
          name='LastName'
          value={LastName}
          onChange={e => onChange(e)}
        />
        <input
          type='text'
          placeholder='quantités'
          name='quantités'
          value={quantités}
          onChange={e => onChange(e)}
        />

        <button type='submit' class='btn btn-primary'>
          Valider
        </button>
      </form>
    </div>
  );
};

Ticket.propTypes = {
  addTicket: PropTypes.func.isRequired
};

export default connect(null, { addTicket })(Ticket);
