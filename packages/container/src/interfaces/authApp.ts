import { History, MemoryHistory } from 'history';

interface IAuthMountOptions {
  defaultHistory?: History | MemoryHistory;
  initialPath?: string;
  onNavigate?: (props: { pathname: string }) => void;
  routes: {
    SIGN_IN: string;
    SIGN_UP: string;
  };
}

export { IAuthMountOptions };
