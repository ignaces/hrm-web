'use strict'

const data = use('App/Utils/Data')

class Instrumento {
    async putRespuesta({request,response}){

        var idOpinante = request.input("idOpinante")
        var idPregunta = request.input("idPregunta")
        var idAlternativa = request.input("idAlternativa")
        var justificacion = request.input("justificacion")
        
        var obj = {
            "idEncuestaPersona":idOpinante,
            "idPregunta":idPregunta,
            "idAlternativa":idAlternativa,
            "justificacion":justificacion,
            };
            
        var result = await data.execApi(request.hostname(),'/Encuesta/Instrumento/putRespuesta',obj);

        return {mensaje:"OK"}
    }

    async cerrarInstrumento({request,response}){
            var idEncuestaPersona = request.input("idEncuestaPersona");
            var obj={
                idEncuestaPersona:idEncuestaPersona
            }
            var result = await data.execApi(request.hostname(),'/Encuesta/Instrumento/cerrarInstrumento',obj);

        return {mensaje:"OK"}
    }
}
module.exports=Instrumento 