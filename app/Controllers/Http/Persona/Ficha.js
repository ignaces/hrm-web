'use strict'

const data = use('App/Utils/Data')

class Ficha {
   async index ({view,request, response, auth,session}) {


            var persona =  session.get('personaLogueada')
            
            var obj = {
                "idPersona":persona.id
            };
            
            var resultPersona =  await data.execApi(request.hostname(),'/Persona/Persona/getPersona',obj);
           
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

    talento ({view,request, response, auth}) {

        
        const Env = use('Env')
        var server = Env.get('API_SERVER', 'development')
        var persona = {
            nombre:"Juan Alberto Gonzales Moya",
            cargo:"Cargo x",
            perfilCargo:"Maestro OOCC Empalmes",
            contratista:"Cobra"
        };
        return view.render('persona/talento',  {persona:persona});
    }
}

module.exports = Ficha