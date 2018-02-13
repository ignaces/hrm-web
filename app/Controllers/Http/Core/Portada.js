'use strict'

const data = use('App/Utils/Data')

class Portada {
     async welcome  ({ view,request, response, auth, session }) {
        

        var idPersona = session.get('idPersona', 'fall')
        var obj = {
            "idProceso":""
        };

        var objTalento = {
            "idTalento":"6b4071d1-0ff1-11e8-bf12-bc764e100f2b"
        };

        var result = await data.execApi(request.hostname(),'/Acreditacion/Proceso/getProcesos',obj);
        var resultadoTalento = await data.execApi(request.hostname(),'/Acreditacion/Proceso/getTalentos',objTalento);

        var procesos = result.body.data.procesos;
        var talentos = resultadoTalento.body;
        
       

        var user={usuario:auth.user}
        var cargo="Evaluador FCH"
        var genero="F"
        var imageUser="/assets/images/icons/businessman.svg"
        if (genero=="F"){
            imageUser="/assets/images/icons/businesswoman.svg"
        }
        
        return view.render('core/welcome',  {user,cargo,genero,imageUser,procesos,talentos});
    }   
}

module.exports = Portada