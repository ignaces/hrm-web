'use strict'

const data = use('App/Utils/Data')

class Portada {
     async welcome  ({ view,request, response, auth, session ,antl}) {
        

        var idPersona = session.get('idPersona', 'fall')
        var all =  session.get('personaLogueada')
        
        if(all==null){
            return view.render('account/login');
        }
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

        antl.switchLocale('pt')
         
       
        //var rstl = session.put('totalCol',talentos.Total)
        //console.log(rstl);
       
        obj={
            idProceso:"",
            idEstado:"1"
        }
        
        /*var reultEde=await data.execApi(request.hostname(),'/Desempeno/Proceso/getProcesos',obj);
        var procesosEde =reultEde.body.data;*/

        var user={usuario:auth.user}
        
        var persona = session.get('personaLogueada')
    
       
        var menu = session.get('usuario_roles_menu');
        var etag = "app_cs"
        return view.render('core/welcome',  {etag,user,procesos,persona,menu,talentos,condicion});

        
    }   
}

module.exports = Portada