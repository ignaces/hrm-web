'use strict'

const data = use('App/Utils/Data')

class Persona {
    

    async fichaCompromiso ({view,request, response, auth, session}) {
        
        var idPersona = request.input('idPersona')
        
        var obj = {
            "idPersona":idPersona,
            "idProceso":session.get('procesoOrganigrama')
        };
        
        var resultPersona =  await data.execApi(request.hostname(),'/Talento/Persona/getPersona',obj);
        var resultPlanDesarrollo =  await data.execApi(request.hostname(),'/Talento/Accion/getPlanDesarrollo',obj);
        
        var resultAcciones =  await data.execApi(request.hostname(),'/Talento/Accion/getAccionesPredefinidas',{});
        
        var resultCompetencias =  await data.execApi(request.hostname(),'/Talento/Accion/getCompetencias',{});
        var persona = resultPersona.body;

        console.log(resultPlanDesarrollo.body)
        return view.render('talento/fichaCompromiso' ,  {
                persona:persona[0], 
                idPersona:idPersona,
                accionesPredefinidas:resultAcciones.body,
                competencias:resultCompetencias.body,
                planDesarrollo:resultPlanDesarrollo.body
            });
    }

    async getPosiblesSucesores ({view,request, response, auth, session}) {
        
        var idPosicion = request.input('idPosicion')
        var idPersona = request.input('idPersona')
        var obj = {
            "idPosicion":idPosicion,
            "idProceso":session.get('procesoOrganigrama')
        };
        
        var result =  await data.execApi(request.hostname(),'/Talento/Persona/getPosiblesSucesores',obj);
        
       
        var posiciones = result.body;

       
        response.json(posiciones);
    }
    async addAccion ({view,request, response, auth, session}) {
        
        var accion = request.get('acciones')
        var idPlan = request.input('idPlan')
       
        var obj = {
        
            "accion":accion,
            "idPlan":idPlan,
            "idProceso":session.get('procesoOrganigrama')
        };
        
        var result =  await data.execApiPost(request.hostname(),'/Talento/Accion/addAccion',obj);
        
        var resultPlanDesarrollo =  await data.execApi(request.hostname(),'/Talento/Accion/getPlanDesarrolloById',obj);
        var acciones = resultPlanDesarrollo.body.acciones;

       
        response.json(acciones);
    }

}
module.exports = Persona