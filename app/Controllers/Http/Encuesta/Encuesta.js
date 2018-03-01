'use strict'

    const data = use('App/Utils/Data')
    
    class Encuesta {
         async index  ({ view,request, response, auth, session }) {
          
          return view.render('encuesta/index',  {});
        
        } 
        async intro  ({ view,request, response, auth, session }) {
          var idEncuestaAplicacion = request.input("idEncuestaAplicacion")  ;
          var codigo = request.input("codigo");
          var obj = {
            idEncuestaAplicacion:idEncuestaAplicacion,
            codigo:codigo
          }
          var result =  await data.execApi(request.hostname(),'/Encuesta/Medicion/validarCodigo',obj);
          var validacion = result.body;
          
          if(validacion.continua){
            return view.render('encuesta/intro',  {encuestaPersona:validacion.encuestaPersona});
          }else{
            return view.render('encuesta/index',  {idEncuestaAplicacion:idEncuestaAplicacion,validacion:validacion});
          }
          
        }
     
        async instrumento ({ view,request, response, auth, session}){
          var idEncuestaPersona = request.input("idEncuestaPersona");
          
          var instrumento ={}
         var obj = {
          idEncuestaPersona:idEncuestaPersona
         }
          var result = await data.execApi(request.hostname(),'/Encuesta/Medicion/getInstrumento',obj);

          instrumento = result.body;
          instrumento.pp='components.Evaluacion.preguntaLickertGrilla';
          return view.render('encuesta/instrumento',  {idEncuestaPersona:idEncuestaPersona,instrumento:instrumento});
        }
      }
      
    module.exports = Encuesta