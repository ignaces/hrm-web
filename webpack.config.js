var webpack = require('webpack');
const path = require('path');

module.exports = {
  entry: './client/src/Users/users.js',
  output: {
    filename: 'users.min.js',
    path: path.resolve(__dirname, 'public/assets/js/dist/Users')
  },plugins: [
    new webpack.optimize.UglifyJsPlugin({
      include: /\.min\.js$/,
      minimize: true
    })
  ]
};
module.exports = {
  entry: './client/src/Ficha/persona.js',
  output: {
    filename: 'ficha.min.js',
    path: path.resolve(__dirname, 'public/assets/js/dist/Ficha')
  },plugins: [
    new webpack.optimize.UglifyJsPlugin({
      include: /\.min\.js$/,
      minimize: true
    })
  ]
};
module.exports = {
  entry: './client/src/Persona/lista.js',
  output: {
    filename: 'lista.min.js',
    path: path.resolve(__dirname, 'public/assets/js/dist/Persona')
  },plugins: [
    new webpack.optimize.UglifyJsPlugin({
      include: /\.min\.js$/,
      minimize: true
    })
  ]
};
