'use strict'

const data = use('App/Utils/Data')
const uuidv4 = require('uuid/v4');
const XLSX = require('xlsx');
class PuntoVenta {

  // using base script found on ./Producto.js

    async import ({view,request, response, auth, session}) {
      const file = request.file("file");
      const idNotificacion = request.input("idNotificacion")
      var name = uuidv4().replace(/-/g,"");

      var fileExt = file.clientName.split('.').pop();
      name = `pos_${name}.${fileExt}`;

      await file.move("tmp/", {
          name: name
      });
      var workbook = XLSX.readFile(`tmp/${name}`);
      var first_sheet_name = workbook.SheetNames[0];
      var worksheet = workbook.Sheets[first_sheet_name];

      var productos = XLSX.utils.sheet_to_json(worksheet);
      console.log(productos)
      var envio = await data.execApiPost(request.hostname(),'/Incentivos/PuntoVenta/createBulkPuntoVenta',{productos:productos});
          return {mesaje:"ok"}
    }


    async index ({view,request, response, auth, session}) {

        return view.render('incentivo/pos/index');
    }


    // REST
    //
    async getPuntoVenta ({request, response, session}) {

      var result = await data.execApi(request.hostname(),'/Incentivos/PuntoVenta/getPuntoVenta', { });

      var returning = result.body;
      response.json(returning);
    }

    async createPersonaInPuntoVenta ({request, response, session}) {

      var idPOS = request.input('idPOS');
      var idPersona = request.input('idPersona');

      var obj={
        idPOS:idPOS,
        idPersona:idPersona
      }

      try
        {
          var result = await data.execApiPost(request.hostname(),'/Incentivos/PuntoVenta/createPersonaInPuntoVenta', obj);

          return { mensaje: "Relación fue creada exitosamente." }
        }
      catch(err)
        {
          return { mensaje: "Relación no pudo ser creada. Verifique datos." }
        }
    }

}

module.exports = PuntoVenta
