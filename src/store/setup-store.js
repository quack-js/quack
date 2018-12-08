import { applyMiddleware, createStore } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import reducer from './root-reducer';

export default () => {
  const middlewares = composeWithDevTools(applyMiddleware(thunkMiddleware));
  return createStore(reducer, middlewares);
};
