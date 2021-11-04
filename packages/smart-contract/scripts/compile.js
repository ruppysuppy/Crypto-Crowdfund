const path = require('path');
const fs = require('fs-extra');
const solc = require('solc');

const buildPath = path.resolve(__dirname, '..', 'build');
fs.removeSync(path.resolve(buildPath, 'campaign.json'));
fs.removeSync(path.resolve(buildPath, 'campaignFactory.json'));

const CONTRACT_SOURCE = 'Campaign.sol';
const campaignPath = path.resolve(
  __dirname,
  '..',
  'contracts',
  CONTRACT_SOURCE,
);
const source = fs.readFileSync(campaignPath, 'utf8');

const inputOptions = {
  language: 'Solidity',
  sources: {
    [CONTRACT_SOURCE]: {
      content: source,
    },
  },
  settings: {
    outputSelection: {
      '*': {
        '*': ['*'],
      },
    },
  },
};

console.log('Compiling Contracts...');

const inputOptionsJson = JSON.stringify(inputOptions);
const output = JSON.parse(solc.compile(inputOptionsJson)).contracts;

console.log('Contracts Successfully Compiled!');
console.log('Saving Compiled Code...');

const compiledContract = {
  campaign: {
    abi: output[CONTRACT_SOURCE]['Campaign'].abi,
    bytecode: output[CONTRACT_SOURCE]['Campaign'].evm.bytecode.object,
  },
  campaignFactory: {
    abi: output[CONTRACT_SOURCE]['CampaignFactory'].abi,
    bytecode: output[CONTRACT_SOURCE]['CampaignFactory'].evm.bytecode.object,
  },
};

fs.ensureDirSync(buildPath);

for (const contract in compiledContract) {
  fs.outputJsonSync(
    path.resolve(buildPath, `${contract}.json`),
    compiledContract[contract],
  );
}

console.log('Compiled Code Successfully Saved!');
