'use strict'
const data = use('App/Utils/Data')

class Instrumento {
     async index ({view,request, response}) {

        const all = request.all();
        var idOpinante = all.idOpinante
        var codigo = all.codigo
        
        var obj = {
            "idOpinante":idOpinante,
            "tipoInstrumento":codigo
        };
        var result = await data.execApi(request.hostname(),'/Evaluacion/Instrumento/getInstrumento',obj);

       
        var persona = {
            nombre:"Juan Alberto Gonzales Olivares",
            cargo:"Cargo x",
            perfilCargo:"Maestro OOCC Empalmes",
            contratista:"Cobra"
        };
        
        var instrumento = result.body;
        return view.render('Instrumento/instrumento',  {persona:persona,instrumento:instrumento,idOpinante:idOpinante});
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