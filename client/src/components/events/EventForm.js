import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addEvent } from '../../actions/event';

const EventForm = ({ addEvent }) => {
  const [EventData, setEventData] = useState({
    eventName: '',
    poster: '',
    description: '',
    dateDebut: '',
    dateFin: '',
    prix: '',
    location: ''
  });

  const {
    eventName,
    poster,
    description,
    dateDebut,
    dateFin,
    prix,
    location
  } = EventData;
  const onChange = e =>
    setEventData({ ...EventData, [e.target.name]: e.target.value });
  const [displayEventInputs, toggleEventInputs] = useState(false);
  return (
    <div>
      <button
        onClick={() => toggleEventInputs(!displayEventInputs)}
        type='button'
        className='btn btn-dark'
      >
        Add Event
      </button>
      {displayEventInputs && (
        <div className='boxevent'>
          <form
            className='form'
            onSubmit={e => {
              console.log('e', EventData);
              e.preventDefault();
              addEvent(EventData);
              toggleEventInputs(!displayEventInputs);
            }}
          >
            <div className='inputBoxevent'>
              <input
                type='text'
                placeholder='eventName'
                name='eventName'
                value={eventName}
                onChange={e => onChange(e)}
              />
            </div>
            <div className='inputBoxevent'>
              <input
                type='text'
                placeholder='location'
                name='location'
                value={location}
                onChange={e => onChange(e)}
              />
            </div>
            <div className='inputBoxevent'>
              <input
                type='text'
                placeholder='description'
                name='description'
                value={description}
                onChange={e => onChange(e)}
              />
            </div>
            <div className='inputBoxevent'>
              <input
                type='text'
                placeholder='poster'
                name='poster'
                value={poster}
                onChange={e => onChange(e)}
              />
            </div>
            <div className='inputBoxevent'>
              <input
                type='date'
                placeholder='dateDebut'
                name='dateDebut'
                value={dateDebut}
                onChange={e => onChange(e)}
              />
            </div>
            <div className='inputBoxevent'>
              <input
                type='date'
                placeholder='dateFin'
                name='dateFin'
                value={dateFin}
                onChange={e => onChange(e)}
              />
            </div>
            <div className='inputBoxevent'>
              <input
                type='text'
                placeholder='prix'
                name='prix'
                value={prix}
                onChange={e => onChange(e)}
              />
            </div>

            <input type='submit' className='btn btn-primary' value='Valider' />
            <input
              type='button'
              className='btn btn-outline-secondary'
              value='Retour'
              onClick={() => toggleEventInputs(!displayEventInputs)}
            />
          </form>
        </div>
      )}
    </div>
  );
};

EventForm.propTypes = {
  addEvent: PropTypes.func.isRequired
};

export default connect(null, { addEvent })(EventForm);
