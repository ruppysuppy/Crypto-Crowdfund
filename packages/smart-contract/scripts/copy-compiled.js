const path = require('path');
const fs = require('fs-extra');

const sourcePath = path.resolve(__dirname, '..', 'build');
const targetPath = path.resolve(
  __dirname,
  '..',
  '..',
  'blockchain',
  'src',
  'ethereum',
);

const filesToCopy = {
  campaignFactory: path.resolve(sourcePath, 'campaignFactory.json'),
  deployedAddress: path.resolve(sourcePath, 'address.json'),
};

console.log('Copying Compiled Contracts...');

fs.ensureDirSync(targetPath);
let errors = 0;

for (const filename in filesToCopy) {
  try {
    const fullFileName = `${filename}.json`;
    fs.removeSync(path.resolve(targetPath, fullFileName));
    fs.copySync(filesToCopy[filename], path.resolve(targetPath, fullFileName));
  } catch (err) {
    console.log(`${filesToCopy[filename]} not found`);
    errors++;
  }
}

console.log(errors ? `${errors} Error(s)` : 'Files Successfully Copied!');
