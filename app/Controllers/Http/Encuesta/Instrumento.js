'use strict'

const data = use('App/Utils/Data')

class Instrumento {
    async putRespuesta({request,response}){

        var idOpinante = request.input("idOpinante")
        var idPregunta = request.input("idPregunta")
        var idAlternativa = request.input("idAlternativa")
        var justificacion = request.input("justificacion")
        var isChecked = request.input("isChecked")
        var obj = {
            "idEncuestaPersona":idOpinante,
            "idPregunta":idPregunta,
            "idAlternativa":idAlternativa,
            "justificacion":justificacion,
            "isChecked":isChecked
            };
            
        var result = await data.execApi(request.hostname(),'/Encuesta/Instrumento/putRespuesta',obj);
        var idFacsimil = request.input("idFacsimil");
        var avance = await data.execApi(request.hostname(),'/Evaluacion/Instrumento/getAvanceFacsimil',{idFacsimil:idFacsimil});

        var porcentaje =( avance.body.data.avance.Contestadas*100)/avance.body.data.avance.total;
        porcentaje = Math.round(porcentaje);
        return {mensaje:"OK",avance:`${porcentaje}`}
    }

    async validaCierre({request,response}){
        var idEncuestaPersona = request.input("idEncuestaPersona");

        var obj={
            idEncuestaPersona:idEncuestaPersona
        }
        var result = await data.execApi(request.hostname(),'/Encuesta/Instrumento/validaCierre',obj);

    return {mensaje:result.body.mensaje}
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