import { combineReducers } from 'redux';
import alert from './alert';
import auth from './auth';
import profile from './profile';
import event from './event';
// import ticket from './ticket';
import filterbyname from './filter';

export default combineReducers({
  alert,
  auth,
  profile,
  event,
  // ticket,
  filterbyname
});
