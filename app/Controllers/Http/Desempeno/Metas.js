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
        console.log(listaEval)

         //Lista Supe
         var objSupe={
            "idEtapa":idEtapa,
	        "idPersonaActor":idPersona,
	        "codigoActor":"SUPE",
        }
        var resultSupe=await api.execApi(request.hostname(),'/Desempeno/Proceso/getListaEvaluados',objSupe);
        var listaSupe =resultSupe.body.data;      
        //
        console.log(listaSupe)

        return view.render('desempeno/etapa',{datosProceso,PersonaEde,datosMenu,etapa,listaEval,listaSupe});
    }

    //FIN --- PUBLICACION METAS (FEEDBACK CON OBSERVACIÓN)


}

module.exports = Meta