'use strict'

const api = use('App/Utils/Data')

class Proceso {
    
    async portada ({view,request, response, auth, session}) {
        
        var idPersona = session.get('idPersona', 'fail')
        var idProceso = request.input("idProceso")
        //console.log(request.all());
        session.put('idProceso',idProceso);

        //Datos Proceso
        var objDatosProceso = {
            "idProceso":idProceso,
            idEstado:""
        };
        var resultProceso =await api.execApi(request.hostname(),'/Desempeno/Proceso/getProcesos',objDatosProceso);
        var datosProceso =resultProceso.body.data[0];

        session.put('dataProceso',datosProceso)
        //console.log(datosProceso);

        //Etapas Proceso
        var objEtapasProceso = {
            "idProceso":idProceso,
            "idEtapa":""
        };
        var resultEtapasProceso=await api.execApi(request.hostname(),'/Desempeno/Proceso/getEtapas',objEtapasProceso);
        var etapasProceso =resultEtapasProceso.body.data;
        console.log(etapasProceso);

        //Menu Contextual
        var objMenuContextual = {
            "idProceso":idProceso,
            idEstado:"1"
        };
        var resultMenu =await api.execApi(request.hostname(),'/Desempeno/Proceso/getMenuUsuario',objMenuContextual);
        var datosMenu =resultMenu.body.data;
        //

        //Datos Persona
        var user={usuario:auth.user}
        var persona = session.get('personaLogueada')

        var objdatosPersona = {
            "idProceso":idProceso,
            "idPersona":idPersona
        };
        
        var resultPersonaEde =await api.execApi(request.hostname(),'/Desempeno/Proceso/getProcesoPersona',objdatosPersona);
        var PersonaEde =resultPersonaEde.body.data;
        //console.log(PersonaEde)
        //
        //Etapa
        var objEtapa = {
            "idProceso":idProceso,
            "idEtapa":""
        };
        var resultEtapa=await api.execApi(request.hostname(),'/Desempeno/Proceso/getEtapas',objEtapa);
        var etapa =resultEtapa.body.data;
        //

        //Tareas
        var objTareas = {
            "idEtapa":"76aad0d8-52fe-11e8-8fb3-bc764e100f2b",
            "idTareaEtapa":""
        };
        var resultTareas=await api.execApi(request.hostname(),'/Desempeno/Proceso/getTareasEtapas',objTareas);
        var tareas =resultTareas.body.data;      
        //


        return view.render('desempeno/portada',{etapasProceso,datosMenu,persona,PersonaEde,datosProceso,etapa,tareas});
    }


    async getTareasEtapa({view,request, response, auth, session}){

        var idProceso = request.input("idProceso");
        var idEtapa = request.input("idEtapa");
        //Etapa
        var objEtapa = {
            "idProceso":idProceso,
            "idEtapa":idEtapa
        };
        var resultEtapa=await api.execApi(request.hostname(),'/Desempeno/Proceso/getEtapas',objEtapa);
        var etapa =resultEtapa.body.data;
        //

        //Tareas
        var objTareas = {
            "idEtapa":idEtapa,
            "idTareaEtapa":""
        };
        var resultTareas=await api.execApi(request.hostname(),'/Desempeno/Proceso/getTareasEtapas',objTareas);
        var tareas =resultTareas.body.data;

        etapa.tareas=tareas;
        return etapa;
    }


    async etapa ({view,request, response, auth, session}) {
        var idPersona = session.get('idPersona', 'fail')
        var idEtapa = request.input("idEtapa")
        var idProceso = session.get('idProceso')
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
            "idAccionPersona":""
        }
        var resultEval=await api.execApi(request.hostname(),'/Desempeno/Proceso/getListaEvaluados',objEval);
        var listaEval =resultEval.body.data;      
        //
        
         //Lista Supe
         var objSupe={
            "idEtapa":idEtapa,
	        "idPersonaActor":idPersona,
            "codigoActor":"SUPE",
            "idAccionPersona":""
        }
        var resultSupe=await api.execApi(request.hostname(),'/Desempeno/Proceso/getListaEvaluados',objSupe);
        var listaSupe =resultSupe.body.data;      
        //
        
        return view.render('desempeno/etapa',{datosProceso,PersonaEde,datosMenu,etapa,listaEval,listaSupe});
    }

}

module.exports = Proceso