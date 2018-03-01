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

    async personas ({ view,request, response, auth }) {
        
        var idProceso = request.input("idProceso")

        //session.put('idProceso',idProceso);

        var obj = {
            "idProceso":idProceso
        };
        
        var result = await data.execApi(request.hostname(),'/Acreditacion/Proceso/getPersonas',obj);
        var personas = result.body.data.procesos;
        
        var result = await data.execApi(request.hostname(),'/Acreditacion/Proceso/getPersonasFueraDelProceso',obj);
        var personasFueraDelProceso = result.body.data.procesos;
        
        var result = await data.execApi(request.hostname(),'/Acreditacion/Proceso/getPerfilesProceso',obj);
        var perfilesProceso = result.body.data.perfiles;
        
        //console.log(personas);
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
        console.log(obj);
        var result = await data.execApiPost(request.hostname(),'/Acreditacion/Proceso/addPersonaProceso',obj);
        //console.log(result);
    }
}

module.exports = Acreditacion