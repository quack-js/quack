import { combineReducers } from 'redux';
import { ASYNC_ACTION_STATUSES } from 'app-constants';

export const errors = (state = {}, { type, status, payload }) => {
  if (!status) return state;

  if (status !== ASYNC_ACTION_STATUSES.FAILURE) {
    return { ...state, [type]: null };
  }

  return {
    ...state,
    [type]: { ...payload },
  };
};

export const status = (state = {}, { type, status }) => {
  if (!status) return state;

  return {
    ...state,
    [type]: status,
  };
};

export default combineReducers({
  errors,
  status,
});
