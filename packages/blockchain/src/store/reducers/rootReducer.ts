import { combineReducers } from 'redux';

import firebaseReducer from './firebase';

const rootReducer = combineReducers({
  firebase: firebaseReducer,
});

export default rootReducer;
