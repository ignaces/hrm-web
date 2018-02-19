'use strict'

const { Command } = require('@adonisjs/ace')
const fs = use('fs')
const Helpers = use('Helpers')
class Controller extends Command {
  static get signature () {
    return 'controller'
  }

  static get description () {
    return 'Tell something helpful about this command'
  }

  async handle (args, options) {
    const modulo = await this
    .ask('Nombre del Modulo')

    const controller = await this
    .ask('Nombre del Controlador')
    const context = this;

    const texto =`'use strict'

    const data = use('App/Utils/Data')
    
    class ${controller} {
         async index  ({ view,request, response, auth, session }) {
          
          return view.render('${modulo.toLowerCase()}/index',  {});
        
        }   
      }
      
    module.exports = ${controller}`
    //await this.writeFile(Helpers.appRoot(`app/Controllers/Http/${modulo}/${controller}.js`))
    fs.writeFile(`app/Controllers/Http/${modulo}/${controller}.js`, texto, function(err) {
      if(err) {
          return console.log(err);
      }
  
      context.info(`Se creó ${modulo}/${controller}`)
    }); 
    
  }
}

module.exports = Controller
