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
       // var resultadoTalento = await data.execApi(request.hostname(),'/Acreditacion/Proceso/getTalentos',objTalento);

        var procesos = result.body.data.procesos;
       // var talentos = resultadoTalento.body;
        
       

        var user={usuario:auth.user}
        
        var persona = session.get('personaLogueada')

        return view.render('core/welcome',  {user,procesos,persona});
    }   
}

module.exports = Portada