'use strict'

const data = use('App/Utils/Data')

class Marketplace {
    
    async posiblesVacantes({view,request, response, auth, session}){
        var persona =  session.get('personaLogueada')
        
        var obj = {
            "idProceso":session.get('procesoOrganigrama'),
            "idPersonaOpinante":persona.id
        };
        var result = await data.execApi(request.hostname(),'/Talento/Marketplace/posiblesVacantes',obj);
        var orgChart = result.body;
        return orgChart;

    }
    async vacantesActuales({view,request, response, auth, session}){
        var persona =  session.get('personaLogueada')
        
        var obj = {
            "idProceso":session.get('procesoOrganigrama'),
            "idPersonaOpinante":persona.id
        };
        var result = await data.execApi(request.hostname(),'/Talento/Marketplace/vacantes',obj);
        var orgChart = result.body;
        return orgChart;

    }
    async talentos({view,request, response, auth, session}){
        var persona =  session.get('personaLogueada')
        
        var obj = {
            "idProceso":session.get('procesoOrganigrama'),
            "idPersonaOpinante":persona.id
        };
        var result = await data.execApi(request.hostname(),'/Talento/Marketplace/talentos',obj);
        var orgChart = result.body;
        return orgChart;

    }
}
module.exports = Marketplace