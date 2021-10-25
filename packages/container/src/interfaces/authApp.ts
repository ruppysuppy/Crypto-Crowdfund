import { History, MemoryHistory } from 'history';

interface IOnNavigateProps {
  pathname: string;
}

interface IAuthMountOptions {
  defaultHistory?: History | MemoryHistory;
  initialPath?: string;
  onNavigate?: (props: IOnNavigateProps) => void;
}

export { IAuthMountOptions };
