var path = require('path');
var CTagsWebpackPlugin = require('../src/CTagsWebpackPlugin').default;

module.exports = {
  entry: path.join(__dirname, 'index.js'),
  output: {
    path: path.join(__dirname, 'build'),
    filename: 'bundle.js',
  },
  module: {
    preLoaders: [
      {test: /\.js$/, loader: '../loader'}
    ],
    loaders: [
      {test: /\.js$/, loader: 'babel-loader'}
    ]
  },
  babel: {
    presets: ['es2015'],
  },
  plugins: [
    new CTagsWebpackPlugin(path.join(__dirname, 'tags'))
  ]
};
