const { merge } = require('webpack-merge');
const {
  PHASE_DEVELOPMENT_SERVER,
  PHASE_PRODUCTION_SERVER,
  PHASE_PRODUCTION_BUILD,
} = require('next/constants');

const webpackDevConfig = require('./webpack/webpack.config.dev.js');
const webpackProdConfig = require('./webpack/webpack.config.prod.js');

module.exports = (phase) => ({
  webpack: (config) => {
    let addedConfig;
    if (phase === PHASE_PRODUCTION_BUILD || phase === PHASE_PRODUCTION_SERVER) {
      addedConfig = webpackProdConfig;
    } else if (phase === PHASE_DEVELOPMENT_SERVER) {
      addedConfig = webpackDevConfig;
    }
    return merge(config, addedConfig);
  },
});
