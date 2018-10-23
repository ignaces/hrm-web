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
        
        var obj = {
            "idEtapaTareaAccionProcesoPersona":idEtapaTareaAccionProcesoPersona,
            "idEtapaTareaActor":idEtapaTareaActor,
            "observacion":observacion
        };

        var result = await api.execApi(request.hostname(),'/Desempeno/Accion/addObservacionAccionFinalizar',obj);  
        this.sendNotificacion(request,idEtapaTareaAccionProcesoPersona);
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
        
        var obj = {
            "idObservacionAccion":idObservacionAccion,
            "idEtapaTareaAccionProcesoPersona":idEtapaTareaAccionProcesoPersona,
            "idEtapaTareaActor":idEtapaTareaActor,
            "observacion":observacion
            
        };

        var result = await api.execApi(request.hostname(),'/Desempeno/Accion/updObservacionAccionFinalizar',obj);  
        this.sendNotificacion(request,idEtapaTareaAccionProcesoPersona);
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
            console.log(e);
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
            console.log(e);
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
            console.log(e);
        }
        

        var instrumento = result.body;

        //RENDER
        return view.render('desempeno/metas/feedback/confirmar', {dataVista, datosTarea, Perso, listaEval,dataMetas,dataColumnas,dataObservacion,textoObservacion, instrumento: instrumento});


    }

    async addConfirmacionAccion({view,request, response}) {
        
        var idEtapaTareaAccionProcesoPersona= request.input('idEtapaTareaAccionProcesoPersona');
        var idEtapaTareaActor= request.input('idEtapaTareaActor');
        var valor= request.input('valor');
        
        var obj = {
            "idEtapaTareaAccionProcesoPersona":idEtapaTareaAccionProcesoPersona,
            "idEtapaTareaActor":idEtapaTareaActor,
            "valor":valor
            
        };
        var result = await api.execApi(request.hostname(),'/Desempeno/Accion/addConfirmacionAccion',obj);  

        return{mensaje:"ok"} 
    
    }


    async sendNotificacion(request, idMatriz){
        var cliente = request.hostname().split(".")[0];

        var obj = {
            "idEdeEtapaTareaAccionProcesoPersona":idMatriz
        };

        var result = await api.execApi(request.hostname(),'/Desempeno/Proceso/getEmailPorIdMatriz',obj);  
        var correo = result.body.data[0];

        if(correo.email != ""){
            var obMail = new mail();
            var html = `<p>Estimado(a) COLABORADOR</p>
                <p>&nbsp;</p>
                <p>Tu jefatura indic&oacute; que ya realizaron la reuni&oacute;n de retroalimentaci&oacute;n.</p>
                <p>Para continuar con el proceso, debes ingresar a&nbsp;<a href="http://`+cliente+`.enovum.cl">http://`+cliente+`.enovum.cl</a>&nbsp;para confirmar la reuni&oacute;n y asi finalizar tu proceso de evaluaci&oacute;n de desempe&ntilde;o.</p>
                <p>Saludos.</p>
                <p>Gerencia de Personas.</p>`;
            obMail.send(cliente+ ' metas publicadas', correo.email, 'Notificación', html, request.hostname());
            //obMail.send(cliente+ ' metas publicadas', 'jonathan.olivares@fch.cl', 'Notificación', html, request.hostname());
        }

        //console.log(cliente);
    }


}

module.exports = Accion