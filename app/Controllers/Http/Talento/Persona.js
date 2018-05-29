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
       
       
        var persona = resultPersona.body;

       
        return view.render('talento/fichaCompromiso' ,  {persona:persona[0], idPersona:idPersona});
    }

    async getPosiblesSucesores ({view,request, response, auth, session}) {
        
        var idPosicion = request.input('idPosicion')
        
        var obj = {
            "idPosicion":idPosicion,
            "idProceso":session.get('procesoOrganigrama')
        };
        
        var result =  await data.execApi(request.hostname(),'/Talento/Persona/getPosiblesSucesores',obj);
        
       
        var posiciones = result.body;

       
        response.json(posiciones);
    }

}
module.exports = Persona