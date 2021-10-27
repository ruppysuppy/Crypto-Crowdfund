import { History, MemoryHistory } from 'history';

interface IAuthMountOptions {
  defaultHistory?: History | MemoryHistory;
  initialPath?: string;
  onNavigate?: (props: { pathname: string }) => void;
}

export { IAuthMountOptions };
