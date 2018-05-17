'use strict'
const data = use('App/Utils/Data')

class Instrumento {
     async index ({view,request, response, session}) {

        const all = request.all();
        var idProceso = session.get('idProceso', 'fail')
       
        var idOpinante = all.idOpinante
        var codigo = all.codigo
        
console.log(idOpinante);
console.log(codigo);
 
        var obj = {
            "idOpinante":idOpinante,
            "tipoInstrumento":codigo
        };

        
        
        var result = await data.execApi(request.hostname(),'/Evaluacion/Instrumento/getInstrumento',obj);

        

        var instrumento = result.body;
        const todo = request.all();

        var idPersona = todo.idPersona
        
        var objeto = {
            "idPersona":idPersona,
            "idProceso":idProceso,
            "procesoPersona":""
        };

        

        var resultado = await data.execApi(request.hostname(),'/Acreditacion/Proceso/getPersona',objeto);
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