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
        var resultadoTalento = await data.execApi(request.hostname(),'/Acreditacion/Proceso/getTalentos',objTalento);

        var procesos = result.body.data.procesos;
        var talentos = resultadoTalento.body;

        //var totalColaboradores = talentos.Total;
        //session.put('Total', talentos.Total)
        //console.log(TotalCount);
        //console.log(talentos.Total);
        
        
       

        var user={usuario:auth.user}
        
        var persona = session.get('personaLogueada')
       

        return view.render('core/welcome',  {user,procesos,persona,talentos});
    }   
}

module.exports = Portada