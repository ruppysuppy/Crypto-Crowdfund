import Web3 from 'web3';

let web3;

(async () => {
  if (!web3) {
    if (window.ethereum) {
      web3 = new Web3(window.ethereum);
      await window.ethereum.enable();
      window.ethereum.on('accountsChanged', () => {
        window.location.reload();
      });
    } else {
      const provider = new Web3.providers.HttpProvider(
        `https://rinkeby.infura.io/v3/${process.env.INFURA_PROJECT_ID}`,
      );
      web3 = new Web3(provider);
    }
  }
})();

export default web3;
