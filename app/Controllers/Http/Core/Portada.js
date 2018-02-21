'use strict'

const data = use('App/Utils/Data')

class Portada {
     async welcome  ({ view,request, response, auth, session }) {
        

        var idPersona = session.get('idPersona', 'fall')
        var all =  session.get('personaLogueada')
        var idOpinante = all.id

        var obj = {
            "idProceso":""
        
        };

        var objTalento = {
            "idOpinante": idOpinante
        };

        var result = await data.execApi(request.hostname(),'/Acreditacion/Proceso/getProcesos',obj);
        var resultadoTalento = await data.execApi(request.hostname(),'/Talento/Talento/getTalentos',objTalento);

        var procesos = result.body.data.procesos;
        //var talentos = resultadoTalento.body;
        var talentos = resultadoTalento.body.data.talentos;
        var condicion = resultadoTalento.body.data1;

        console.log(talentos);
        console.log(condicion);
       
        //var rstl = session.put('totalCol',talentos.Total)
        //console.log(rstl);
       

        var user={usuario:auth.user}
        
        var persona = session.get('personaLogueada')
       

        return view.render('core/welcome',  {user,procesos,persona,talentos,condicion});
    }   
}

module.exports = Portada