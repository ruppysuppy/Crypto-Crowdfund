# Crypto Crowdfund

<div align="center">
    <img src="./assets/logo.png" style="width: 320px" />
</div>

## For Creators

**Lacking the money to bring your Creative Venture to Life?**

**Crypto Crowdfund** Campaigns will help you turn your creative ideas into
reality! It's where _creators share new visions for creative work with the
communities that will come together to fund them_.

No matter what, creators always control how the work comes together: _no
100-page grant applications_, _no donors demanding you modify your message_,
_no last-minute edits from investors_. When backers chip in funding and help
spread the word, they too become part of these independent works.

## For Investors

**Worried about being Conned by Fake Campaigns?**

**Crypto Crowdfund** brings power to the Investors as well! Backed by the
razor-edge of **BlockChain** Technology, _only after the majority of the investors
has approved a Transaction Request, the transaction can be processed_.

_No more being scammed by Fake Campaigns!_

## For Scalability

**Made to Last**

**Crypto Crowdfund** is powered by the cutting edge technology of
**Micro-Frontends**, making developing scalable issues a thing of the past.

Each sub-application in **Crypto Crowdfund** is developed and run as a separate
instance. So a bug in one part of the application cannot affect the other parts.

## Setup

The application uses `yarn` to run.

To setup the **Smart Contract** please check out the steps mentioned in the
[ReadMe under `smart-contract`](./packages/smart-contract/ReadMe.md#Setup).
To run the **Blockchain Sub-app**,
[generating all files](./packages/smart-contract/ReadMe.md#Generate-Files) is mandatory

1. Run the command `yarn` to install all dependecies
2. Add `.env` files at the root of all **Sub-apps** and the **Container** with the
   following data:

   ```python
   # firebase config
   API_KEY=<api_key>
   AUTH_DOMAIN=<auth_domain.firebaseapp.com>
   PROJECT_ID=<project_id>
   STORAGE_BUCKET=<storage_bucket.appspot.com>
   MESSAGING_SENDER_ID=<messaging_sender_id>
   APP_ID=<app_id>
   MEASUREMENT_ID=<measurement_id>
   ```

   Add `.env.development` file at the root of **Blockchain Sub-app**
   following data:

   ```python
   # auth config
   TEST_AUTHENTICATE_EMAIL=<firebase_test_user_email>
   TEST_AUTHENTICATE_PASSWORD=<firebase_test_user_password>
   ```

   and also add the infura key in the `.env` file in the **Blockchain Sub-app**

   ```python
   # ...
   # infura key
   INFURA_PROJECT_ID=<infura_project_id>
   ```

3. Run the command `yarn run-auth` to run the **Auth Sub-app**

   Runs on `http://localhost:8001`. Valid routes: `/sign-in`, and `/sign-up`

4. Run the command `yarn run-marketing` to run the **Marketing Sub-app**

   Runs on `http://localhost:8002`. Valid routes: `/`, `/about`, `/faq`,
   `/terms-and-conditions`, `/privacy-policy`, and `/disclaimer`

5. Run the command `yarn run-blockchain` to run the **Blockchain Sub-app**

   Runs on `http://localhost:8003`. Valid routes: `/account?uid=<user_id>`,
   `/campaign?id=<campaign_id>`, `/campaigns` and `/create-campaign`

6. Run the command `yarn run-container` to run the **Container**

   Runs on `http://localhost:3000`. Compiles all **Sub-Apps** routes and
   determines when a user can visit them, eg: restricts authenticated users
   from visiting `/sign-in`, and `/sign-up`

**NOTE:** The application is hard-coded to run on **Rinkeby Network**. To use the
application on other networks, please switch to the desired network in the
[web3.ts](./packages/blockchain/src/utils/web3.ts) and
[deploy.js](./packages/smart-contract/scripts/deploy.js) files.
