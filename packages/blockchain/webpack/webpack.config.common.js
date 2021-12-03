const Dotenv = require('dotenv-webpack');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const NodePolyfillPlugin = require("node-polyfill-webpack-plugin")

module.exports = {
  module: {
    rules: [
      {
        test: /\.ts|\.tsx$/,
        exclude: /node_modules/,
        use: 'ts-loader',
      },
    ],
  },
  resolve: {
    extensions: ['', '.js', '.ts', '.tsx', '.module.css'],
  },
  plugins: [
    new NodePolyfillPlugin(),
    new Dotenv(),
    new HTMLWebpackPlugin({
      template: './public/index.html',
      filename: 'index.html',
    }),
  ],
};
