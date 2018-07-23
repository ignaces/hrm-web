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

        

        var miPerfil = await data.execApi(request.hostname(),'/Core/Componentes/getComponente',{componente:'MI_PERFIL'});
        var perfilResult = miPerfil.body.data;

        
        
        if(perfilResult.length>0){
            perfilResult[0].ruta = perfilResult[0].ruta.replace("#idPersona",all.id)
        }
        
        var mensaje = await data.execApi(request.hostname(),'/Core/Empresa/getMensaje',{});
        var mensajeResult =mensaje.body.data;
        
        var result = await data.execApi(request.hostname(),'/Acreditacion/Proceso/getProcesos',obj);
        var talentos = [];

        
        
        var condicion = [];
        
        var procesos = result.body.data.procesos;
        
        var talentos = "";

        try{
            var resultadoTalento = await data.execApi(request.hostname(),'/Talento/Talento/getTalentos',objTalento);
            talentos = resultadoTalento.body.data.talentos;
            condicion = resultadoTalento.body.data1;

            
            var talentos = resultadoTalento.body;
        }catch(e){
            
        }
        

        
        
        

        antl.switchLocale('es')
         
       
        var rstl = session.put('totalCol',talentos.Total)
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
        if(cliente=="localhost"){
            cliente="hrmdev"
        }
        var etag = `app_${cliente}`

        var texto = "";
        var mensajeTitulo = "";
        if(mensajeResult.length > 0)
        {
            texto = mensajeResult[0].texto;
            mensajeTitulo = mensajeResult[0].titulo;
        }
        
        return view.render('core/welcome',  {etag,user,procesos,persona,menu,talentos,condicion,procesosEde,mensaje:texto,mensajeTitulo,miperfil:perfilResult});
    }   
}

module.exports = Portada