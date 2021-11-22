import { FirebaseApp } from 'firebase/app';

let firebaseApp: FirebaseApp | null = null;

const setFirebaseApp = (app: FirebaseApp) => (firebaseApp = app);
const getFirebaseApp = () => firebaseApp;

export { setFirebaseApp, getFirebaseApp };
