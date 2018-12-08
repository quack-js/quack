import { combineReducers } from 'redux';
import requestsReducer from 'modules/requests';

export default combineReducers({
  requests: requestsReducer,
});
