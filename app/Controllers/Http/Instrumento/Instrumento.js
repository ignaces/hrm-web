'use strict'
const data = use('App/Utils/Data')

class Instrumento {
     async index ({view,request, response, session}) {

        try{
            const all = request.all();
            var idProceso = session.get('idProceso', 'fail')
        


            var idOpinante = all.idOpinante
            var codigo = all.codigo
            var codigoComponente = all.codigoComponente
    
            var obj = {
                "idOpinante":idOpinante,
                "tipoInstrumento":codigo
            };
            console.log(obj)
            var result = await data.execApi(request.hostname(),'/Evaluacion/Instrumento/getInstrumento',obj);

            var instrumento = result.body;
            const todo = request.all();

            var idPersona = todo.idPersona
            
            var objeto = {
                "idPersona":idPersona,
                "idProceso":idProceso,
                "procesoPersona":""
            };

            var objetoInstruccion = {
                "codigo": codigo+"-"+codigoComponente,
                "vista": request.url()
            }

            //console.log(objetoInstruccion)

            var instruccion = await data.execApi(request.hostname(),'/Core/Core/getInstruccion',objetoInstruccion);
            var instruccionResult = instruccion.body.data;
            


            var resultado = await data.execApi(request.hostname(),'/Acreditacion/Proceso/getPersona',objeto);
            var clasificacion = resultado.body;


            var tipo = "CON";
            if(instrumento.competencias!=undefined){
            tipo =instrumento.competencias[0].codigo;
            } 
            var showIntro = false;

            if(instrumento.tipoInstrumento=="SOT" && tipo !="CON" && tipo!="EYH"){
                showIntro=true;
            }
            //return view.render('Instrumento/instrumento',  {persona:persona,instrumento:instrumento,idOpinante:idOpinante});
            return view.render('Instrumento/instrumento',  
                {
                    idProceso:idProceso,
                    clasificacion:clasificacion,
                    instrumento:instrumento,
                    idOpinante:idOpinante,
                    showIntro,
                    instruccion:instruccionResult
                }
            );
        } catch(e){
            console.log(e);
            return null;
        }
        
    }
    
   
    
    
    async putRespuesta({request,response, session}){

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


        var idPersona = session.get('idPersona', 'fall')

        if(idPersona != 'fall'){
            var objUpd = {
                idDndOpinante:idOpinante,
                idPersona: idPersona
            }

            var resultUpd = await data.execApi(request.hostname(),'/Acreditacion/Proceso/setOpinanteEvaluado',objUpd);
        }

        return {mensaje:"OK"}
    } 

    async putRespuestaMeta({request,response, session}){

        var idPregunta = request.input("idPregunta")
        var idAlternativa = request.input("idAlternativa")
        var justificacion = request.input("justificacion")
        
        var obj = {
            "idMeta":idPregunta,
            "idAlternativa":idAlternativa,
            "justificacion":justificacion,
            };
            
        var result = await data.execApi(request.hostname(),'/Desempeno/Metas/putRespuesta',obj);
        
        return {mensaje:"OK"}
    } 

    async putRespuestaEde({request,response, session}){

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
          
        //console.log(obj);
        var result = await data.execApi(request.hostname(),'/Desempeno/Proceso/putRespuesta',obj);

        /*
        var idPersona = session.get('idPersona', 'fall')

        if(idPersona != 'fall'){
            var objUpd = {
                idDndOpinante:idOpinante,
                idPersona: idPersona
            }

            var resultUpd = await data.execApi(request.hostname(),'/Acreditacion/Proceso/setOpinanteEvaluadoCS',objUpd);
        }
        */
        return {mensaje:"OK"}
    } 

    async saveEvaluacionEde({request,response, session}){

        var idOpinante  = request.input("idOpinante");
        var observacion = request.input("observacion");
        var finaliza    = request.input("finaliza");

        var obj = {
            "idOpinante":idOpinante,
            "observacion":observacion,
            "finaliza": finaliza
        };
          
        //console.log(obj);
        var result = await data.execApi(request.hostname(),'/Evaluacion/Instrumento/saveEvaluacionEde',obj);

        return {mensaje:"OK"}
    } 

    async getRespuestaCS({request,response, session}){

        //console.log(obj)
        var result = await data.execApi(request.hostname(),'/Acreditacion/Proceso/getRespuestaCS', {});
        console.log (result.body)
        return result.body;
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