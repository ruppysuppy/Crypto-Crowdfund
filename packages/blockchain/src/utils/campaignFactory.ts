import fs from 'fs';
import path from 'path';
import web3 from './web3';

import { IAddress, ICampaignFactory } from '../interfaces/web3';

const campaignFactoryPath = path.resolve(
  __dirname,
  '..',
  'ethereum',
  'campaignFactory.json',
);
const addressPath = path.resolve(
  __dirname,
  '..',
  'ethereum',
  'deployedAddress.json',
);

const campaignFactory = JSON.parse(
  fs.readFileSync(campaignFactoryPath, 'utf-8'),
) as ICampaignFactory;
const address = JSON.parse(fs.readFileSync(addressPath, 'utf-8')) as IAddress;

const CampaignFactory = new web3.eth.Contract(
  campaignFactory.abi,
  address.CampaignFactory,
);

export default CampaignFactory;
