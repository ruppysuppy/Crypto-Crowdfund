const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');
const HDWalletProvider = require('@truffle/hdwallet-provider');
const Web3 = require('web3');
const campaignFactory = require('../build/campaignFactory.json');

dotenv.config();

const provider = new HDWalletProvider(
  process.env.MNEMONIC,
  `https://rinkeby.infura.io/v3/${process.env.INFURA_API_KEY}`,
);

const web3 = new Web3(provider);
const accounts = await web3.eth.getAccounts();

console.log('Attempting to deploy from account', accounts[0]);

const result = await new web3.eth.Contract(campaignFactory.abi)
  .deploy({
    data: campaignFactory.bytecode,
  })
  .send({
    from: accounts[0],
    gas: 2_000_000,
  });

console.log('Contract deployed to', result.options.address);
console.log('Saving Deployed Address...');

const filePath = path.resolve(__dirname, '..', 'build', 'address.json');
const deployedAddress = JSON.stringify({
  CampaignFactory: result.options.address,
});

fs.writeFileSync(filePath, deployedAddress);

console.log('Deployed Address Saved!');
