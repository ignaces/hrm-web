'use strict'

const data = use('App/Utils/Data')

class Portada {
     async welcome  ({ view,request, response, auth, session }) {
        
        
        var idPersona = session.get('idPersona', 'fall')
        var all =  session.get('personaLogueada')
        //var idOpinante = all.id

        var obj = {
            "idProceso":""
            
        };

        /*var objTalento = {
            "idOpinante": idOpinante
        };
*/
        var result = await data.execApi(request.hostname(),'/Acreditacion/Proceso/getProcesos',obj);
        //var resultadoTalento = await data.execApi(request.hostname(),'/Acreditacion/Proceso/getTalentos',objTalento);

        var procesos = result.body.data.procesos;
        //var talentos = resultadoTalento.body;
        //var rstl = session.put('totalCol',talentos.Total)
        //console.log(rstl);
       
        obj={
            
        }
        
        var resultpos = await data.execApiPost(request.hostname(),'/Incentivos/Incentivos/getPuntosDeVenta', obj);
        var puntosDeVenta = resultpos.body;

        obj={
            idPersona: idPersona,
            idPuntoDeVenta: ""    
        }

        var resultcheckin = await data.execApiPost(request.hostname(),'/Incentivos/Incentivos/getCheckIn', obj);
        
        var checkin = "";

        if(resultcheckin.body[0])
        {
            checkin = resultcheckin.body[0].checkin;        
            session.put("idPuntoDeVenta", resultcheckin.body[0].idPuntoDeVenta);
        }
        
        //console.log(session.get("idPuntoDeVenta"));
        /*var reultEde=await data.execApi(request.hostname(),'/Desempeno/Proceso/getProcesos',obj);
        var procesosEde =reultEde.body.data;*/

        var user={usuario:auth.user}
        
        var persona = session.get('personaLogueada')
        //console.log(persona);
       
        var menu = session.get('usuario_roles_menu');
        return view.render('core/welcome',  {user,procesos,persona,menu, puntosDeVenta, checkin});
    }   
}

module.exports = Portada