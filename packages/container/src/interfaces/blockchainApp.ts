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
    ACCOUNT: string;
    CAMPAIGNS: string;
    CAMPAIGN: string;
    CREATE_CAMPAIGN: string;
    EDIT_CAMPAIGN: string;
    FAQ: string;
    SIGN_IN: string;
    SIGN_UP: string;
  };
  onNavigate?: (props: { pathname: string }) => void;
}

export { IBlockchainMountOptions };
