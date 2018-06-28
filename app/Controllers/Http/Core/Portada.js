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
        var talentos = [];
        var condicion = [];
        try{
            var resultadoTalento = await data.execApi(request.hostname(),'/Talento/Talento/getTalentos',objTalento);
            talentos = resultadoTalento.body.data.talentos;
            condicion = resultadoTalento.body.data1;
        }catch(e){
            
        }
        

        var procesos = result.body.data.procesos;
        //var talentos = resultadoTalento.body;
        
        

        antl.switchLocale('es')
         
       
        //var rstl = session.put('totalCol',talentos.Total)
        //console.log(rstl);
       
        obj={
            idProceso:"",
            idEstado:"ACTIVO"
        }
        
        var reultEde=await data.execApi(request.hostname(),'/Desempeno/Proceso/getProcesos',obj);
        var procesosEde =reultEde.body.data;

        var user={usuario:auth.user}
        
        var persona = session.get('personaLogueada')
    
       
        var menu = session.get('usuario_roles_menu');
        var cliente = request.hostname().split(".")[0]
<<<<<<< HEAD
        //var etag = `app_${cliente}`
        var etag = `app_hrmdev`
=======
        if(cliente=="localhost"){
            cliente="hrmdev"
        }
        var etag = `app_${cliente}`
>>>>>>> 2b163ee5b82e057973f93f5facafcc88b38a37e8

        return view.render('core/welcome',  {etag,user,procesos,persona,menu,talentos,condicion,procesosEde});

        
    }   
}

module.exports = Portada