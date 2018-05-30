var webpack = require('webpack');
const path = require('path');

module.exports = {
  entry: {
      Users:['./client/src/Users/users.js'],
      Ficha:['./client/src/Ficha/persona.js'],
      Persona:['./client/src/Persona/lista.js'],
      Menu:['./client/src/Administracion/menu.js'],
      RegistrarPersona:['./client/src/Administracion/registrarPersona.js'],
      PersonasProceso:['./client/src/Acreditacion/personas.js'],
      EvaluadoProceso:['./client/src/Acreditacion/evaluadoProceso.js'],
      CoreNetwork:['./client/src/Core/network.js'],
      Instrumento:['./client/src/Instrumento/instrumento.js'],
      listaNotificacion:['./client/src/Mail/listaNotificacion.js'],
      configNotificacion:['./client/src/Mail/notificacion.js'],
      ingresoEncuesta:['./client/src/Encuesta/ingreso.js'],
      instrumentoEncuesta:['./client/src/Encuesta/paginacion.js','./client/src/Encuesta/instrumento.js'],
      Productos:['./client/src/Administracion/producto.js']
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