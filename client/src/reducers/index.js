import { combineReducers } from 'redux';
import alert from './alert';
import auth from './auth';
import profile from './profile';
import event from './event';
import filterbyname from './filter';

export default combineReducers({
  alert,
  auth,
  profile,
  event,
  filterbyname
});
