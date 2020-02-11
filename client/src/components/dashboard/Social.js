import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { deleteSocial } from '../../actions/profile';

const Social = ({ social, deleteSocial }) => {
  const socials = social.map(el => (
    <tr key={el._id}>
      <td>{el.facebook}</td>
      <td>{el.instagram}</td>
      <td>{el.youtube}</td>
      <td>{el.twitter}</td>
      <td>
        <button onClick={() => deleteSocial(el._id)} className='btn btn-danger'>
          Delete
        </button>
      </td>
    </tr>
  ));
  return (
    <Fragment>
      <h2 className='my-2'>Social Network Links</h2>
      <table className='table table-striped'>
        <thead>
          <tr>
            <th>
              <i className='fab fa-facebook' />
            </th>
            <th className='hide-sm'>
              <i class='fab fa-instagram' />
            </th>
            <th className='hide-sm'>
              <i className='fab fa-youtube' />
            </th>
            <th className='hide-sm'>
              <i className='fab fa-twitter' />
            </th>
            <th className='hide-sm'>Delete</th>
          </tr>
        </thead>
        <tbody>{socials}</tbody>
      </table>
    </Fragment>
  );
};

Social.propTypes = {
  social: PropTypes.array.isRequired,
  deleteSocial: PropTypes.func.isRequired
};

export default connect(null, { deleteSocial })(Social);
