const { merge } = require('webpack-merge');
const commonConfig = require('./webpack.config.common');

const prodConfig = {};

module.exports = merge(commonConfig, prodConfig);
