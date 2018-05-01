'use strict'

const got = use('got')

class Ficha {
     index ({view,request, response, auth}) {

        
        const Env = use('Env')
        var server = Env.get('API_SERVER', 'development')
        var persona = {
            nombre:"Juan Alberto Gonzales Moya",
            cargo:"Cargo x",
            perfilCargo:"Maestro OOCC Empalmes",
            contratista:"Cobra"
        };
        return view.render('persona/ficha',  {persona:persona});
    }
     historia ({view,request,response}){
         const Env = use('Env')
         
         var server = Env.get('API_SERVER', 'development')
         
         var historial = [{
             descripcion:""
         }];
        return view.render('persona/historia',  {historial:historial}); 
    }
}

module.exports = Ficha