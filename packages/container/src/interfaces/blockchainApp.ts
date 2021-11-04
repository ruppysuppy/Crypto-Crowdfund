import { History, MemoryHistory } from 'history';

interface IBlockchainMountOptions {
  defaultHistory?: History | MemoryHistory;
  firebaseConfig: {
    apiKey: string;
    projectId: string;
    appId: string;
  };
  initialPath?: string;
  routes: {
    FAQ: string;
    CAMPAIGNS: string;
    CAMPAIGN: string;
    ACCOUNT: string;
  };
  onNavigate?: (props: { pathname: string }) => void;
}

export { IBlockchainMountOptions };
