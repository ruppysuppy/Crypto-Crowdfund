import web3 from './web3';

import campaignFactory from '../ethereum/campaignFactory.json';
import address from '../ethereum/deployedAddress.json';

const CampaignFactory = new web3.eth.Contract(
  campaignFactory.abi,
  address.CampaignFactory,
);

export default CampaignFactory;
