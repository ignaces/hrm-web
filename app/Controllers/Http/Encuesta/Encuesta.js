'use strict'

    const data = use('App/Utils/Data')
    
    class Encuesta {
        async index  ({ view,request, response, auth, session }) {
          return view.render('encuesta/index',  {mensaje:""});
        } 

        async intro  ({ view,request, response, auth, session }) {
          var idEncuestaAplicacion = request.input("idEncuestaAplicacion")  ;
          var codigo = request.input("codigo");
          var referer = session.get("referer");
          var codigoActor = request.input("codigoActor");
          
          var obj = {
            idEncuestaAplicacion:idEncuestaAplicacion,
            codigo:codigo
          }
          var result =  await data.execApi(request.hostname(),'/Encuesta/Medicion/validarCodigo',obj);
          var validacion = result.body;
         
          if(validacion.continua){
            return view.render('encuesta/intro',  {codigoActor: codigoActor,encuestaPersona:validacion.encuestaPersona,referer});
          }else{
            var mensaje= validacion.mensaje;
            
            
            return view.render('encuesta/index',  {codigoActor: codigoActor,idEncuestaAplicacion:idEncuestaAplicacion,mensaje:mensaje,referer});
          }
          
        }

        async introExt  ({ view,request, response, auth, session }) {
          var idEncuestaAplicacion = request.input("idEncuestaAplicacion")  ;
          var codigo = request.input("codigo");
          var referer = request.input("referer");
          var codigoActor = request.input("codigoActor");
          
          var obj = {
            idEncuestaAplicacion:idEncuestaAplicacion,
            codigo:codigo
          }
          var result =  await data.execApi(request.hostname(),'/Encuesta/Medicion/validarCodigo',obj);
          var validacion = result.body;
         
          if(validacion.continua){
            return view.render('encuesta/intro',  {codigoActor: codigoActor,encuestaPersona:validacion.encuestaPersona,referer});
          }else{
            var mensaje= validacion.mensaje;
            
            
            return view.render('encuesta/index',  {codigoActor: codigoActor,idEncuestaAplicacion:idEncuestaAplicacion,mensaje:mensaje,referer});
          }
          
        }
     
        async instrumento ({ view,request, response, auth, session}){
          var idEncuestaPersona = request.input("idEncuestaPersona");
          var referer = session.get("referer");
          var codigoActor = request.input("codigoActor");
          console.log(codigoActor)
         var instrumento ={}
         var obj = {
            idEncuestaPersona:idEncuestaPersona
         }
          var result = await data.execApi(request.hostname(),'/Encuesta/Medicion/getInstrumento',obj);

          instrumento = result.body;
          
          var avance = await data.execApi(request.hostname(),'/Evaluacion/Instrumento/getAvanceFacsimil',{idFacsimil:instrumento.idFacsimil});

          var porcentaje =( avance.body.data.avance.Contestadas*100)/avance.body.data.avance.total;
          porcentaje = Math.round(porcentaje);
          instrumento.avance= `${porcentaje}`;
          instrumento.pp='components.Evaluacion.preguntaLickertGrilla';
          session.put("idEncuestaPersona",idEncuestaPersona)
          return view.render('encuesta/instrumento',  {codigoActor: codigoActor, idEncuestaPersona:idEncuestaPersona,instrumento:instrumento,referer});
        }

        async fin({view,request, response, auth, session}){
          var idEncuestaPersona = request.input("idEncuestaPersona");
          var codigoActor = request.input("codigoActor");
          var referer = session.get("referer");
          if(referer!=null){
            referer = `${referer}&idEncuestaPersona=${idEncuestaPersona}&codigoEstado=FINALIZADO&codigoActor=${codigoActor}`
            response.redirect(referer);
          }
          return view.render('encuesta/fin',  {});
        }
      }
      
    module.exports = Encuesta