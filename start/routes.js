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

Route.get('/game', 'Game/Guess.render').middleware('auth')
Route.get('/medirRedes/:codigo', 'Redes/Medicion.medir')

Route.post('/finRedes', 'Redes/Medicion.save')

Route.get('users/:id', 'Account/UserController.profile').middleware('autenticacion')

Route.get('/login', 'Account/UserController.loginView')

Route.post('/login', 'Account/UserController.login')

Route.get('/logout', 'Account/UserController.logout')


Route.any('/:module/:controller/:action',  ({view ,request, response,params,auth, session}) => {
  
    const module = params.module
    
    const controller = params.controller
    
    const action = params.action
    
    
    const controllerPath = `App/Controllers/Http/${module}`
    
    const url = `${controllerPath}/${controller}.${action}`
    
    const controllerInstance = ioc.makeFunc(url)
   
    return controllerInstance.method.apply(controllerInstance.instance,[{view,request,response,params,auth, session}])
    
}).middleware(['autenticacion'])


  