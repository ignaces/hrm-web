'use strict'

    const data = use('App/Utils/Data')
    
    class Avance {
         async index  ({ view,request, response, auth, session }) {

            var result = await data.execApi(request.hostname(),'/Engagement/Periodo/list',{});

            const periodos = result.body;

            return view.render('engagement/avance/index',  {periodos:periodos});
        
        } 

        async empresasPeriodo({ view,request, response, auth, session }){
            var idPeriodo = request.input("idPeriodo");
            
            var result = await data.execApi(request.hostname(),'/Engagement/Empresa/list',{idPeriodo:idPeriodo});

            const empresas = result.body;
             
           return empresas;
        }
        async encuesta  ({ view,request, response, auth, session }) {
            var id = request.input("idEncuestaAplicacion");
            
            var resumen = await data.execApi(request.hostname(),'/Encuesta/Avance/getAvanceResumen',{idEncuestaAplicacion:id});  
            var detalleClasificaciones = await data.execApi(request.hostname(),'/Engagement/Empresa/getAvanceClasificaciones',{idEncuestaAplicacion:id});  

            return view.render('encuesta/avance/index',  {
                resumen:resumen.body,
                idEncuestaAplicacion:id,
                clasificaciones:detalleClasificaciones
            });
          
        } 
    }
      
    module.exports = Avance