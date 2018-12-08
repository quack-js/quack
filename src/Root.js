import React from 'react';
import { Provider } from 'react-redux';

import App from './App';
import setupStore from './store/setup-store';

const Root = () => (
  <Provider store={setupStore()}>
    <App />
  </Provider>
);

export default Root;
