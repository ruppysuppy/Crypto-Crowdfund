import React from 'react';

import sharedClasses from '../../../common.module.css';
import Accordian from './Accordian/Accordian';

export default function FAQ() {
  return (
    <div>
      <h1 className={sharedClasses.h1}>FAQ</h1>

      <Accordian title="How does the Campaigns work?">
        The Campaigns are processed in the following order:
        <ol>
          <li>
            Anyone can sign-up at <strong>Crypto Crowdfund</strong> and start a
            campaign.
          </li>
          <li>
            After the campaign is created, the contributors send money directly
            to the smart contract for the campaign.
          </li>
          <li>
            Once the contract has sufficient funds, the campaign manager can
            create a transaction request to utilize the funds.
          </li>
          <li>Now the contributors vote on the transaction request.</li>
          <li>
            Only after the transaction request receives more than 50% approvals,
            can it be finalized.
          </li>
        </ol>
      </Accordian>

      <Accordian title="How do I contribute to a campaign?">
        You need a Meta Mask wallet to contribute to any campaign. After
        creating & logging in to your Meta Mask wallet, whenever you want to
        contribute to any campaign, Meta Mask will request your consent and
        process the transaction accordingly.
      </Accordian>

      <Accordian title="Why is it taking so long to process my request/campaign/vote?">
        The <strong>Crypto Crowdfund</strong> is a decentralized application
        backed by Etherium Blockchain.
        <strong> Any action that modifies the Blockchain </strong>
        typically takes a 15 to 30 seconds to process and come to a consensus
        globally. This ensures nobody can manipulate the data, making the
        application incredibly secure.
      </Accordian>

      <Accordian title="Why am I being charged for a request/campaign/vote?">
        The <strong>Crypto Crowdfund</strong> is a decentralized application
        backed by Etherium Blockchain.
        <strong> Any action that modifies the Blockchain </strong> costs a small
        amount of gas to be processed.
      </Accordian>

      <Accordian title="What if my campaign doesn’t reach its goal amount?">
        No problem! We follow a flexible model where you can keep what you’ve
        raised without being penalised for not meeting your goal.
      </Accordian>
    </div>
  );
}
