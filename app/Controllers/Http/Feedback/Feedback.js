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

            var rencuesta = await data.execApi(request.hostname(),'/Feedback/Persona/getEncuestaFeedback',{idPersona:persona.id});

            const encuesta = rencuesta.body.data;

            var rparam = await data.execApi(request.hostname(),'/Feedback/Persona/consultarAcciones',{idPersona:persona.id,idProceso:idProceso});
            
            var mostrarAccion = rparam.body.data;

            //var res = await data.execApi(request.hostname(),'/Feedback/Persona/list',{idProceso:idProceso,idPersona:persona.id});
            
            return view.render('feedback/index',  {lista:colaboradores,encuesta:encuesta,datosProceso,PersonaEde,etapa,idPersona:persona.id,mostrarAccion:mostrarAccion.length,idProceso:idProceso,idEtapa:idEtapa});
        
        }

        async putRespuesta  ({ view,request, response, auth, session }) {

            var idPersona = request.input("idPersona");
            var idPregunta = request.input("idPregunta");
            var idAlternativa = request.input("idAlternativa");
            var justificacion = request.get("justificacion");

            var obj = {
                idPersona:idPersona,
                idPregunta:idPregunta,
                idAlternativa:idAlternativa,
                justificacion:justificacion
            };

            var result = await data.execApi(request.hostname(),'/Feedback/Persona/putRespuesta',obj);

            return {
                mensaje:''
            };
        
        }
        async getAccionesPredeterminadas ({ view,request, response, auth, session }){
            var idCompetencia = request.input("idCompetencia");
            var result = await data.execApi(request.hostname(),'/Feedback/Accion/predeterminadas',{idCompetencia:idCompetencia});
            return result.body.data;

        }
        async settings ({ view,request, response, auth, session }){
            var param = request.input("param");
            var idEtapa = request.input("idEtapa");
            var result = await data.execApi(request.hostname(),'/Feedback/Settings/getParametro',{param:param,idEtapa:idEtapa});
            return result.body.data;

        }

        async realizar  ({ view,request, response, auth, session }) {

            var idOpinante = request.input("idOpinante");
            var idOpinado = request.input("idOpinado");
            var datosVista = session.get("datosVista");
            var result = await data.execApi(request.hostname(),'/Feedback/Persona/getFeedback',{idOpinante:idOpinante});

            const fb = result.body.data;

            return view.render('feedback/feedback',  {feedback:fb,datosVista,idOpinante,idOpinado});
        
        } 

        async consultaPlan ({ view,request, response, auth, session }) {
            var idPersona=request.input("idPersona");
            var idProceso=request.input("idProceso");
            var idEtapa=request.input("idEtapa");            
            var datosVista = session.get("datosVista");

            var res = await data.execApi(request.hostname(),'/Feedback/Persona/consultarAcciones',{idPersona:idPersona,idProceso:idProceso});
            const fb = res.body.data;

            var result = await data.execApi(request.hostname(),'/Feedback/Persona/getAcciones',{idFeedbackOpinante:fb[0].id});
            var restado = await data.execApi(request.hostname(),'/Feedback/Persona/getEstadoPlan',{idFeedbackOpinante:fb[0].id});

            const fbAcciones = result.body.data;
            const fbEstado = restado.body.data;

            const estado = 'CON';

            var param = 'MOSTRARACCION';
            var rparam = await data.execApi(request.hostname(),'/Feedback/Settings/getParametro',{param:param,idEtapa:idEtapa});

            var mostrarB = rparam.body.data;

            var resultComp = await data.execApi(request.hostname(),'/Feedback/Persona/getCompetenciasOpinante',{idFeedbackOpinante:fb[0].id,idEtapaTareaActor:fb[0].actor_idEtapaTareaActor});
            var competencias = resultComp.body.data;

            return view.render('feedback/crearPlan',  {idFeedbackOpinante:fb[0].id,datosVista,fbAcciones:fbAcciones, estado:estado,competencias:competencias,mostrarB:mostrarB[0].valor});
        }

        async crearPlan  ({ view,request, response, auth, session }) {

            var idFeedbackOpinante=request.input("idOpinante");
            var idEtapaTareaActor=request.input("idEtapaTareaActor");
            var idEtapa=request.input("idEtapa");
            var datosVista = session.get("datosVista");

            var result = await data.execApi(request.hostname(),'/Feedback/Persona/getAcciones',{idFeedbackOpinante:idFeedbackOpinante});
            var restado = await data.execApi(request.hostname(),'/Feedback/Persona/getEstadoPlan',{idFeedbackOpinante:idFeedbackOpinante});
            
            var resultSettings = await data.execApi(request.hostname(),'/Feedback/Settings/getParametro',{param:"ACCIONESPRED",idEtapa:idEtapa});
            
            const fbAcciones = result.body.data;
            const fbEstado = restado.body.data;

            const estado = fbEstado[0].codigo;
            var resultComp = await data.execApi(request.hostname(),'/Feedback/Persona/getCompetenciasOpinante',{idFeedbackOpinante:idFeedbackOpinante,idEtapaTareaActor:idEtapaTareaActor});
            var competencias = resultComp.body.data;
            
            return view.render('feedback/crearPlan',  {idFeedbackOpinante:idFeedbackOpinante,datosVista,fbAcciones:fbAcciones, estado:estado,competencias:competencias,settings:resultSettings.body.data[0]});
        
        } 
        async confirmar({view,request, response, auth, session}){

            var idFeedbackOpinante=request.input("iop");
            return view.render('feedback/confirmar',  {idFeedbackOpinante:idFeedbackOpinante});

        }
        async fin({view,request, response, auth, session}){

            
            return view.render('feedback/fin',  {});

        }

        async saveFeedback  ({ view,request, response, auth, session }) {

            var idOpinante=request.input("idOpinante");
            var observacion=request.input("observacion");
            var presencial=request.input("presencial");
            var idOpinado=request.input("idOpinado");
            
            var result = await data.execApi(request.hostname(),'/Feedback/Persona/saveFeedback',
            {
                idOpinante:idOpinante,
                observacion:observacion,
                presencial:presencial,
                idOpinado:idOpinado
            });

            const fb = result.body.data;

            return fb;
        
        } 
        async saveConfirmacion  ({ view,request, response, auth, session }) {

            var idOpinante=request.input("idOpinante");
            var acuerdo=request.input("acuerdo");
            var presencial=request.input("presencial");
            
            var result = await data.execApi(request.hostname(),'/Feedback/Persona/saveConfirmacion',
            {
                idOpinante:idOpinante,
                acuerdo:acuerdo,
                presencial:presencial
            });

            const fb = result.body.data;

            return fb;
        
        } 

        async setEstadoEncuesta({ view,request, response, auth, session }) {
            var idPersona = request.input("idPersona");

            var obj = {
                idPersona:idPersona
            }

            var result = await data.execApi(request.hostname(),'/Feedback/Persona/setEstadoEncuesta',obj);

            return {
                mensaje:''
            };
        }

        async saveRespColaborador ({ view,request, response, auth, session }) {

            var idOpinado=request.input('idOpinado');
            var estado =request.input('estado');

            var obj = {
                idOpinado:idOpinado,
                estado:estado
            }

            var result = await data.execApiPost(request.hostname(),'/Feedback/Persona/saveRespColaborador',obj);

            return {
                mensaje:''
            };
        }

        async updateAccion ({ view,request, response, auth, session }) {

            var idFeedbackOpinante = request.input("idFeedbackOpinante");
            var accion = request.input("accion");

            var obj = {
                idFeedbackOpinante:idFeedbackOpinante,
                objAccion:accion
            }

            var result = await data.execApiPost(request.hostname(),'/Feedback/Persona/updateAccion',obj);

            var fb = result.body.data;

            return fb;
        
        } 

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

            var result = await data.execApiPost(request.hostname(),'/Feedback/Persona/deleteAccion',obj);

            var fb = result.body.data;

            return fb;
        
        }
        async finalizarPlan ({ view,request, response, auth, session }) {

            var idFeedbackOpinante = request.input("idFeedbackOpinante");

            var obj = {
                idFeedbackOpinante:idFeedbackOpinante,
            }

            var result = await data.execApiPost(request.hostname(),'/Feedback/Persona/finalizarPlan',obj);

            var fb = result.body.data;

            return fb;
        
        }       
        
    }
      
    module.exports = Feedback