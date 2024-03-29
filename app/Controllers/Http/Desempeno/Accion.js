'use strict'

const api = use('App/Utils/Data')
const mail = use('App/Controllers/Http/Mail/Mailgun')

class Accion {

    //---->> PUBLICAR METAS
    /*
    async publicar({ view, request, response, auth, session }) {
       
        
        var idPersona = session.get('idPersona', 'fail')
        var idEtapa = request.input("idEtapa")
        var idAccionPersona = request.input("idAccionPersona")
        var codigoActor = request.input("codigoActor")
        var idProceso = session.get('idProceso')
        var datosProceso = session.get('dataProceso')

        //DataVista
        var dataVista = {
            "idProceso" : idProceso,
            "idEtapa" : idEtapa,
            "idAccionPersona" : idAccionPersona,
            "codigoActor" : codigoActor
        }

        //Data Evaluado
        var objEval = {
            "idEtapa": idEtapa,
            "idPersonaActor": idPersona,
            "codigoActor": codigoActor,
            "idAccionPersona": idAccionPersona
        }
        var resultEval = await api.execApi(request.hostname(), '/Desempeno/Proceso/getListaEvaluados', objEval);
        var listaEval = resultEval.body.data;
       ////console.log(listaEval)
        //

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
        var resultTarea = await api.execApi(request.hostname(), '/Desempeno/Proceso/getTareasEtapas', objDatosTarea);
        var datosTarea = resultTarea.body.data;

        //COLUMNAS
        var objDataColumnas = {
            "idProceso":idProceso
        };
        var resultDataColumnas =await api.execApi(request.hostname(),'/Desempeno/Metas/getMetasColumnas',objDataColumnas);
        var dataColumnas =resultDataColumnas.body.data;

        //METAS
        var objDataMetas = {
            "idProceso":idProceso,
            "idPerfilMeta": listaEval[0].idEdeMetaPerfil,
            "idProcesoPersona": listaEval[0].idEvaluado,
            "eliminada":0

        };
        var resultDataMetas =await api.execApi(request.hostname(),'/Desempeno/Metas/getMetasColaborador',objDataMetas);
        var dataMetas =resultDataMetas.body.data;
        
        
        //OBSERVACION
        var objObservacion = {
            "idObservacionAccion":"",
            "idEtapaTareaAccionProcesoPersona":listaEval[0].tareas[0].tarea.evaluado_idEtapaTareaAccionPersona,
            "idEtapaTareaActor":listaEval[0].tareas[0].tarea.actor_idEtapaTareaActor
        }
        var resultObservacion =await api.execApi(request.hostname(),'/Desempeno/Accion/getObservacionAccion',objObservacion);
        var dataObservacion =resultObservacion.body.data;

        var textoObservacion="";
        if (dataObservacion.lenght > 0){
            textoObservacion=dataObservacion[0].observacion
        };

        //RENDER
        return view.render('desempeno/metas/feedback/publicar', {dataVista, datosTarea, Perso, listaEval,dataMetas,dataColumnas,dataObservacion,textoObservacion});
    }
    */

   


    //----<< PUBLICAR METAS

    //---->> OBSERVACIÓN

    async addObservacionAccion({view,request, response}) {
       
        var idEtapaTareaAccionProcesoPersona= request.input('idEtapaTareaAccionProcesoPersona');
        var idEtapaTareaActor= request.input('idEtapaTareaActor');
        var observacion= request.input('observacion');
        
        var obj = {
            "idEtapaTareaAccionProcesoPersona":idEtapaTareaAccionProcesoPersona,
            "idEtapaTareaActor":idEtapaTareaActor,
            "observacion":observacion
            
        };

        var result = await api.execApi(request.hostname(),'/Desempeno/Accion/addObservacionAccion',obj);  

        return{mensaje:"ok"}       
    }

    async addObservacionAccionFinalizar({view,request, response}) {
       
        var idEtapaTareaAccionProcesoPersona= request.input('idEtapaTareaAccionProcesoPersona');
        var idEtapaTareaActor= request.input('idEtapaTareaActor');
        var observacion= request.input('observacion');
        var codigoCab = request.input('codigoCab');
        var codigoCuerpo = request.input('codigoCuerpo');
        var idEtapa = request.input('idEtapa');

        var obj = {
            "idEtapaTareaAccionProcesoPersona":idEtapaTareaAccionProcesoPersona,
            "idEtapaTareaActor":idEtapaTareaActor,
            "observacion":observacion
        };

        var result = await api.execApi(request.hostname(),'/Desempeno/Accion/addObservacionAccionFinalizar',obj);  

        var objEmail = {
            "idEdeEtapaTareaAccionProcesoPersona":idEtapaTareaAccionProcesoPersona
        };
        var result = await api.execApi(request.hostname(),'/Desempeno/Proceso/getEmailPorIdMatriz',objEmail);  
        var correo = result.body.data[0];
        console.log(correo);

        this.sendNotificacion(request,idEtapaTareaAccionProcesoPersona,codigoCab,codigoCuerpo,idEtapa, correo);
        return{mensaje:"ok"} 
      
    }

    async updObservacionAccion({view,request, response}) {
       
        var idObservacionAccion= request.input('idObservacionAccion');
        var idEtapaTareaAccionProcesoPersona= request.input('idEtapaTareaAccionProcesoPersona');
        var idEtapaTareaActor= request.input('idEtapaTareaActor');
        var observacion= request.input('observacion');
        
        var obj = {
            "idObservacionAccion":idObservacionAccion,
            "idEtapaTareaAccionProcesoPersona":idEtapaTareaAccionProcesoPersona,
            "idEtapaTareaActor":idEtapaTareaActor,
            "observacion":observacion
            
        };

        var result = await api.execApi(request.hostname(),'/Desempeno/Accion/updObservacionAccion',obj);  

        return{mensaje:"ok"} 
    }

    async updObservacionAccionFinalizar({view,request, response}) {
       
        var idObservacionAccion= request.input('idObservacionAccion');
        var idEtapaTareaAccionProcesoPersona= request.input('idEtapaTareaAccionProcesoPersona');
        var idEtapaTareaActor= request.input('idEtapaTareaActor');
        var observacion= request.input('observacion');
        var codigoCab = request.input('codigoCab');
        var codigoCuerpo = request.input('codigoCuerpo');
        var idEtapa = request.input('idEtapa');

        var obj = {
            "idObservacionAccion":idObservacionAccion,
            "idEtapaTareaAccionProcesoPersona":idEtapaTareaAccionProcesoPersona,
            "idEtapaTareaActor":idEtapaTareaActor,
            "observacion":observacion
            
        };

        var result = await api.execApi(request.hostname(),'/Desempeno/Accion/updObservacionAccionFinalizar',obj);  
        
        var objEmail = {
            "idEdeEtapaTareaAccionProcesoPersona":idEtapaTareaAccionProcesoPersona
        };
        var result = await api.execApi(request.hostname(),'/Desempeno/Proceso/getEmailPorIdMatriz',objEmail);  
        var correo = result.body.data[0];
        console.log(correo);
        
        this.sendNotificacion(request,idEtapaTareaAccionProcesoPersona,codigoCab,codigoCuerpo,idEtapa, correo);
        return{mensaje:"ok"}       
    }

    //----<< OBSERVACIÓN


//---->> Visualizar METAS y competencias (SEGUN SOLICITADO POR BANMEDICA)
    async visualizar({ view, request, response, auth, session }) {
        var idPersona = session.get('idPersona', 'fail')
        var idEtapa = request.input("idEtapa")
        var idAccionPersona = request.input("idAccionPersona")
        var codigoActor = request.input("codigoActor")
        var idProceso = session.get('idProceso')
        var datosProceso = session.get('dataProceso')

        //DataVista
        var dataVista = {
            "idProceso" : idProceso,
            "idEtapa" : idEtapa,
            "idAccionPersona" : idAccionPersona,
            "codigoActor" : codigoActor
        }

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
        ////console.log(listaEval)
        //

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
        var resultObservacion =await api.execApi(request.hostname(),'/Desempeno/Accion/getObservacionAccionColaborador',objObservacion);
        var dataObservacion =resultObservacion.body.data;
        //console.log(objObservacion);

        var textoObservacion="";
        if (dataObservacion.length > 0){
            textoObservacion=dataObservacion[0].observacion
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
        return view.render('desempeno/metas/feedback/visualizar', {dataVista, datosTarea, Perso, listaEval,dataMetas,dataColumnas,dataObservacion,textoObservacion, instrumento: instrumento});
    }


    async publicar({ view, request, response, auth, session }) {
        var idPersona = session.get('idPersona', 'fail')
        var idEtapa = request.input("idEtapa")
        var idAccionPersona = request.input("idAccionPersona")
        var codigoActor = request.input("codigoActor")
        var idProceso = session.get('idProceso')
        var datosProceso = session.get('dataProceso')

        //DataVista
        var dataVista = {
            "idProceso" : idProceso,
            "idEtapa" : idEtapa,
            "idAccionPersona" : idAccionPersona,
            "codigoActor" : codigoActor
        }

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
       ////console.log(listaEval)
        //

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
        return view.render('desempeno/metas/feedback/publicar', {dataVista, datosTarea, Perso, listaEval,dataMetas,dataColumnas,dataObservacion,textoObservacion, instrumento: instrumento});
    }

    //----> CONFIRMAR METAS


    async confirmar({ view, request, response, auth, session }) {
        //console.log("AA");
        var idPersona = session.get('idPersona', 'fail')
        var idEtapa = request.input("idEtapa")
        var idAccionPersona = request.input("idAccionPersona")
        var codigoActor = request.input("codigoActor")
        var idProceso = session.get('idProceso')
        var datosProceso = session.get('dataProceso')
        
        //DataVista
        var dataVista = {
            "idProceso" : idProceso,
            "idEtapa" : idEtapa,
            "idAccionPersona" : idAccionPersona,
            "codigoActor" : codigoActor
        }

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
    ////console.log(listaEval)
        //
            
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
        var resultObservacion =await api.execApi(request.hostname(),'/Desempeno/Accion/getObservacionAccionColaborador',objObservacion);
        var dataObservacion =resultObservacion.body.data;
        //console.log(objObservacion);

        var textoObservacion="";
        if (dataObservacion.length > 0){
            textoObservacion=dataObservacion[0].observacion
        };
        
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
        return view.render('desempeno/metas/feedback/confirmar', {dataVista, datosTarea, Perso, listaEval,dataMetas,dataColumnas,dataObservacion,textoObservacion, instrumento: instrumento});


    }

    async addConfirmacionAccion({view,request, response}) {
        
        var idEtapaTareaAccionProcesoPersona= request.input('idEtapaTareaAccionProcesoPersona');
        var idEtapaTareaActor= request.input('idEtapaTareaActor');
        var valor= request.input('valor');
        var codigoCab = request.input('codigoCab');
        var codigoCuerpo = request.input('codigoCuerpo');
        var idEtapa = request.input('idEtapa');

        var obj = {
            "idEtapaTareaAccionProcesoPersona":idEtapaTareaAccionProcesoPersona,
            "idEtapaTareaActor":idEtapaTareaActor,
            "valor":valor
            
        };
        //console.log("VALOR: "+valor);
        var result = await api.execApi(request.hostname(),'/Desempeno/Accion/addConfirmacionAccion',obj);  

        //ESTO ES BAJO LA LOGICA DE BANMEDICA, PARAMETRIZAR SEGUN CADA CLIENTE.
        if(valor == "NO")
        {
            var objEmail = {
                "idEdeEtapaTareaAccionProcesoPersona":idEtapaTareaAccionProcesoPersona
            };
            console.log(objEmail);
            var result = await api.execApi(request.hostname(),'/Desempeno/Proceso/getEmailJefeEvaluado',objEmail);  
            var correo = result.body.data[0];
            //console.log(correo);
            this.sendNotificacion(request,idEtapaTareaAccionProcesoPersona,codigoCab,codigoCuerpo,idEtapa, correo);
        }

        return{mensaje:"ok"} 
    
    }


    async sendNotificacion(request, idMatriz, codigoCab, codigoCuerpo, idEtapa, email){
        var cliente = request.hostname().split(".")[0];
        //console.log(email.email);
        
        var objEmailCab = {
            "idEtapa":idEtapa,
            "codigo": codigoCab
        };
        
        var resultCab = await api.execApi(request.hostname(),'/Core/Core/getEmail',objEmailCab);  
        var correoCab = resultCab.body.data[0];

        var objEmailCuerpo = {
            "idEtapa":idEtapa,
            "codigo": codigoCuerpo
        };
        //console.log(correoCab);

        var resultCuerpo = await api.execApi(request.hostname(),'/Core/Core/getEmail',objEmailCuerpo);  
        var correoCuerpo = resultCuerpo.body.data[0];
        //console.log(resultCuerpo.body.data[0].valor);
        
        if(email != ""){
            var obj = {
                tag: cliente+ ' metas publicadas',
                to:email.email,
                subject:resultCab.body.data[0].valor,
                body:resultCuerpo.body.data[0].valor
            }; 

            var result = await api.execApiPost(request.hostname(),'/Mail/Mailgun/send',obj);
        }
        
        //if(email != ""){
        //    var obMail = new mail();
            //console.log(resultCab.body.data[0].valor);
        //    obMail.send(cliente+ ' metas publicadas', email.email, resultCab.body.data[0].valor, resultCuerpo.body.data[0].valor, request.hostname());
            //obMail.send(cliente+ ' metas publicadas', 'julio.montana@fch.cl', resultCab.body.data[0].valor, resultCuerpo.body.data[0].valor, request.hostname());
        //}
        //console.log(cliente);
    }
}

module.exports = Accion