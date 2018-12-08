import { ASYNC_ACTION_STATUSES } from 'app-constants';
import { errors, status } from './reducers';

describe('requests error reducer', () => {
  it('has default state', () => {
    expect(errors(undefined, { type: 'INIT' })).toEqual({});
  });
  it('ignores actions without status', () => {
    const action = { type: 'USER_SAVED' };
    const state = { SAVE_USER: null };
    expect(errors(state, action)).toBe(state);
  });

  it('stores failure action payload', () => {
    const action = {
      type: 'SAVE_USER',
      status: ASYNC_ACTION_STATUSES.FAILURE,
      payload: { error: 'Failed to save user' },
    };
    const nextState = errors(
      {
        SAVE_USER: null,
        SAVE_SETTINGS: { message: 'Failed to save settings' },
      },
      action,
    );

    expect(nextState).toEqual({
      SAVE_USER: { error: 'Failed to save user' },
      SAVE_SETTINGS: { message: 'Failed to save settings' },
    });
  });

  it('resets error state on actions of other statuses', () => {
    const action = { type: 'SAVE_USER' };
    const state = {
      SAVE_USER: 'Fail',
    };

    expect(
      errors(state, { ...action, status: ASYNC_ACTION_STATUSES.PENDING }),
    ).toEqual({
      SAVE_USER: null,
    });

    expect(
      errors(state, { ...action, status: ASYNC_ACTION_STATUSES.SUCCESS }),
    ).toEqual({
      SAVE_USER: null,
    });
  });
});

describe('requests status reducer', () => {
  it('has default state', () => {
    expect(status(undefined, { type: 'INIT' })).toEqual({});
  });
  it('ignores actions without status', () => {
    const state = { SAVE_USER: 'SUCCESS' };
    const action = { type: 'USER_SAVED' };

    expect(status(state, action)).toBe(state);
  });

  it('stores status of async action', () => {
    const action = { type: 'SAVE_USER' };
    const state = {};
    const newState = status(state, {
      ...action,
      status: ASYNC_ACTION_STATUSES.PENDING,
    });
    expect(newState).toEqual({ SAVE_USER: ASYNC_ACTION_STATUSES.PENDING });
    expect(
      status(newState, { ...action, status: ASYNC_ACTION_STATUSES.SUCCESS }),
    ).toEqual({
      SAVE_USER: ASYNC_ACTION_STATUSES.SUCCESS,
    });
  });
});
