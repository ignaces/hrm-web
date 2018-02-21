var webpack = require('webpack');
const path = require('path');

module.exports = {
  entry: {
      Users:['./client/src/Users/users.js'],
      Ficha:['./client/src/Ficha/persona.js'],
      Persona:['./client/src/Persona/lista.js'],
      Instrumento:['./client/src/Instrumento/instrumento.js'],
      Talento:['./client/src/Talento/talento.js'],
      dataTable:['./client/src/Talento/dataTable.js'],
      drag:['./client/src/Talento/drag.js']
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