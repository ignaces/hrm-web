'use strict'

const data = use('App/Utils/Data')
const XLSX = require('xlsx')
const Helpers = use('Helpers')
const fs = use('fs')
const readFile = Helpers.promisify(fs.readFile)
class Mailgun {

   async statsDownload ({view,request, response}) {
    var obj = {
        tag:"redsalud_inicio",
        event:"failed"
    };
    var result = await data.execApi(request.hostname(),'/Mail/Mailgun/stats',obj);  
    
    
        var wb = {
            SheetNames: [],
            Sheets: {}
        }
        
        var eventos = result.body.items;
        var ws_name = "Estados";

            /* make worksheet */
            var ws_data = [
                ["Email", "Asunto","Estado", "Fecha"] 
            ];
            for(var evento in eventos){
                var fila = [
                    eventos[evento].recipient,
                    eventos[evento].message.headers.subject,
                    eventos[evento].event,
                    new Date(eventos[evento].timestamp*1000)
                ]
                ws_data.push(fila);
                
            }
            
            var ws = XLSX.utils.aoa_to_sheet(ws_data);

            /* Add the sheet name to the list */
            wb.SheetNames.push(ws_name);

            /* Load the worksheet object */
            wb.Sheets[ws_name] = ws;
        XLSX.writeFile(wb, 'tmp/emailStats.xlsx');
        response.implicitEnd = false
        response.type = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
        response.attachment(
            Helpers.tmpPath('emailStats.xlsx'),
            'emailStats.xlsx'
        )

  //return await readFile('uploads/out.xlsx')
 
}


}

module.exports = Mailgun