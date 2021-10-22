const { merge } = require('webpack-merge');
const commonConfig = require('./webpack.config.common');

const devConfig = {
    mode: 'development',
    output: {
        publicPath: 'http://localhost:8001/',
    },
    devServer: {
        port: 8001,
        historyApiFallback: true,
    },
};

module.exports = merge(commonConfig, devConfig);
