import { createStore, combineReducers } from 'redux';

import scene from '../reducers/scene';

const rootReducer = combineReducers({ scene });

const store = createStore(
  rootReducer,
  // @ts-ignore
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
);

export default store;
