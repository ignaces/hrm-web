var webpack = require('webpack');
const path = require('path');
var HardSourceWebpackPlugin = require('hard-source-webpack-plugin');
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
      dashboardReporte:['./client/src/Acreditacion/dashboardReporte.js'],
      AcreditacionColaboradores:['./client/src/Acreditacion/colaboradores.js'],
      etapasProceso:['./client/src/ede/etapasProceso.js'],
      procesosEde:['./client/src/ede/procesosEde.js'],
      metaFeedbackPublicar:['./client/src/ede/metaFeedbackPublicar.js'],
      Talento:['./client/src/Talento/talento.js'],
      dataTable:['./client/src/Talento/dataTable.js'],
      drag:['./client/src/Talento/drag.js'],
      filtroClasificaciones:['./client/src/Talento/filtroClasificaciones.js'],
      organigrama:['./client/src/Talento/organigrama.js'],
      curriculum:['./client/src/Talento/curriculum.js'],
      notificacionesSistema:['./client/src/Notificaciones/sistema.js'],
      marketplace:['./client/src/Talento/marketplace.js']
    },
  output: {
    filename: '[name].min.js',
    path: path.join(__dirname, 'public/assets/js/dist/')
  },plugins: [
    new webpack.optimize.UglifyJsPlugin({
      include: /\.min\.js$/,
      minimize: true
    }),
    new HardSourceWebpackPlugin()
  ]
};