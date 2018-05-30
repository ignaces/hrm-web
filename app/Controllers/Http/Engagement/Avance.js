'use strict'

    const data = use('App/Utils/Data')
    var Enumerable = require('linq');
    class Avance {
         async index  ({ view,request, response, auth, session }) {

            var result = await data.execApi(request.hostname(),'/Engagement/Periodo/list',{});

            const periodos = result.body;

            return view.render('engagement/avance/index',  {periodos:periodos});
        
        } 

       
        async encuesta  ({ view,request, response, auth, session }) {
            var id = request.input("idEncuestaAplicacion");
            
            var resumen = await data.execApi(request.hostname(),'/Encuesta/Avance/getAvanceResumen',{idEncuestaAplicacion:id});  
            
            var detalleClasificaciones = await data.execApi(request.hostname(),'/Engagement/Empresa/getAvanceClasificaciones',{idEncuestaAplicacion:id});  
            
            
            
            var clasificaciones =Enumerable.from(detalleClasificaciones.body).distinct("$.id").select(function(clasificacion){
                                        return{
                                            id:clasificacion.id,
                                            nombre:clasificacion.nombre,
                                            niveles:Enumerable.from(clasificacion.niveles).distinct("$.id").select(function(nivel){
                                                        return nivel.nombre
                                                        
                                                    }).toArray(),
                                            estados:Enumerable.from(clasificacion.niveles[0].estados).select(function(estado){
                                                
                                                        return{
                                                            texto:estado.texto,
                                                            color:estado.color,
                                                            class:estado.class,
                                                            codigo:estado.codigo,
                                                            data:Enumerable.from(clasificacion.niveles).select(function(data){
                                                                var cantidad = 0;
                                                                for(var i in data.estados){

                                                                    if(data.estados[i].codigo==estado.codigo){
                                                                        
                                                                        cantidad= data.estados[i].cantidad
                                                                    }
                                                                }

                                                                return cantidad;
                                                                
                                                                
                                                                
                                                            }).toArray(),
                                                        }
                                                    }).toArray(),
                                            

                                        }
                                 }).toArray();
            
            


            return view.render('encuesta/avance/index',  {
                resumen:resumen.body,
                idEncuestaAplicacion:id,
                clasificaciones:clasificaciones
            });
          
        } 
    }
      
    module.exports = Avance