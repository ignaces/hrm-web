'use strict'
const got = use('got')
const data = use('App/Utils/Data')
class Medicion {
    
    async medir({view,request,response,params}){
      
      var obj = {idAplicacion:"fefa28be-2265-11e8-bf12-bc764e100f2b"};
      
      var rPersonas = await data.execApi(request.hostname(),'/Redes/Medicion/getPersonas',obj);
      
      var rPreguntas = await data.execApi(request.hostname(),'/Redes/Instrumento/preguntas',obj);

        const medicion = {codigo:params.codigo,
            preguntas:rPreguntas.body
        }
        const personas = rPersonas.body
        
        return view.render('redes/medir',{personas:personas,medicion:medicion})
      }
      async identificar({view,request,response,params}){
      
        var obj = {idAplicacion:"fefa28be-2265-11e8-bf12-bc764e100f2b"};
        
        var rPersonas = await data.execApi(request.hostname(),'/Redes/Medicion/getPersonas',obj);
  
         
          const personas = rPersonas.body
          
          return view.render('redes/identificar',{personas:personas})
        }

      async save({view,request,response}){
        
        var obj = {idAplicacion:"fefa28be-2265-11e8-bf12-bc764e100f2b",req:request.all()};
        const rPreguntas = await data.execApi(request.hostname(),'/Redes/Instrumento/save',request.all());
        
        return view.render('redes/fin')
      }

}
module.exports = Medicion