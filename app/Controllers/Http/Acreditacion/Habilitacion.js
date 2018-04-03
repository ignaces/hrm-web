'use strict'

const data = use('App/Utils/Data')
const XLSX = require('xlsx')
const Helpers = use('Helpers')
const fs = use('fs')
const Antl = use('Antl')
const readFile = Helpers.promisify(fs.readFile)
class Habilitacion {
     async index  ({ view,request, response, auth }) {
        var conDetalle = request.input("cd");
        var obj = {
            "procesoPersona": request.input("procesoPersona")
        };

        var resultSintesis = await data.execApi(request.hostname(),'/Acreditacion/Informe/getResultadoSistesis',obj);
        var resultadoSintesis = resultSintesis.body.data;

        var resultTCO = await data.execApi(request.hostname(),'/Acreditacion/Informe/getResultadoTCO',obj);
        var resultadoTCO = resultTCO.body.data;
       
        return view.render('acreditacion/habilitacion/index', {sintesis:resultadoSintesis, resultadoTCO:resultadoTCO,conDetalle});
    }   
}

module.exports = Habilitacion