const HtmlWebpackPlugin = require('html-webpack-plugin');
const FileManagerPlugin = require('filemanager-webpack-plugin');
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
    new FileManagerPlugin({
      events: {
        // On start delete dist directory
        onStart: {
          delete: ['dist'],
        },
      },
    }),
  ],
  devServer: {
    watchFiles: path.join(__dirname, 'src'),
    port: 9000,
  },
};