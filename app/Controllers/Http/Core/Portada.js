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
        var cargo="Evaluador FCH"
        var genero="F"
        var imageUser="/assets/images/icons/businessman.svg"
        if (genero=="F"){
            imageUser="/assets/images/icons/businesswoman.svg"
        }
        
        return view.render('core/welcome',  {user,cargo,genero,imageUser,procesos});
    }   
}

module.exports = Portada