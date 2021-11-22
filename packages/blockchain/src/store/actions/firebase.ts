import { FirebaseApp } from 'firebase/app';
import { FirebaseReducerAction } from '../../enums';

export const appChangedHandler = (firebaseApp?: FirebaseApp) => {
  return {
    type: FirebaseReducerAction.SET_FIREBASE_APP,
    payload: {
      firebaseApp: firebaseApp,
    },
  };
};
