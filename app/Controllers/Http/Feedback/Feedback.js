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

        async crearPlan  ({ view,request, response, auth, session }) {

            var idFeedbackOpinante=request.input("idOpinante");
            var datosVista = session.get("datosVista");

            var result = await data.execApi(request.hostname(),'/Feedback/Persona/getAcciones',{idFeedbackOpinante:idFeedbackOpinante});

            const fbAcciones = result.body.data;
            
            return view.render('feedback/crearPlan',  {idFeedbackOpinante:idFeedbackOpinante,datosVista,fbAcciones:fbAcciones});
        
        } 

        async saveFeedback  ({ view,request, response, auth, session }) {

            var idOpinante=request.input("idOpinante");
            var observacion=request.input("observacion");
            
            var result = await data.execApi(request.hostname(),'/Feedback/Persona/saveFeedback',{idOpinante:idOpinante,observacion:observacion});

            const fb = result.body.data;

            return fb;
        
        } 

        /*async guardarPlan  ({ view,request, response, auth, session }) {

            var idFeedbackOpinante = request.input("idFeedbackOpinante");
            var txtNomPlan = request.input("txtNomPlan");
            var txtAccion = request.input("txtAccion");
            var txtObjetivo = request.input("txtObjetivo");
            var fechaInicio = request.input("fechaInicio");

            var obj = {
                idFeedbackOpinante:idFeedbackOpinante,
                txtNomPlan:txtNomPlan,
                txtAccion:txtAccion,
                txtObjetivo:txtObjetivo,
                fechaInicio:fechaInicio
            };

            var result = await data.execApi(request.hostname(),'/Feedback/Persona/savePlanFeedback',obj);

            const fb = result.body.data;

            return fb;
        
        }*/ 

        async addAccion ({ view,request, response, auth, session }) {

            var idFeedbackOpinante = request.input("idFeedbackOpinante");
            var accion = request.input("accion");

            var obj = {
                idFeedbackOpinante:idFeedbackOpinante,
                objAccion:accion
            }

            var result = await data.execApiPost(request.hostname(),'/Feedback/Persona/addAccion',obj);

            var fb = result.body.data;

            return fb;
        
        } 

        async deleteAccion ({ view,request, response, auth, session }) {

            var idFeedbackOpinante = request.input("idFeedbackOpinante");
            var accion = request.input("accion");

            var obj = {
                idFeedbackOpinante:idFeedbackOpinante,
                objAccion:accion
            }

            console.log(obj)

            var result = await data.execApiPost(request.hostname(),'/Feedback/Persona/deleteAccion',obj);

            var fb = result.body.data;

            return fb;
        
        }       
        
    }
      
    module.exports = Feedback