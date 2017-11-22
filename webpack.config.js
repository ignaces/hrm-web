var webpack = require('webpack');
const path = require('path');

module.exports = {
  entry: {
      Users:['./client/src/Users/users.js'],
      Ficha:['./client/src/Ficha/persona.js'],
      Persona:['./client/src/Persona/lista.js']
    },
  output: {
    filename: '[name].min.js',
    path: path.join(__dirname, 'public/assets/js/dist/')
  },plugins: [
    new webpack.optimize.UglifyJsPlugin({
      include: /\.min\.js$/,
      minimize: true
    })
  ]
};
/*module.exports = {
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
*/