import web3 from './web3';

import campaign from '../ethereum/campaign.json';

export const getCampaign = (address: string) =>
  new web3.eth.Contract(campaign.abi, address);
