import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { setAlert } from '../../actions/alert';
import { register } from '../../actions/auth';
import PropTypes from 'prop-types';

const Register = ({ setAlert, register, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    First_name: '',
    Last_name: '',
    email: '',
    password: '',
    password2: ''
  });

  const { First_name, Last_name, email, password, password2 } = formData;

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
    if (password !== password2) {
      setAlert('Passwords do not match', 'danger');
    } else {
      register({ First_name, Last_name, email, password });
    }
  };

  // Redirect if logged in

  if (isAuthenticated) {
    return <Redirect to='/dashboard' />;
  }
  return (
    <Fragment>
      <div className='box'>
        <h2 className='large text-primary'>Sign Up</h2>
        <p style={{ color: '#fff' }}>
          <i className='fas fa-user'></i> Create Your Account
        </p>

        <form className='form' onSubmit={e => onSubmit(e)}>
          <div className='inputBox'>
            <input
              type='text'
              placeholder='First Name'
              name='First_name'
              value={First_name}
              onChange={e => onChange(e)}
            />
          </div>
          <div className='inputBox'>
            <input
              type='text'
              placeholder='Last Name'
              name='Last_name'
              value={Last_name}
              onChange={e => onChange(e)}
            />
          </div>
          <div className='inputBox'>
            <input
              type='email'
              placeholder='Email Address'
              name='email'
              value={email}
              onChange={e => onChange(e)}
            />
          </div>
          <div className='inputBox'>
            <input
              type='password'
              placeholder='Password'
              name='password'
              value={password}
              onChange={e => onChange(e)}
            />
          </div>
          <div className='inputBox'>
            <input
              type='password'
              placeholder='Confirm Password'
              name='password2'
              value={password2}
              onChange={e => onChange(e)}
            />
          </div>
          <input type='submit' className='btn btn-primary' value='Register' />
        </form>
        <p style={{ color: '#fff' }}>
          Already have an account?<Link to='/login'>Sign In</Link>
        </p>
      </div>
    </Fragment>
  );
};

Register.prototype = {
  setAlert: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool
};
const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});
export default connect(mapStateToProps, { setAlert, register })(Register);
