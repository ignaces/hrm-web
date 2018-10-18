'use strict'

const api = use('App/Utils/Data')

class Evaluacion {

    async portada ({view,request, response, auth, session}) {
        
        //Variables Entrada
        var idPersona = session.get('idPersona', 'fail');
        var idProceso = session.get('idProceso','fail');
        var dataProceso = session.get('dataProceso','fail');

        var idEtapa = request.input("idEtapa");
        var idEdeTarea = request.input("idEdeTarea");
        var idTareaEtapa = request.input("idTareaEtapa");
        // //console.log(idEtapa);
       // //console.log(idEdeTarea);
       // //console.log(idTareaEtapa);
        ////console.log(dataProceso)
        
        //Datos Etapa
        var objEtapa = {
            "idProceso":idProceso,
            "idEtapa":idEtapa
        };
        var resultEtapa=await api.execApi(request.hostname(),'/Desempeno/Proceso/getEtapas',objEtapa);
        var etapa =resultEtapa.body.data;
        //

        
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
        //       

        //Tareas
        var objTareas = {
            "idEtapa":idEtapa,
            "idTareaEtapa":idTareaEtapa
        };
        var resultTareas=await api.execApi(request.hostname(),'/Desempeno/Proceso/getTareasEtapas',objTareas);
        var tarea =resultTareas.body.data;      
        //
        // //console.log(tarea)

        


        return view.render('desempeno/evaluacion/portada',{dataProceso,etapa,datosMenu,PersonaEde,PersonaEde,tarea});
    }

}

module.exports = Evaluacion