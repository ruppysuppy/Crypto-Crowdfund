import { FirebaseApp } from 'firebase/app';
import { FirebaseReducerAction } from '../enums';

export interface IFirebaseAction {
  type: FirebaseReducerAction;
  payload?: {
    firebaseApp?: FirebaseApp;
  };
}

export interface IFirebaseState {
  firebaseApp: FirebaseApp | null;
}
