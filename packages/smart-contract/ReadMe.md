# Campaign Smart Contract

The smart contract defines the logic how the front-end application interacts
with the Ethereum Blockchain. The available contracts:

- **Campaign**: Houses the campaign ether store and controls request creation &
  voting logic
- **Campaign Factory**: Contract to handle the creation of Campaign Contracts

## Setup

The application uses `yarn` to run.

1. Use `yarn` to install all dependecies
2. Compile the contracts using `yarn compile` to generate the **ABI**
   (**Application Bycode Interface**) and **bytecode** for the contracts.

## Deploy

**NOTE:** Deploying a contract requires **Etherium** for `gas-cost`

1. Add `.env` files at the root of the `smart-contract` folder:
   ```
   INFURA_API_KEY=<your infura api key>
   MNEMONIC=<your account mnemonic phrase>
   ```
2. Use `yarn deploy` after compliling the contract to deploy the contract.

   A new file `build/address.json` will be created with the address of the
   deployed contract
