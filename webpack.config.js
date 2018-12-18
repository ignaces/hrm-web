var webpack = require('webpack');
const path = require('path');
var HardSourceWebpackPlugin = require('hard-source-webpack-plugin');
module.exports = {
  entry: {
    //Account
    AccountLogin:             ['./client/src/Account/login.js'],
    //Acreditacion
    PersonasProceso:          ['./client/src/Acreditacion/personas.js'],
    EvaluadoProceso:          ['./client/src/Acreditacion/evaluadoProceso.js'],
    dashboardReporte:         ['./client/src/Acreditacion/dashboardReporte.js'],
    AcreditacionColaboradores:['./client/src/Acreditacion/colaboradores.js'],
    //Administracion
    Menu:                     ['./client/src/Administracion/menu.js'],
    RegistrarPersona:         ['./client/src/Administracion/registrarPersona.js'],
    EvaluadorMasivo:          ['./client/src/Administracion/evaluadorMasivo.js'],
    //Core
    CoreNetwork:              ['./client/src/Core/network.js'],
    //Ede
    etapasProceso:            ['./client/src/ede/etapasProceso.js'],
    procesosEde:              ['./client/src/ede/procesosEde.js'],
    metaFeedbackPublicar:     ['./client/src/ede/metaFeedbackPublicar.js'],
    metaEvaluar:              ['./client/src/ede/metaEvaluar.js'],
    metaFeedbackConfirmar:    ['./client/src/ede/metaFeedbackConfirmar.js'],
    //Feedback
    feedbackSave:             ['./client/src/Feedback/Feedback.js'],
    feedbackCrearPlan:        ['./client/src/Feedback/FeedbackCrearPlan.js'],
    //participantes:            ['./client/src/ede/participantes.js'],
    //Encuesta
    ingresoEncuesta:          ['./client/src/Encuesta/ingreso.js'],
    instrumentoEncuesta:      ['./client/src/Encuesta/paginacion.js','./client/src/Encuesta/instrumento.js'],
    //Ficha
    Ficha:                    ['./client/src/Ficha/persona.js'],
    //Instrumento
    Instrumento:              ['./client/src/Instrumento/instrumento.js'],
    //InstrumentoDesempeno
    InstrumentoDesempeno:     ['./client/src/Instrumento/instrumentoDesempeno.js'],
    //InstrumentoGlobal
    InstrumentoGlobal:        ['./client/src/Instrumento/instrumentoGlobal.js'],
    InstrumentoGlobalP:       ['./client/src/Instrumento/instrumentoGlobalP.js'],
    //Mail
    listaNotificacion:        ['./client/src/Mail/listaNotificacion.js'],
    configNotificacion:       ['./client/src/Mail/notificacion.js'],
    //Notificaciones
    notificacionesSistema:    ['./client/src/Notificaciones/sistema.js'],
    //Persona
    Persona:                  ['./client/src/Persona/lista.js'],
    //Talento
    Talento:                  ['./client/src/Talento/talento.js'],
    dataTable:                ['./client/src/Talento/dataTable.js'],
    drag:                     ['./client/src/Talento/drag.js'],
    filtroClasificaciones:    ['./client/src/Talento/filtroClasificaciones.js'],
    organigrama:              ['./client/src/Talento/organigrama.js'],
    curriculum:               ['./client/src/Talento/curriculum.js'],
    marketplace:              ['./client/src/Talento/marketplace.js'],
    //Users
    Users:                    ['./client/src/Users/users.js'],
    //Easter
    easter:                   ['./client/src/Core/easter.js']
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