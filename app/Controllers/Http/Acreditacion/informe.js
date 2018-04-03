'use strict'
const data = use('App/Utils/Data')
const got = use('got')

class Informe {
     async index  ({ view,request, response, auth }) {
        
        var obj = {
            "idProceso":"s",
            "procesoPersona": "2c58a181-2311-11e8-80db-bc764e10787e"
        };

        var resultSintesis = await data.execApi(request.hostname(),'/Acreditacion/Informe/getResultadoSistesis',obj);
        var resultadoSintesis = resultSintesis.body.data;

        var resultTCO = await data.execApi(request.hostname(),'/Acreditacion/Informe/getResultadoTCO',obj);
        var resultadoTCO = resultTCO.body.data;
       
        return view.render('acreditacion/informe/informesd', {sintesis:resultadoSintesis, resultadoTCO:resultadoTCO});
    }   
}

module.exports = Informe