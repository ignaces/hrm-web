'use strict'
const got = use('got')
class Medicion {
    
    async medir({view,request,response,params}){
        const Env = use('Env')
        var server = Env.get('API_SERVER', 'development')
        
        const rPersonas = await got(`${server}/Persona/Persona/find`,
        {
          
          json:true,
          query:{nombre:""}
          
        })
        const rPreguntas = await got(`${server}/Redes/Instrumento/preguntas`,
        {
          
          json:true
          
        })
        
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