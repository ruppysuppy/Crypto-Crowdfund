import { History, MemoryHistory } from 'history';

interface IMarketingMountOptions {
  defaultHistory?: History | MemoryHistory;
  initialPath?: string;
  onNavigate?: (props: { pathname: string }) => void;
  routes: {
    HOME: string;
    ABOUT: string;
    FAQ: string;
    TERMS_AND_CONDITIONS: string;
    PRIVACY_POLICY: string;
    DISCLAIMER: string;
  };
}

export { IMarketingMountOptions };
