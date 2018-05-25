'use strict'

    const data = use('App/Utils/Data')
    const XLSX = require('xlsx')
    const Helpers = use('Helpers')
    const fs = use('fs')
    const readFile = Helpers.promisify(fs.readFile)
    class Avance {
        async index  ({ view,request, response, auth, session }) {
          var id = request.input("idEncuestaAplicacion");
          
          var resumen = await data.execApi(request.hostname(),'/Encuesta/Avance/getAvanceResumen',{idEncuestaAplicacion:id});  
          
          return view.render('encuesta/avance/index',  {resumen:resumen.body,idEncuestaAplicacion:id});
        
        } 
        async getResumen  ({ view,request, response, auth, session }) {
            var id = request.input("idEncuestaAplicacion");
            
            var resumen = await data.execApi(request.hostname(),'/Encuesta/Avance/getAvanceResumen',{idEncuestaAplicacion:id});  
            
            return resumen.body;
          
        } 
        async avanceEncuesta ({ view,request, response, auth, session }) {
            var id = request.input("idEncuestaAplicacion");
            return view.render('encuesta/avance/encuesta',  {mensaje:""});
          
        } 
        async getExcelAvance ({ view,request, response, auth, session }) {
            var id = request.input("idEncuestaAplicacion");
            var result = await data.execApi(request.hostname(),'/Encuesta/Avance/getAvance',{idEncuestaAplicacion:id});  
            const XLSX = require('xlsx');
            
            var cabecera = Object.keys(result.body[0]);
        
            var wb = {
                SheetNames: [],
                Sheets: {}
            }
            
            var registros = result.body;
            var ws_name = "Avance";
    
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
                
            XLSX.writeFile(wb, 'tmp/avance.xlsx');
            
            response.implicitEnd = false
            
            response.type = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
            
            response.attachment(
                Helpers.tmpPath('avance.xlsx'),
                'avance.xlsx'
            )
          
        } 
    }
      
    module.exports = Avance