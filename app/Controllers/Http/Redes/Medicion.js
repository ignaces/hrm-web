'use strict'
const got = use('got')
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
        const Env = use('Env')
        var server = Env.get('API_SERVER', 'development')
        const rPreguntas = await got(`${server}/Redes/Instrumento/save`,
        {
          
          json:true,
          body:request.all()
          
        })
        
        return view.render('redes/fin')
      }

}
module.exports = Medicion