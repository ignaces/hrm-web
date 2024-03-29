'use strict'

const { Command } = require('@adonisjs/ace')
const fs = use('fs')
const Helpers = use('Helpers')
class Vista extends Command {
  
  
  static get signature () {
    return 'vista'
  }

  static get description () {
    return 'Tell something helpful about this command'
  }

  async handle (args, options) {

    var modulos = fs.readdirSync(Helpers.appRoot(`app/Controllers/Http/`));
    
    
    const modulo = await this
    .choice('Selecciona el Módulo',modulos)
    const contenedor = await this
    .ask('Nombre del contenedor de la Vista','')
    const vista = await this
    .ask('Nombre de la Vista')

    const layout = await this
    .choice('Layout',['horizontal','nomenu'])

    const context = this;

    const texto =`@layout('layouts/${layout}')
@section('scripts')

@endsection

@section('pluginsCss')

@endsection


@section('content')

@endsection`
    
              ////console.log(Helpers.appRoot(`resources/views/${modulo.toLowerCase()}/${vista}.edge`))
    modulo = modulo.charAt(0).toLowerCase();
    contenedor = contenedor.charAt(0).toLowerCase();
    var path = Helpers.appRoot(`resources/views/${modulo}/${contenedor}`)
    if(contenedor!=''){
      vista = `${contenedor}/${vista}`;
    }

    if (!fs.existsSync(path)){
      fs.mkdirSync(path);
    }
    fs.writeFile(Helpers.appRoot(`resources/views/${modulo}/${vista}.edge`), texto, function(err) {
      if(err) {
          return //console.log(err);
      }
  
      context.info(`Se creó la vista correctamente`)
    }); 
  }
}

module.exports = Vista
