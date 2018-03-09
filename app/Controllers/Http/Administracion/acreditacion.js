'use strict'
const data = use('App/Utils/Data')

class Acreditacion {
    async acreditacion  ({ view,request, response, auth }) {
        
        //console.log(auth.user.username)
        //console.log(auth.user.id)
        var obj = {
            "idProceso":""
            
        };

        var result = await data.execApi(request.hostname(),'/Acreditacion/Proceso/getProcesos',obj);
        
        var procesosActivos = result.body.data.procesos;
      
        var objInactivos = {
            "idProceso":"",
            "activo": 0 
        };

        var result = await data.execApi(request.hostname(),'/Acreditacion/Proceso/getProcesos',objInactivos);
        
        var procesosInactivos = result.body.data.procesos;
        //console.log(procesosInactivos);
        return view.render('/administracion/modulos/acreditacion/acreditacion', {procesosActivos, procesosInactivos});
    }

    async evaluadoProceso  ({ view, request, response, auth }) {
        
        const Env = use('Env')
        
        var server = Env.get('API_SERVER', 'development')
        
        var idPersonaProceso = request.input("id");
        var idProceso = request.input("idProc");
        
        var obj = {
            "idPersonaProceso":idPersonaProceso
        };
        console.log(obj)
        var result = await data.execApi(request.hostname(),'/Acreditacion/Proceso/getPersonaProceso',obj);

        var personaProceso = result.body.data.personaProceso[0];
        var instrumentosProceso = result.body.data.instrumentosProceso;
        var evaluacionesProceso = result.body.data.instrumentosProcesoEvaluado;
        
        obj = {
            "idProceso":idProceso
        };
        var result = await data.execApi(request.hostname(),'/Acreditacion/Proceso/getPersonas',obj);
        var personas = result.body.data.procesos;
        
        
<<<<<<< HEAD
        //console.log(personas);
=======
>>>>>>> efb1cd36d86025267b812ca1e35316bf7b96bb2f
        return view.render('/administracion/modulos/acreditacion/evaluadoProceso', {persona: personaProceso, instrumentos: instrumentosProceso, evaluaciones: evaluacionesProceso, personasProceso: personas});
    }

    async personas ({ view,request, response, auth }) {
        
        var idProceso = request.input("idProceso")

        var obj = {
            "idProceso":idProceso
        };
        
        var result = await data.execApi(request.hostname(),'/Acreditacion/Proceso/getPersonas',obj);
        var personas = result.body.data.procesos;
        
        var result = await data.execApi(request.hostname(),'/Acreditacion/Proceso/getPersonasFueraDelProceso',obj);
        var personasFueraDelProceso = result.body.data.procesos;
        
        var result = await data.execApi(request.hostname(),'/Acreditacion/Proceso/getPerfilesProceso',obj);
        var perfilesProceso = result.body.data.perfiles;
        
        
        return view.render('/administracion/modulos/acreditacion/personas', {personas, idProceso, personasFueraDelProceso, perfilesProceso});
    }

    async addPersonaProceso({request, response, auth})
    {
        var idProceso = request.input("idProceso");
        var idPerfil = request.input("idPerfil");
        var personas = request.input("personas");

        var obj = {
            idProceso: idProceso,
            idPerfil: idPerfil, 
            personas: personas
        };
        
        var result = await data.execApiPost(request.hostname(),'/Acreditacion/Proceso/addPersonaProceso',obj);
        //console.log(result);
    }

    async setOpinanteEvaluado({request, response, auth})
    {
        var idPersona = request.input("idPersona");
        var idDndOpinante = request.input("idDndOpinante");
        
        var obj = {
            idPersona: idPersona,
            idDndOpinante: idDndOpinante
        };
        //console.log(obj);
        var result = await data.execApiPost(request.hostname(),'/Acreditacion/Proceso/setOpinanteEvaluado',obj);
        //console.log(result);
    }
}

module.exports = Acreditacion