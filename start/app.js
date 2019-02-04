'use strict'

/*
|--------------------------------------------------------------------------
| Providers
|--------------------------------------------------------------------------
|
| Providers are building blocks for your Adonis app. Anytime you install
| a new Adonis specific package, chances are you will register the
| provider here.
|
*/
const providers = [
  '@adonisjs/framework/providers/AppProvider',
  '@adonisjs/framework/providers/ViewProvider',
  '@adonisjs/lucid/providers/LucidProvider',
  '@adonisjs/bodyparser/providers/BodyParserProvider',
  '@adonisjs/cors/providers/CorsProvider',
  '@adonisjs/shield/providers/ShieldProvider',
  '@adonisjs/session/providers/SessionProvider',
  '@adonisjs/auth/providers/AuthProvider',
  '@adonisjs/ally/providers/AllyProvider',
  '@adonisjs/redis/providers/RedisProvider',
  '@adonisjs/websocket/providers/WsProvider'
]

/*
|--------------------------------------------------------------------------
| Ace Providers
|--------------------------------------------------------------------------
|
| Ace providers are required only when running ace commands. For example
| Providers for migrations, tests etc.
|
*/
const aceProviders = [
  '@adonisjs/lucid/providers/MigrationsProvider'
]

/*
|--------------------------------------------------------------------------
| Aliases
|--------------------------------------------------------------------------
|
| Aliases are short unique names for IoC container bindings. You are free
| to create your own aliases.
|
| For example:
|   { Route: 'Adonis/Src/Route' }
|
*/
const aliases = {
}

/*
|--------------------------------------------------------------------------
| Commands
|--------------------------------------------------------------------------
|
| Here you store ace commands for your package
|
*/
const commands = ["App/Commands/Controller","App/Commands/Vista"]

module.exports = { providers, aceProviders, aliases, commands }

const edge = require('edge.js')

edge.global('theme', function (hostname) {
  const Env = use('Env')

  var theme = Env.get('STYLE', 'default');
  var hostalias = Env.get('HOSTALIAS', 'localhost');
  //hostname="enel.enovum.cl"
  

  if(hostname==hostalias){
    theme = `/themes/${theme}` 
  }else{
    var company = hostname.split(".")[0]
    theme = `https://hrmassets.enovum.cl/${company}`
  }
  
  
  return theme;
})

edge.global('componente', function (modulo,componente) {
  
  var ruta = `${modulo}.${componente}`;
  
  return ruta;
})
