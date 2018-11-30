'use strict'

    const data = use('App/Utils/Data')
    var Enumerable = require('linq');
class Encuesta {
        async loadFile({view,request,response}){
            const file = request.file("file");
            const idNotificacion = request.input("idNotificacion")
            var name = uuidv4().replace(/-/g,"");
            
            var fileExt = file._clientName.split('.').pop();
            name = `engagement_${name}.${fileExt}`;
            
            await file.move("tmp/", {
                name: name
            });
            var workbook = XLSX.readFile(`tmp/${name}`);
            var first_sheet_name = workbook.SheetNames[0];
            var worksheet = workbook.Sheets[first_sheet_name];
            var correos = XLSX.utils.sheet_to_json(worksheet)
            var notificacion = {
                idNotificacion: idNotificacion,
                correos: correos
            }
            const errores = Enumerable.from(correos).select(function(err){
                return err;
                
            }).where(function(correo){
                var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            //Se valida que el correo sea valido 
                return re.test(correo.email) == false;
            }).toArray();
        
            if(errores.length>0){
                return {error:errores}
            }else{

                var envio = await data.execApiPost(request.hostname(),'/Mail/Notificaciones/sendNotificacion',notificacion);  
                return {mesaje:"ok"}
            }
            
        }
        async add({view,request,response}){
                

                var encuesta = request.input("encuesta");
                var encuestas = await data.execApiPost(request.hostname(),'/Engagement/Encuesta/addAplicacion',{encuesta:encuesta});  
                
        }

        async getAll({view,request,response}){
            var encuestas = await data.execApiPost(request.hostname(),'/Encuesta/Encuesta/getAll',{});  
            return encuestas.body.data[0];
        }


}

module.exports = Encuesta
