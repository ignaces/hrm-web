'use strict'
const data = use('App/Utils/Data')

class Instrumento {
     async index ({view,request, response, session}) {

        const all = request.all();
        var idProceso = session.get('idProceso', 'fail')
       
        var idOpinante = all.idOpinante
        var codigo = all.codigo
        
        var obj = {
            "idOpinante":idOpinante,
            "tipoInstrumento":codigo
        };
        
        var result = await data.execApi(request.hostname(),'/Evaluacion/Instrumento/getInstrumento',obj);

        
       /*
        var persona = {
            titulo:"IDENTIFICACIÓN",
            nombre:"Juan",
            apellidoP:"Rivas",
            apellidoM:"Palma",
            rut:"18493148-3",
            cargo:"Contratista",
            perfilCargo:"Encargado",

               clasificacion :  [{
                  nombre:"Clasificación 1",
                  valor:"x1x1",
                  
              },
              {
                nombre:"Clasificación 2",
                valor:"x2x2"
            },
        {
            nombre:"Clasificación 3",
                valor:"x3x3"

        }]    
        };
        */
       

        var instrumento = result.body;
        

        const todo = request.all();

        var idPersona = todo.idPersona
        
        var objeto = {
            "idPersona":idPersona
        };

        var resultado = await data.execApi(request.hostname(),'/Persona/Persona/getPersona',objeto);
        var clasificacion = resultado.body;
       
        
       
        //return view.render('Instrumento/instrumento',  {persona:persona,instrumento:instrumento,idOpinante:idOpinante});
        return view.render('Instrumento/instrumento',  {idProceso:idProceso,clasificacion:clasificacion,instrumento:instrumento,idOpinante:idOpinante});
    }
    
   
    
    
    async putRespuesta({request,response}){

        var idOpinante = request.input("idOpinante")
        var idPregunta = request.input("idPregunta")
        var idAlternativa = request.input("idAlternativa")
        var justificacion = request.input("justificacion")
        
        var obj = {
            "idOpinante":idOpinante,
            "idPregunta":idPregunta,
            "idAlternativa":idAlternativa,
            "justificacion":justificacion,
            };
            
        var result = await data.execApi(request.hostname(),'/Acreditacion/Proceso/putRespuesta',obj);

        return {mensaje:"OK"}
    } 

    async cerrarInstrumento({request,response}){

        var idOpinante = request.input("idOpinante")
        
        var obj = {
            "idOpinante":idOpinante
            };
        var result = await data.execApi(request.hostname(),'/Acreditacion/Proceso/cerrarEvaluacion',obj);

        return {mensaje:"OK"}
    } 
    
    historia ({view,request,response}){
        
         
         var historial = [{
             descripcion:""
         }];
        return view.render('persona/historia',  {historial:historial}); 
    }
    historia2 ({view,request,response}){
     
        
        var historial = [{
            descripcion:""
        }];
       return view.render('persona/historia',  {historial:historial}); 
   }
}

module.exports = Instrumento