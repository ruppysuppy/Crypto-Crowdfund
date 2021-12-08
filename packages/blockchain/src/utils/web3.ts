import Web3 from 'web3';

let web3;

if (window.web3) {
  web3 = new Web3(window.web3.currentProvider);
} else {
  const provider = new Web3.providers.HttpProvider(
    `https://rinkeby.infura.io/v3/${process.env.INFURA_PROJECT_ID}`,
  );
  web3 = new Web3(provider);
}

export default web3;
