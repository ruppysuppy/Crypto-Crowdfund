const { merge } = require('webpack-merge');
const commonConfig = require('./webpack.config.common');

const prodConfig = {
  module: {
    rules: [
      {
        test: /\.module.css$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: {
                localIdentName: 'mk-[hash:base64:5]',
              },
              importLoaders: 1,
            },
          },
        ],
      },
    ],
  },
};

module.exports = merge(commonConfig, prodConfig);
