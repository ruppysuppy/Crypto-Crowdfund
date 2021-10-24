import { History, MemoryHistory } from 'history';

interface IAuthMountOptions {
  defaultHistory?: History | MemoryHistory;
  initialPath?: string;
  onNavigate?: () => void;
}

export { IAuthMountOptions };
