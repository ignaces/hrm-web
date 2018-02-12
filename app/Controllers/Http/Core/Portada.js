'use strict'

const data = use('App/Utils/Data')

class Portada {
     async welcome  ({ view,request, response, auth, session }) {
        

        var idPersona = session.get('idPersona', 'fall')
        var obj = {
            "idProceso":""
        
        };

        
        var result = await data.execApi(request.hostname(),'/Acreditacion/Proceso/getProcesos',obj);

        
        var procesos = result.body.data.procesos;
        var user={usuario:auth.user}
        
        var persona = session.get('personaLogueada')

        return view.render('core/welcome',  {user,procesos,persona});
    }   
}

module.exports = Portada