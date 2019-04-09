'use strict'

const data = use('App/Utils/Data')
const uuidv4 = require('uuid/v4');
const XLSX = require('xlsx');
class Producto {


    async import ({view,request, response, auth, session}) {
        const file = request.file("file");
        const idNotificacion = request.input("idNotificacion")
        var name = uuidv4().replace(/-/g,"");
        
        var fileExt = file.clientName.split('.').pop();
        name = `productos_${name}.${fileExt}`;
        
        await file.move("tmp/", {
            name: name
        });
        var workbook = XLSX.readFile(`tmp/${name}`);
        var first_sheet_name = workbook.SheetNames[0];
        var worksheet = workbook.Sheets[first_sheet_name];
        
        var productos = XLSX.utils.sheet_to_json(worksheet);
        console.log(productos)
        var envio = await data.execApiPost(request.hostname(),'/Incentivos/Producto/import',{productos:productos});  
            return {mesaje:"ok"}
        
    }
}

module.exports = Producto
