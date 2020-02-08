import React, { Fragment, useState } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { addSocial } from '../../actions/profile';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const AddSocial = ({ addSocial, history }) => {
  const [formData, setFormData] = useState({
    facebook: '',
    instagram: '',
    youtube: '',
    twitter: ''
  });

  const { facebook, youtube, twitter, instagram } = formData;
  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });
  return (
    <Fragment>
      <h1> Add Your Social Network</h1>
      <form
        onSubmit={e => {
          e.preventDefault();
          addSocial(formData, history);
        }}
      >
        <input
          type='text'
          placeholder='Facebook'
          name='facebook'
          value={facebook}
          onChange={e => onChange(e)}
        />
        <input
          type='text'
          placeholder='Instagram'
          name='instagram'
          value={instagram}
          onChange={e => onChange(e)}
        />
        <input
          type='text'
          placeholder='Youtube'
          name='youtube'
          value={youtube}
          onChange={e => onChange(e)}
        />
        <input
          type='text'
          placeholder='Twitter'
          name='twitter'
          value={twitter}
          onChange={e => onChange(e)}
        />

        <div>
          <input type='submit' />
          <Link to='/dashboard'></Link>
        </div>
      </form>
    </Fragment>
  );
};
AddSocial.propTypes = {
  addSocial: PropTypes.func.isRequired
};
export default connect(null, { addSocial })(withRouter(AddSocial));
