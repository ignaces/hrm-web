'use strict'

const api = use('App/Utils/Data')

class Accion {

    //---->> PUBLICAR METAS

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
       //console.log(listaEval)
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
        //console.log(dataColumnas);

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
        console.log(dataObservacion);

        var textoObservacion="";
        if (dataObservacion.lenght > 0){
            textoObservacion=dataObservacion[0].observacion
        };


        //RENDER
        return view.render('desempeno/metas/feedback/publicar', {dataVista, datosTarea, Perso, listaEval,dataMetas,dataColumnas,dataObservacion,textoObservacion});
    }

   


    //----<< PUBLICAR METAS

    //---->> OBSERVACIÓN

    async addObservacionAccion({view,request, response}) {
       
        var idEtapaTareaAccionProcesoPersona= request.input('idEtapaTareaAccionProcesoPersona');
        var idEtapaTareaActor= request.input('idEtapaTareaActor');
        var observacion= request.input('observacion');
        
        var obj = {
            "idEtapaTareaAccionProcesoPersona":idEtapaTareaAccionProcesoPersona,
            "idEtapaTareaActor":idEtapaTareaActor,
            "idAobservacionctor":observacion
            
        };

        var result = await api.execApi(request.hostname(),'/Desempeno/Accion/addObservacionAccion',obj);  

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
            "idAobservacionctor":observacion
            
        };

        var result = await api.execApi(request.hostname(),'/Desempeno/Accion/updObservacionAccion',obj);  

        return{mensaje:"ok"} 
      
    }

    //----<< OBSERVACIÓN

}

module.exports = Accion