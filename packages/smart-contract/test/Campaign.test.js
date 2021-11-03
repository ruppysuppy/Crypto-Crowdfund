const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');
const compiledCampaign = require('../build/campaign.json');

const provider = ganache.provider();
const web3 = new Web3(provider);

const transformSummary = (summary) => ({
  manager: summary[0],
  balance: summary[1],
  minimumContribution: summary[2],
  requestsCount: summary[3],
  numContributors: summary[4],
});

const assertSummary = (summary, expected) => {
  assert.equal(summary.manager, expected.manager);
  assert.equal(summary.balance, expected.balance);
  assert.equal(summary.minimumContribution, expected.minimumContribution);
  assert.equal(summary.requestsCount, expected.requestsCount);
  assert.equal(summary.numContributors, expected.numContributors);
};

describe('Campaign', () => {
  let accounts;
  let campaign;

  beforeEach(async () => {
    accounts = await web3.eth.getAccounts();

    const contract = new web3.eth.Contract(compiledCampaign.abi);
    campaign = await contract
      .deploy({
        data: compiledCampaign.bytecode,
        arguments: [10_000, accounts[0]],
      })
      .send({ from: accounts[0], gas: 2_000_000 });
  });

  it('deploys a campaign', () => {
    assert.ok(campaign.options.address);
  });

  it('allows users to contribute money', async () => {
    await campaign.methods.contribute().send({
      from: accounts[1],
      value: 20_000,
    });

    const isAcc01Contributor = await campaign.methods
      .isContributor(accounts[1])
      .call();
    assert(isAcc01Contributor);

    const isAcc02Contributor = await campaign.methods
      .isContributor(accounts[2])
      .call();
    assert(!isAcc02Contributor);
  });

  it('requires a minimum contribution', async () => {
    try {
      await campaign.methods.contribute().send({
        from: accounts[1],
        value: 1_000,
      });
      assert(false);
    } catch (err) {
      assert(err);
    }
  });

  it('restricts users from making a payment request', async () => {
    await campaign.methods.contribute().send({
      from: accounts[1],
      value: 20_000,
    });

    try {
      await campaign.methods
        .createRequest(10_000, accounts[2])
        .send({ from: accounts[1], gas: 1_000_000 });
      assert(false);
    } catch (err) {
      assert(err);
    }
  });

  it('allows manager to create a payment request', async () => {
    await campaign.methods.contribute().send({
      from: accounts[1],
      value: 20_000,
    });

    await campaign.methods
      .createRequest(10_000, accounts[2])
      .send({ from: accounts[0], gas: 1_000_000 });

    const request = await campaign.methods.requests(0).call();
    assert.equal(request.value, 10_000);
    assert.equal(request.recipient, accounts[2]);
  });

  it('restricts creation of a payment request requiring more funds than available', async () => {
    await campaign.methods.contribute().send({
      from: accounts[1],
      value: 20_000,
    });

    try {
      await campaign.methods
        .createRequest(30_000, accounts[2])
        .send({ from: accounts[0], gas: 1_000_000 });
      assert(false);
    } catch (err) {
      assert(err);
    }
  });

  it('allows contributors to vote on a request', async () => {
    await campaign.methods.contribute().send({
      from: accounts[1],
      value: 20_000,
    });

    await campaign.methods
      .createRequest(10_000, accounts[2])
      .send({ from: accounts[0], gas: 1_000_000 });

    await campaign.methods
      .approveRequest(0)
      .send({ from: accounts[1], gas: 1_000_000 });

    const request = await campaign.methods.requests(0).call();
    const isApprover = await campaign.methods.isApprover(accounts[1], 0).call();

    assert.equal(request.approvalCount, 1);
    assert(isApprover);
  });

  it('restricts non-contributors from voting', async () => {
    await campaign.methods.contribute().send({
      from: accounts[1],
      value: 20_000,
    });

    await campaign.methods
      .createRequest(10_000, accounts[2])
      .send({ from: accounts[0], gas: 1_000_000 });

    try {
      await campaign.methods
        .approveRequest(0)
        .send({ from: accounts[2], gas: 1_000_000 });
      assert(false);
    } catch (err) {
      assert(err);
    }
  });

  it('allows manager to finalize a payment request', async () => {
    const ether = web3.utils.toWei('1', 'ether');

    await campaign.methods.contribute().send({
      from: accounts[1],
      value: ether,
    });

    await campaign.methods
      .createRequest(ether, accounts[2])
      .send({ from: accounts[0], gas: 1_000_000 });

    await campaign.methods
      .approveRequest(0)
      .send({ from: accounts[1], gas: 1_000_000 });

    const initialBalance = await web3.eth.getBalance(accounts[2]);
    await campaign.methods
      .finalizeRequest(0)
      .send({ from: accounts[0], gas: 1_000_000 });
    const finalBalance = await web3.eth.getBalance(accounts[2]);

    const request = await campaign.methods.requests(0).call();
    assert(request.complete);
    assert.equal(finalBalance - initialBalance, ether);
  });

  it('restricts non-manager from finalizing a request', async () => {
    await campaign.methods.contribute().send({
      from: accounts[1],
      value: 20_000,
    });

    await campaign.methods
      .createRequest(10_000, accounts[2])
      .send({ from: accounts[0], gas: 1_000_000 });

    await campaign.methods
      .approveRequest(0)
      .send({ from: accounts[1], gas: 1_000_000 });

    try {
      await campaign.methods
        .finalizeRequest(0)
        .send({ from: accounts[0], gas: 1_000_000 });
      assert(false);
    } catch (err) {
      assert(err);
    }
  });

  it('restricts finalizing a request without majority vote', async () => {
    await campaign.methods.contribute().send({
      from: accounts[1],
      value: 20_000,
    });

    await campaign.methods
      .createRequest(10_000, accounts[2])
      .send({ from: accounts[0], gas: 1_000_000 });

    try {
      await campaign.methods
        .finalizeRequest(0)
        .send({ from: accounts[0], gas: 1_000_000 });
      assert(false);
    } catch (err) {
      assert(err);
    }
  });

  it('restricts finalizing a request without sufficient funds', async () => {
    await campaign.methods.contribute().send({
      from: accounts[1],
      value: 20_000,
    });

    await campaign.methods
      .createRequest(10_000, accounts[2])
      .send({ from: accounts[0], gas: 1_000_000 });

    await campaign.methods
      .createRequest(20_000, accounts[2])
      .send({ from: accounts[0], gas: 1_000_000 });

    await campaign.methods
      .approveRequest(1)
      .send({ from: accounts[1], gas: 1_000_000 });

    await campaign.methods
      .finalizeRequest(1)
      .send({ from: accounts[0], gas: 1_000_000 });

    try {
      await campaign.methods
        .finalizeRequest(0)
        .send({ from: accounts[0], gas: 1_000_000 });
      assert(false);
    } catch (err) {
      assert(err);
    }
  });

  it('`getRequestCount` returns the correct count', async () => {
    await campaign.methods.contribute().send({
      from: accounts[1],
      value: 20_000,
    });

    await campaign.methods
      .createRequest(10_000, accounts[2])
      .send({ from: accounts[0], gas: 1_000_000 });

    let requestCount = await campaign.methods.getRequestCount().call();
    assert.equal(requestCount, 1);

    await campaign.methods
      .createRequest(10_000, accounts[2])
      .send({ from: accounts[0], gas: 1_000_000 });

    requestCount = await campaign.methods.getRequestCount().call();
    assert.equal(requestCount, 2);
  });

  it('`getRequestCount` returns the correct count', async () => {
    await campaign.methods.contribute().send({
      from: accounts[1],
      value: 20_000,
    });

    await campaign.methods
      .createRequest(10_000, accounts[2])
      .send({ from: accounts[0], gas: 1_000_000 });

    let requestCount = await campaign.methods.getRequestCount().call();
    assert.equal(requestCount, 1);

    await campaign.methods
      .createRequest(10_000, accounts[2])
      .send({ from: accounts[0], gas: 1_000_000 });

    requestCount = await campaign.methods.getRequestCount().call();
    assert.equal(requestCount, 2);
  });

  it('can fetch the campaign summary', async () => {
    let summary = transformSummary(await campaign.methods.getSummary().call());
    assertSummary(summary, {
      manager: accounts[0],
      balance: 0,
      minimumContribution: 10_000,
      requestsCount: 0,
      numContributors: 0,
    });

    await campaign.methods.contribute().send({
      from: accounts[1],
      value: 20_000,
    });

    summary = transformSummary(await campaign.methods.getSummary().call());
    assertSummary(summary, {
      manager: accounts[0],
      balance: 20_000,
      minimumContribution: 10_000,
      requestsCount: 0,
      numContributors: 1,
    });

    await campaign.methods
      .createRequest(10_000, accounts[2])
      .send({ from: accounts[0], gas: 1_000_000 });

    summary = transformSummary(await campaign.methods.getSummary().call());
    assertSummary(summary, {
      manager: accounts[0],
      balance: 20_000,
      minimumContribution: 10_000,
      requestsCount: 1,
      numContributors: 1,
    });

    await campaign.methods
      .approveRequest(0)
      .send({ from: accounts[1], gas: 1_000_000 });
    await campaign.methods
      .finalizeRequest(0)
      .send({ from: accounts[0], gas: 1_000_000 });

    summary = transformSummary(await campaign.methods.getSummary().call());
    assertSummary(summary, {
      manager: accounts[0],
      balance: 10_000,
      minimumContribution: 10_000,
      requestsCount: 1,
      numContributors: 1,
    });
  });
});
