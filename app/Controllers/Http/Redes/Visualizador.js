'use strict'
const got = use('got')
const XLSX = require('xlsx');
const Helpers = use('Helpers');
const fs = use('fs');
const Antl = use('Antl');
var safeUrl = require('safe-url');
var wget = require('node-wget-promise');
const readFile = Helpers.promisify(fs.readFile);
const data = use('App/Utils/Data')

class Visualizador {
    async viewApps({view,request,response,params}){
        var obj={};
        var apps = await data.execApi(request.hostname(),'/Redes/Medicion/getAplicaciones',obj);
        console.log(apps.body);

        return view.render('redes/aplicaciones',{aplicaciones:apps.body});
    }
    
    async viewGraph({view,request,response,params}){

        var obj={};
        var participantes = {};
        var preguntas = {};

        var idAplicacion = request.input("idAplicacion");
        
        //idAplicacion = "4771dc31-2621-11e8-80db-bc764e10787e";
        var idPersona = 0;
        var idRelacion = 0;
        var sentido = 0;

        if(request.input("id"))
        {
            obj.id = request.input("id");
            idPersona = request.input("id");
        }

        if(request.input("relacion"))
        {
            obj.relacion = request.input("relacion");
            idRelacion = request.input("relacion");
        }
        
        if(request.input("sentido"))
        {
            obj.sentido = request.input("sentido");
            sentido = request.input("sentido");
        }
        else
        {
            obj.sentido = 0;
        }

        obj.idAplicacion = idAplicacion;
        participantes.idAplicacion = idAplicacion;
        preguntas.idAplicacion = idAplicacion;

        var graph = await data.execApi(request.hostname(),'/Redes/Medicion/getGraph',obj);
        var participantes = await data.execApi(request.hostname(),'/Redes/Medicion/getParticipantes',participantes);
        var preguntas = await data.execApi(request.hostname(),'/Redes/Medicion/getPreguntas',preguntas);
        var clasificaciones = await data.execApi(request.hostname(),'/Redes/Medicion/getClasificaciones', {});
        
        //console.log(preguntas.body);
        //console.log(graph.body.nodes);
        var idCodigo = 0;
        var sentido = 0;

        if(request.input("id")!="0")
        {
            idCodigo = request.input("id");
        }

        if(request.input("sentido"))
        {
            sentido = request.input("sentido");
        }

        return view.render('redes/visualizacion',{graph:graph.body, participantes:participantes.body, idCodigo:idCodigo, sentido:sentido, idAplicacion: idAplicacion, preguntas: preguntas.body, idPersona: idPersona, idRelacion: idRelacion, sentido: sentido, clasificaciones: clasificaciones.body});
    }

    
    async resultadosDownload({ view, request, response }) {


        var proceso = request.input("idAplicacion")

        var obj = {
            proceso: proceso
        };

        var participantes = {};
        
        var participantes = await data.execApi(request.hostname(),'/Redes/Medicion/getParticipantes',participantes);
        
        var cabecera = {};

        var wb = {
            SheetNames: [],
            Sheets: {}
        }

        var registros = result.body.data.procesos;
        var ws_name = "Resultados";

        /* make worksheet */
        var ws_data = [ 
            cabecera
        ];
        for (var fila in registros) {

            var registro = [];
            for (var campo in cabecera) {

                registro.push(registros[fila][cabecera[campo]]);
            }

            ws_data.push(registro);

        }

        var ws = XLSX.utils.aoa_to_sheet(ws_data);

        /* Add the sheet name to the list */
        wb.SheetNames.push(ws_name);

        /* Load the worksheet object */
        wb.Sheets[ws_name] = ws;

        XLSX.writeFile(wb, 'tmp/resultados.xlsx');

        response.implicitEnd = false

        response.type = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";

        response.attachment(
            Helpers.tmpPath('resultados.xlsx'),
            'resultados.xlsx'
        )

    }
}
module.exports = Visualizador;