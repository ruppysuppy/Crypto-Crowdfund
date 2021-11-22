import { History, MemoryHistory } from 'history';

type IOnAuthStateChanged = (
  user: {
    uid: string;
    username: string | null;
    photoURL: string | null;
  } | null,
) => void;

interface IAuthMountOptions {
  defaultHistory?: History | MemoryHistory;
  initialPath?: string;
  firebaseConfig: {
    apiKey: string;
    authDomain: string;
    projectId: string;
    appId: string;
  };
  routes: {
    SIGN_IN: string;
    SIGN_UP: string;
    FAQ: string;
  };
  onAuthStateChangedHandler?: IOnAuthStateChanged;
  onNavigate?: (props: { pathname: string }) => void;
}

export { IAuthMountOptions, IOnAuthStateChanged };
