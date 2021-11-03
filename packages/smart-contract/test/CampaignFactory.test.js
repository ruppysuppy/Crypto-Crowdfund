const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');
const compiledCampaign = require('../build/campaign.json');
const compiledCampaignFactory = require('../build/CampaignFactory.json');

const provider = ganache.provider();
const web3 = new Web3(provider);

describe('Campaign Factory', () => {
  let accounts;
  let factory;
  let campaign;

  beforeEach(async () => {
    accounts = await web3.eth.getAccounts();

    const contract = new web3.eth.Contract(compiledCampaignFactory.abi);
    factory = await contract
      .deploy({ data: compiledCampaignFactory.bytecode })
      .send({ from: accounts[0], gas: 2_000_000 });

    await factory.methods.createCampaign('100').send({
      from: accounts[0],
      gas: 2_000_000,
    });

    [campaignAddress] = await factory.methods.getDeployedCampaigns().call();
    campaign = await new web3.eth.Contract(
      compiledCampaign.abi,
      campaignAddress,
    );
  });

  it('deploys a factory and a campaign', () => {
    assert.ok(factory.options.address);
    assert.ok(campaign.options.address);
  });

  it('marks caller as the campaign manager', async () => {
    const manager = await campaign.methods.manager().call();
    assert.equal(accounts[0], manager);
  });

  it('`getDeployedCampaigns` fetches the deployed campaigns', async () => {
    const campaigns = await factory.methods.getDeployedCampaigns().call();
    assert.equal(campaigns.length, 1);
    assert.equal(campaigns[0], campaign.options.address);
  });

  it('`getLastCampaign` fetches the last deployed campaign by a user', async () => {
    const campaignAddress = await factory.methods
      .getLastCampaign(accounts[0])
      .call();
    assert.equal(campaign.options.address, campaignAddress);
  });
});
