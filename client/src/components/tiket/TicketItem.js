import React from 'react';

const TicketItem = ({ FirstName, LastName, quantités }) => {
  return (
    <div className='event'>
      <div className='info'>
        <h4>{FirstName}</h4>

        <div className='pp'>{LastName}</div>

        <div className='pp'>{quantités}</div>
      </div>
    </div>
  );
};

export default TicketItem;
