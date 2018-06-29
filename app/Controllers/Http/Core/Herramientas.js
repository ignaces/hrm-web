'use strict'

const api = use('App/Utils/Data')
  
class Herramientas {

    async documentos  ({ view,request, response }) {
    //Datos Documentos
    var objDatosDocs = {
        "activo": "1"
    };
    var resultDocs = await api.execApi(request.hostname(), '/Core/Documentos/getDocumentos', objDatosDocs);
    var datosDocs= resultDocs.body.data;
    
    //RENDER
    return view.render('core/herramientas/documentos', {datosDocs});

        
    }
}

module.exports = Herramientas