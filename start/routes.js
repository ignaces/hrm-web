'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/guides/routing
|
*/

const Route = use('Route')
const Helpers = use('Helpers')
const {ioc} = require('@adonisjs/fold')
var util = require('util')

//Route.on('/').render('welcome').middleware('autenticacion')

Route.get('/', 'Core/Portada.welcome').middleware('autenticacion')
Route.get('/login/google', 'Account/ExternalLogin.redirect')
Route.get('/google/callback', 'Account/ExternalLogin.callback')
Route.get('/game', 'Game/Guess.render').middleware('auth')
Route.get('/medirRedes/:codigo', 'Redes/Medicion.medir')
Route.post('/finRedes', 'Redes/Medicion.save')

Route.get('/Redes/Medicion/identificar','Redes/Medicion.identificar')

Route.post('/Redes/Medicion/medirPersona','Redes/Medicion.medirPersona')

Route.get('/Acreditacion/Informe/pdf','Acreditacion/Informe.pdf')


Route.get('/Account/Register/doRegisterPersonas','/Account/Register.doRegisterPersonas')



Route.get('/Talento/Persona/fichaPdf','Talento/Persona.fichaPdf')

Route.get('/Redes/Visualizador/viewGraph','Redes/Visualizador.viewGraph')
Route.post('/Redes/Visualizador/viewGraph','Redes/Visualizador.viewGraph')
Route.get('/Redes/Visualizador/viewApps','Redes/Visualizador.viewApps')


Route.get('users/:id', 'Account/UserController.profile').middleware('autenticacion')

Route.get('/login', 'Account/UserController.loginView')

Route.post('/login', 'Account/UserController.login')

Route.get('/logout', 'Account/UserController.logout')

Route.get('/Clima/Encuesta/index','Clima/Encuesta.index')
Route.get('/Encuesta/Encuesta/intro','Encuesta/Encuesta.intro')
Route.post('/Encuesta/Encuesta/intro','Encuesta/Encuesta.intro')

Route.get('/Encuesta/Encuesta/index','Encuesta/Encuesta.index')
Route.get('/Encuesta/Encuesta/instrumento','Encuesta/Encuesta.instrumento')
Route.post('/Encuesta/Encuesta/instrumento','Encuesta/Encuesta.instrumento')
Route.get('/Encuesta/Instrumento/putRespuesta','Encuesta/Instrumento.putRespuesta')
Route.get('/Encuesta/Instrumento/cerrarInstrumento','Encuesta/Instrumento.cerrarInstrumento')
Route.get('/Encuesta/Encuesta/fin','Encuesta/Encuesta.fin')

Route.any('/:module/:controller/:action',  ({view ,request, response,params,auth, session,antl}) => {
  
    const module = params.module
    
    const controller = params.controller
    
    const action = params.action
    
    
    const controllerPath = `App/Controllers/Http/${module}`
    
    const url = `${controllerPath}/${controller}.${action}`
    
    const controllerInstance = ioc.makeFunc(url)
   
    return controllerInstance.method.apply(controllerInstance.instance,[{view,request,response,params,auth, session,antl}])
    
}).middleware(['autenticacion:session'])


  