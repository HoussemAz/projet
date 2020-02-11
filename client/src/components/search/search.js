import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { filterbyname } from '../../actions/filter';

const search = ({ filterbyname }) => {
  return (
    <div>
      <input
        className='inputSearch'
        type='text'
        placeholder='Search...'
        onChange={e => {
          filterbyname(e.target.value);
        }}
      />
      <i className='fas fa-search ' style={{ color: 'gray' }}></i>
    </div>
  );
};

search.propTypes = {
  filterbyname: PropTypes.func.isRequired
};

export default connect(null, { filterbyname })(search);
