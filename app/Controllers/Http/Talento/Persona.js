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
console.log(persona)
       
        return view.render('talento/fichaCompromiso' ,  {persona:persona[0], idPersona:idPersona});
    }

}
module.exports = Persona