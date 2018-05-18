'use strict'
const got = use('got')
const data = use('App/Utils/Data')
class Medicion {
    
    async medir({view,request,response,params}){
      //Recibir idEncuestaPersona


      var obj = {idRedesPersona:params.codigo};
      
      var rPersonas = await data.execApi(request.hostname(),'/Redes/Medicion/getPersonas',obj);
      
      var rPreguntas = await data.execApi(request.hostname(),'/Redes/Instrumento/preguntas',obj);

      //validaEstado
      var estado = await data.execApi(request.hostname(),'/Redes/Medicion/validaEstado',obj);

        const medicion = {codigo:params.codigo,
            preguntas:rPreguntas.body,
            idAplicacion:obj.idAplicacion
        }
        const personas = rPersonas.body
        
        return view.render('redes/medir',{personas:personas,medicion:medicion,estado:estado.body})
    }
    async medirPersona({view,request,response,params}){
      
      var obj = {idAplicacion:"4771dc31-2621-11e8-80db-bc764e10787e"};
      
      var rPersonas = await data.execApi(request.hostname(),'/Redes/Medicion/getPersonas',obj);
      
      var rPreguntas = await data.execApi(request.hostname(),'/Redes/Instrumento/preguntas',obj);
      var codigo = request.input("_code");
      
        const medicion = {codigo:codigo,
            preguntas:rPreguntas.body,
            idAplicacion:obj.idAplicacion
        }
        const personas = rPersonas.body
        
      
        return view.render('redes/medir',{personas:personas,medicion:medicion})
      }
      async identificar({view,request,response,params}){
      
        var obj = {idAplicacion:"4771dc31-2621-11e8-80db-bc764e10787e"};
        
        var rPersonas = await data.execApi(request.hostname(),'/Redes/Medicion/getPersonas',obj);
  
         
          const personas = rPersonas.body
          
          return view.render('redes/identificar',{personas:personas})
        }

      async save({view,request,response}){
        
        var obj = {req:request.all()};
        const rPreguntas = await data.execApi(request.hostname(),'/Redes/Instrumento/save',request.all());
        
        return view.render('redes/fin')
      }

}
module.exports = Medicion