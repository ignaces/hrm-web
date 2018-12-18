'use strict'

const api = use('App/Utils/Data')

class Meta {

    //PUBLICACION METAS (FEEDBACK CON OBSREVACIÓN)

    async etapa ({view,request, response, auth, session}) {
        var idPersona = session.get('idPersona', 'fail')
        var idProceso = session.get('idProceso')
        var idEtapa = request.input("idEtapa")
        var idEdeProcesoPersona =request.input("idEdeProcesoPersona")
        var datosProceso=session.get('dataProceso')


        //Datos Persona
        var user={usuario:auth.user}
        var persona = session.get('personaLogueada')

        var objdatosPersona = {
            "idProceso":idProceso,
            "idPersona":idPersona
        };

        var resultPersonaEde =await api.execApi(request.hostname(),'/Desempeno/Proceso/getProcesoPersona',objdatosPersona);
        var PersonaEde =resultPersonaEde.body.data;
        //

        //Menu Contextual
        var objMenuContextual = {
            "idProceso":idProceso,
            idEstado:"1"
        };
        var resultMenu =await api.execApi(request.hostname(),'/Desempeno/Proceso/getMenuUsuario',objMenuContextual);
        var datosMenu =resultMenu.body.data;
        //

        //Etapa
        var objEtapa = {
            "idProceso":idProceso,
            "idEtapa":idEtapa
        };
        var resultEtapa=await api.execApi(request.hostname(),'/Desempeno/Proceso/getEtapas',objEtapa);
        var etapa =resultEtapa.body.data;
        //

         //Lista EVAL
         var objEval={
            "idEtapa":idEtapa,
	        "idPersonaActor":idPersona,
	        "codigoActor":"EVAL",
        }
        var resultEval=await api.execApi(request.hostname(),'/Desempeno/Proceso/getListaEvaluados',objEval);
        var listaEval =resultEval.body.data;      
        //
        //console.log(listaEval)

         //Lista Supe
         var objSupe={
            "idEtapa":idEtapa,
	        "idPersonaActor":idPersona,
	        "codigoActor":"SUPE",
        }
        var resultSupe=await api.execApi(request.hostname(),'/Desempeno/Proceso/getListaEvaluados',objSupe);
        var listaSupe =resultSupe.body.data;      
        //
        //console.log(listaSupe)

        return view.render('desempeno/etapa',{datosProceso,PersonaEde,datosMenu,etapa,listaEval,listaSupe});
    }

    async evaluar({ view, request, response, auth, session }) {
        var idPersona = session.get('idPersona', 'fail')
        var idEtapa = request.input("idEtapa")
        var idAccionPersona = request.input("idAccionPersona")
        var codigoActor = request.input("codigoActor")
        var idOpinante = request.input("idOpinante")
        var idProceso = session.get('idProceso')
        var datosProceso = session.get('dataProceso')

        //DataVista
        
        var dataVista = {
            "idProceso" : idProceso,
            "idEtapa" : idEtapa,
            "idAccionPersona" : idAccionPersona,
            "codigoActor" : codigoActor,
            "idOpinante":idOpinante
        }
        session.put("dataVista",dataVista);
        //Data Evaluado
        var objEval = {
            "idEtapa": idEtapa,
            "idPersonaActor": idPersona,
            "codigoActor": codigoActor,
            "idAccionPersona": idAccionPersona
        }
        
        try{
            var resultEval = await api.execApi(request.hostname(), '/Desempeno/Proceso/getListaEvaluados', objEval);
            var listaEval = resultEval.body.data;
        }
        catch(e)
        {   
            var obj = {
                "mensaje": "Al invocar getListaEvaluados",
                "idPersonaActor": idPersona
            }
            var result = await api.execApi(request.hostname(),'/Desempeno/Accion/addLog',obj);
        }

        var persona = {
            "foto": listaEval[0].foto,
            "nombres": listaEval[0].nombres,
            "apellidoPaterno": listaEval[0].apellidoPaterno,
            "apellidoMaterno": listaEval[0].apellidoMaterno,
            "cargo": listaEval[0].nombreCargo
        }

        var Perso = []

        Perso.push(persona);

        var idEtapaTarea = listaEval[0].tareas[0].tarea.idEtapaTarea

        //Datos Tarea
        var objDatosTarea = {
            "idEtapa": "",
            "idTareaEtapa": idEtapaTarea
        };


        try{
            var resultTarea = await api.execApi(request.hostname(), '/Desempeno/Proceso/getTareasEtapas', objDatosTarea);
            var datosTarea = resultTarea.body.data;
        }
        catch(e)
        {   
            var obj = {
                "mensaje": "Al invocar getTareasEtapas",
                "idPersonaActor": idPersona
            }
            var result = await api.execApi(request.hostname(),'/Desempeno/Accion/addLog',obj);
        }

        //COLUMNAS
        var objDataColumnas = {
            "idProceso":idProceso
        };

        try{
            var resultDataColumnas =await api.execApi(request.hostname(),'/Desempeno/Metas/getMetasColumnas',objDataColumnas);
            var dataColumnas =resultDataColumnas.body.data;
        }
        catch(e)
        {   
            var obj = {
                "mensaje": "Al invocar getMetasColumnas",
                "idPersonaActor": idPersona
            }
            var result = await api.execApi(request.hostname(),'/Desempeno/Accion/addLog',obj);
        }

        //METAS
        var objDataMetas = {
            "idProceso":idProceso,
            "idPerfilMeta": listaEval[0].idEdeMetaPerfil,
            "idProcesoPersona": listaEval[0].idEvaluado,
            "eliminada":0

        };
        
        try{
            var resultDataMetas =await api.execApi(request.hostname(),'/Desempeno/Metas/getMetasColaborador',objDataMetas);
            var dataMetas =resultDataMetas.body.data;
        }
        catch(e)
        {   
            var obj = {
                "mensaje": "Al invocar getMetasColaborador",
                "idPersonaActor": idPersona
            }
            var result = await api.execApi(request.hostname(),'/Desempeno/Accion/addLog',obj);
        }
        
        
        //OBSERVACION
        var objObservacion = {
            "idObservacionAccion":"",
            "idEtapaTareaAccionProcesoPersona":listaEval[0].tareas[0].tarea.evaluado_idEtapaTareaAccionPersona,
            "idEtapaTareaActor":listaEval[0].tareas[0].tarea.actor_idEtapaTareaActor
        }

        try
        {
            var resultObservacion =await api.execApi(request.hostname(),'/Desempeno/Accion/getObservacionAccion',objObservacion);
            var dataObservacion =resultObservacion.body.data;
        }
        catch(e)
        {   
            var obj = {
                "mensaje": "Al invocar getObservacionAccion",
                "idPersonaActor": idPersona
            }
            var result = await api.execApi(request.hostname(),'/Desempeno/Accion/addLog',obj);
        }

        var textoObservacion="";
        try{
            if (dataObservacion.length > 0){
                textoObservacion=dataObservacion[0].observacion
            };
        }
        catch(e)
        {   
            var obj = {
                "mensaje": "Mensaje vacío",
                "idPersonaActor": idPersona
            }
            var result = await api.execApi(request.hostname(),'/Desempeno/Accion/addLog',obj);
        }

        var idOpinante  = request.input("idOpinante");
        
        var codigo     = request.input("codigoActor");
        
        //var codigo = all.codigo
        //var codigoComponente = all.codigoComponente
    
        var obj = {
            "idOpinante":idOpinante
        };
        //////console.log(obj);

        try{
            var result = await api.execApi(request.hostname(),'/Evaluacion/Instrumento/getInstrumentoEde',obj);
        }
        catch(e)
        {   
            var obj = {
                "mensaje": "Al invocar getInstrumentoEde",
                "idPersonaActor": idPersona
            }
            var result = await api.execApi(request.hostname(),'/Desempeno/Accion/addLog',obj);
        }
        

        var instrumento = result.body;
        
        //RENDER
        return view.render('desempeno/metas/evaluacion/evaluar', {dataVista, datosTarea, Perso, listaEval,dataMetas,dataColumnas,dataObservacion,textoObservacion, instrumento: instrumento});
    }

    async saveCumplimiento({request, response,session}) 
    {
        try {
                var idMeta= request.input("id");
                var valor= request.input("value");
                var idOpinante = request.input("idOpinante");
                
                var obj = {
                    "idMeta":idMeta,
                    "valor":valor,
                    "idOpinante":idOpinante
                };
        
                var result = await api.execApi(request.hostname(),'/Desempeno/Metas/saveCumplimiento',obj);  
            } catch (e) {
                console.log(e);
                
            }
        return {mensaje:"ok"}
    }
    async finalizar({request, response,session}){
        try{
            var data = session.get('dataVista')
            var obj = {
                "idAccionPersona":request.input("idAccionPersona"),
                "idOpinante":request.input("idOpinante")//data.idOpinante,
            };
            var result = await api.execApi(request.hostname(),'/Desempeno/Metas/finalizar',obj);  
            
        }catch(ex){
            console.log(ex)
        }
        
    }
}

module.exports = Meta