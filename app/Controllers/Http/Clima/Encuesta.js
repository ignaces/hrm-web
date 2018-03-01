'use strict'
const data = use('App/Utils/Data')
const uuidv4 = require('uuid/v4');
const XLSX = require('xlsx');
var Enumerable = require('linq');
class Encuesta {
    async index({view,request, response}) {
        var obj = {
            idCliente:""
        };
        
        return view.render('encuesta/index',  {idEncuestaAplicacion:"f7216ef8-1c03-11e8-bf12-bc764e100f2b"});
    }
}
module.exports = Encuesta 