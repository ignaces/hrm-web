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

class Resultados {
    
    async viewResults({view,request,response,params, auth}){

        var obj={};
        var participantes = {};
        var preguntas = {};

        var arrParticipantes = {};
        var arrPreguntas = [];

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

        var persona = [];
        
        //console.log(graph.body.nodes);
        for(var itemParticipante in graph.body.nodes)
        {
            //arrParticipantes["nombre"][itemParticipante.];
            //console.log(graph.body.nodes[itemParticipante].id);
            var personaObj = {};
            personaObj.id               = graph.body.nodes[itemParticipante].id;
            personaObj.nombre           = graph.body.nodes[itemParticipante].properties.nombre;
            personaObj.apellidoPaterno  = graph.body.nodes[itemParticipante].properties.apellidoPaterno;
            personaObj.apellidoMaterno  = graph.body.nodes[itemParticipante].properties.apellidoMaterno;
            personaObj.area             = graph.body.nodes[itemParticipante].properties.area;
            persona[graph.body.nodes[itemParticipante].id] = personaObj;

            //console.log(persona[graph.body.nodes[itemParticipante].id]);
        }

        var respuesta = [];

        for(var itemRespuestas in graph.body.edges)
        {
            //arrParticipantes["nombre"][itemParticipante.];
            //console.log(graph.body.nodes[itemParticipante].id);
            var respuestaObj = {};
            
            respuestaObj.nombreResponde           = persona[graph.body.edges[itemRespuestas].startNode].nombre;
            respuestaObj.apellidoPaternoResponde  = persona[graph.body.edges[itemRespuestas].startNode].apellidoPaterno;
            respuestaObj.apellidoMaternoResponde  = persona[graph.body.edges[itemRespuestas].startNode].apellidoMaterno;
            respuestaObj.areaResponde             = persona[graph.body.edges[itemRespuestas].startNode].area;

            //respuestaObj.codigoPregunta           = graph.body.edges[itemRespuestas].properties.pregunta;

            var preguntaAct                       = ""

            for(var itemPreguntas in preguntas.body.preguntas)
            {
                //console.log(preguntas.body.preguntas[itemPreguntas].id+' -> '+graph.body.edges[itemRespuestas].properties.pregunta);

                if(preguntas.body.preguntas[itemPreguntas].id == graph.body.edges[itemRespuestas].properties.pregunta)
                {
                    preguntaAct                   =   preguntas.body.preguntas[itemPreguntas].pregunta;
                    respuestaObj.pregunta         =   preguntaAct;
                }
            }

            respuestaObj.nombreRespuesta            = persona[graph.body.edges[itemRespuestas].endNode].nombre;
            respuestaObj.apellidoPaternoRespuesta   = persona[graph.body.edges[itemRespuestas].endNode].apellidoPaterno;
            respuestaObj.apellidoMaternoRespuesta   = persona[graph.body.edges[itemRespuestas].endNode].apellidoMaterno;
            respuestaObj.areaRespuesta              = persona[graph.body.edges[itemRespuestas].endNode].area;
            
            respuesta.push(respuestaObj);
            //console.log(graph.body.edges[itemRespuestas].startNode);
            //console.log(respuestaObj);
        }
        
        var cabecera = Object.keys(respuestaObj);
        //console.log(cabecera);

        var wb = {
            SheetNames: [],
            Sheets: {}
        }

        var registros = respuesta;
        var ws_name = "Resultados";
        //console.log(registros);
        /* make worksheet */
        var ws_data = [ 
            cabecera
        ];

        for (var fila in registros) {
            //console.log(fila);
            var registro = [];
            for (var campo in cabecera) {
                
                registro.push(registros[fila][cabecera[campo]]);
            }

            ws_data.push(registro);

        }
        console.log(ws_data);

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
        

        //return view.render('redes/visualizacion',{graph:graph.body, participantes:participantes.body, idCodigo:idCodigo, sentido:sentido, idAplicacion: idAplicacion, preguntas: preguntas.body, idPersona: idPersona, idRelacion: idRelacion, sentido: sentido, clasificaciones: clasificaciones.body});
    }
}
module.exports = Resultados;