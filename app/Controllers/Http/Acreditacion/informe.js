'use strict'

const data = use('App/Utils/Data')
const XLSX = require('xlsx')
const Helpers = use('Helpers')
const fs = use('fs')
const Antl = use('Antl')
const readFile = Helpers.promisify(fs.readFile)
class Informe {
     async index  ({ view,request, response, auth }) {
        var conDetalle = request.input("cd");
        var idPersona = request.input("persona");
        var obj = {
            "procesoPersona": request.input("procesoPersona")
        };

        var objeto = {
            "idPersona":idPersona
        };

        var resultado = await data.execApi(request.hostname(),'/Acreditacion/Proceso/getPersona',obj);
        var clasificacion = resultado.body;

        console.log(resultado.body);

        var resultSintesis = await data.execApi(request.hostname(),'/Acreditacion/Informe/getResultadoSistesis',obj);
        var resultadoSintesis = resultSintesis.body.data;

        var resultTCO = await data.execApi(request.hostname(),'/Acreditacion/Informe/getResultadoTCO',obj);
        var resultadoTCO = resultTCO.body.data;

        var resultTCODetalle = await data.execApi(request.hostname(),'/Acreditacion/Informe/getInstrumentosTCO',obj);
        var resultadoTCODetalle = resultTCODetalle.body.data;
        return view.render('acreditacion/informe/informesd', {sintesis:resultadoSintesis, resultadoTCO:resultadoTCO, TCODetalle:resultadoTCODetalle, conDetalle,clasificacion});
    }   
    async dashboard  ({ view,request, response, auth }) {
        var idProceso = request.input("proceso")
        

        //var sss = Antl.formatMessage('messages.greeting', { name: 'virk' })
        var obj = {
            "proceso":idProceso
        };
        
        var result = await data.execApi(request.hostname(),'/Acreditacion/Informe/getPersonasProcesoResultados',obj);
        var personas = result.body.data.personas;
        
        var detalle = {
            evaluados:personas.length,
            enProgreso:0,
            finalizados:0,
            noIniciados:0
        }

        for(var persona in personas){
            if(personas[persona].estadoCodigo=="EN_PROGRESO"){
                detalle.enProgreso++;
            }
            if(personas[persona].estadoCodigo=="NO_INICIADO"){
                detalle.noIniciados++;
            }
            if(personas[persona].estadoCodigo=="FINALIZADO"){
                detalle.finalizados++;
            }
        }
        var avance = Math.round((detalle.finalizados*100)/detalle.evaluados);
        detalle.avance = `${avance} %`;
        return view.render('acreditacion/informe/dashboard',{personas,detalle});

    }  
    async resultadosDownload ({view,request, response}) {
    
    
        var proceso = request.input("proceso")
        
        var obj = {
            proceso:proceso
        };

        

        var result = await data.execApi(request.hostname(),'/Acreditacion/Informe/getResultadosProceso',obj);  
        
        var cabecera = Object.keys(result.body.data.procesos[0]);
        
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
                for(var fila in registros){
                    
                    var registro = [];
                    for(var campo in cabecera){
                        
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

module.exports = Informe