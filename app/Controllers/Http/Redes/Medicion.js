'use strict'
const got = use('got')
const data = use('App/Utils/Data')
class Medicion {
    
    async medir({view,request,response,params}){
      
      var obj = {nombre:""};
      var rPersonas = await data.execApi(request.hostname(),'/Persona/Persona/find',obj);
      var rPreguntas = await data.execApi(request.hostname(),'/Redes/Instrumento/preguntas',{});

        const medicion = {codigo:params.codigo,
            preguntas:rPreguntas.body
        }
        const personas = rPersonas.body
        
        return view.render('redes/medir',{personas:personas,medicion:medicion})
      }

      async save({view,request,response}){
        
        
        const rPreguntas = await data.execApi(request.hostname(),'/Redes/Instrumento/save',request.all());
        
        return view.render('redes/fin')
      }

}
module.exports = Medicion