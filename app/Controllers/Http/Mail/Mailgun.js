'use strict'

const data = use('App/Utils/Data')
const XLSX = require('xlsx')
const Helpers = use('Helpers')
const fs = use('fs')
const readFile = Helpers.promisify(fs.readFile)
class Mailgun {
    
   async sendEmail ({view,request, response}) {
       
    var tag = request.input("tag");
    var to = request.input("to");
    var subject = request.input("subject");
    var body = request.input("body");
    var obj = {
        tag:tag,
        to:to,
        subject:subject,
        body:body
    };
        
    var result = await data.execApiPost(request.hostname(),'/Mail/Mailgun/send',obj);  
   }

   async statsDownload ({view,request, response}) {
    
    var tag = request.input("tag")
    var event = request.input("event")
    var obj = {
        tag:tag
    };
    if(event){
        obj.event=event;
    }
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
                console.log(new Date(eventos[evento].timestamp*1000))
                
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
 
}


}

module.exports = Mailgun