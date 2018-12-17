'use strict'

    const data = use('App/Utils/Data')
    var Enumerable = require('linq');
    class Feedback {
         async index  ({ view,request, response, auth, session }) {
            var datosProceso=session.get('dataProceso')
            var idProceso=request.input("idProceso");
            var idEtapa=request.input("idEtapa");
            var persona = session.get('personaLogueada')

            session.put("datosVista",{idProceso:idProceso,idEtapa:idEtapa});
            var objdatosPersona = {
                "idProceso":idProceso,
                "idPersona":persona.id
            };
    
            var resultPersonaEde =await data.execApi(request.hostname(),'/Desempeno/Proceso/getProcesoPersona',objdatosPersona);
            var PersonaEde =resultPersonaEde.body.data;

            //Etapa
            var objEtapa = {
                "idProceso":idProceso,
                "idEtapa":idEtapa
            };
            var resultEtapa=await data.execApi(request.hostname(),'/Desempeno/Proceso/getEtapas',objEtapa);
            var etapa =resultEtapa.body.data;
            
            var result = await data.execApi(request.hostname(),'/Feedback/Persona/list',{idProceso:idProceso,idPersona:persona.id});

            const colaboradores = result.body.data;

            return view.render('feedback/index',  {lista:colaboradores,datosProceso,PersonaEde,etapa});
        
        }
        async realizar  ({ view,request, response, auth, session }) {

            var idOpinante = request.input("idOpinante");
            var datosVista = session.get("datosVista");
            var result = await data.execApi(request.hostname(),'/Feedback/Persona/getFeedback',{idOpinante:idOpinante});

            const fb = result.body.data;

            return view.render('feedback/feedback',  {feedback:fb,datosVista,idOpinante});
        
        } 

        async saveFeedback  ({ view,request, response, auth, session }) {

            var idOpinante=request.input("idOpinante");
            var observacion=request.input("observacion");
            
            var result = await data.execApi(request.hostname(),'/Feedback/Persona/saveFeedback',{idOpinante:idOpinante,observacion:observacion});

            const fb = result.body.data;

            return fb;
        
        } 

       
        
    }
      
    module.exports = Feedback