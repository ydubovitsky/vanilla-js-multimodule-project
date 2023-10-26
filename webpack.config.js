const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
  // Application entry point
  entry: path.join(__dirname, 'src', 'index.js'),
  // Application output point
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'index.[contenthash:5].js',
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'src', 'template.html'),
      filename: 'index.html',
    }),
  ],
  devServer: {
    watchFiles: path.join(__dirname, 'src'),
    port: 9000,
  },
};