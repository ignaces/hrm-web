'use strict'

const data = use('App/Utils/Data')
const XLSX = require('xlsx')
const Helpers = use('Helpers')
const fs = use('fs')
const Antl = use('Antl')
const readFile = Helpers.promisify(fs.readFile)
class Habilitacion {
     async index  ({ view,request, response, auth }) {
        var obj = {
            "idProceso":""
            
        };

        var result = await data.execApi(request.hostname(),'/Acreditacion/Proceso/getProcesos',obj);
        
        var procesosActivos = result.body.data.procesos;
      
        var objInactivos = {
            "idProceso":"",
            "activo": 0 
        };

        var result = await data.execApi(request.hostname(),'/Acreditacion/Proceso/getProcesos',objInactivos);
        
        var procesosInactivos = result.body.data.procesos;
       //console.log(procesosActivos)
        return view.render('acreditacion/habilitacion/index', {procesosActivos, procesosInactivos});
    }   
}

module.exports = Habilitacion