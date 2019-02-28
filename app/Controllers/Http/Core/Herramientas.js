'use strict'

const api = use('App/Utils/Data')
const got = use('got')
const FormData = require('form-data');
const fs = require('fs');
const http = require('http');
const Helpers = use('Helpers');
  
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

    async bitacora  ({ view,request,session, response }) {
        var idPersona = session.get('idPersona', 'fall')

        var result = await api.execApi(request.hostname(), '/Core/Bitacora/getPersona', {idPersona:idPersona});
        var persona = result.body.data;

        var resultq = await api.execApi(request.hostname(), '/Core/Bitacora/getListEquipo', {idPersona:idPersona});
        var equipo = resultq.body.data;

        return view.render('core/herramientas/bitacora',{Persona:persona,equipo:equipo});
    }

    async bitacoraPersona  ({ view,request,session, response }) {
        var idOpinado = request.input("idPersona")
        var idOpinante = session.get('idPersona', 'fall')

        var obj = {
            idOpinado:idOpinado,
            idOpinante:idOpinante
        }

        var result = await api.execApi(request.hostname(), '/Core/Bitacora/getBitacoraPersona', obj);
        var bitacora = result.body.data;

        return view.render('core/herramientas/bitacoraPersona',{bitacora:bitacora,idOpinado:idOpinado});
    }

    async addItem({ view,request,session, response }) {
        var idOpinante = session.get('idPersona', 'fall')
        var idOpinado = request.input("idOpinado")
        var titulo = request.input("titulo")
        var descripcion = request.input("descripcion")
        var archivo = request.input("archivo")
        var link = request.input("link")

        var obj = {
            idOpinado:idOpinado,
            idOpinante:idOpinante,
            titulo:titulo,
            descripcion:descripcion,
            archivo:archivo,
            link:link
        }

        var objb = {
            idOpinado:idOpinado,
            idOpinante:idOpinante
        }

        var result = await api.execApi(request.hostname(), '/Core/Bitacora/addItem', obj);
        var resultb = await api.execApi(request.hostname(), '/Core/Bitacora/getBitacoraPersona', objb);
        var bitacora = resultb.body.data;

        return bitacora;
    }

    async deleteItem({ view,request,session, response }) {
        var id = request.input("id")
        var idOpinante = session.get('idPersona', 'fall')
        var idOpinado = request.input("idOpinado")

        var obj = {
            idOpinado:idOpinado,
            idOpinante:idOpinante
        }

        var result = await api.execApi(request.hostname(), '/Core/Bitacora/deleteItem', {id:id});
        var resultb = await api.execApi(request.hostname(), '/Core/Bitacora/getBitacoraPersona', obj);
        var bitacora = resultb.body.data;

        return bitacora;
    }

    async editItem({ view,request,session, response }) {
        var id = request.input("id")
        var idOpinante = session.get('idPersona', 'fall')
        var idOpinado = request.input("idOpinado")
        var titulo = request.input("titulo")
        var descripcion = request.input("descripcion")
        var archivo = request.input("archivo")
        var link = request.input("link")

        var obj = {
            id:id,
            idOpinado:idOpinado,
            idOpinante:idOpinante,
            titulo:titulo,
            descripcion:descripcion,
            archivo:archivo,
            link:link
        }

        var objb = {
            idOpinado:idOpinado,
            idOpinante:idOpinante
        }

        var result = await api.execApi(request.hostname(), '/Core/Bitacora/editItem', obj);
        var resultb = await api.execApi(request.hostname(), '/Core/Bitacora/getBitacoraPersona', objb);
        var bitacora = resultb.body.data;

        return bitacora;
    }

    async loadFile({ view,request,session, response }) {
        var file = request.file("file");
        var cliente=request.hostname();
        var form = new FormData();
        var url = '';
        var arr = cliente.split('.')

        try{
            form.append('file', fs.createReadStream(file._tmpPath));
            form.append('cliente', arr[0]);
            form.append('subtype', file._clientName.split('.')[1]);

            var result = await got.post('https://hrmassets.enovum.cl/Files/File/uploadFile', {
                body: form
            });
            url = result.body;

            fs.unlink(file._tmpPath)
            
        }catch(ex){
            console.log(ex.message)
        }

        return {
            fileName:file._clientName,
            fileLink:url
        }
    }

    async downloadFile({ view,request,session, response }) {
        var archivo = request.input("archivo")  
        var link = request.input("link")

        console.log('archivo: ' +archivo)
        console.log('url: ' +link)
        
        const file = fs.createWriteStream('tmp/' + archivo);
        const req = http.get(link, function(res) {
          res.pipe(file);
        })
    }

    async download({ view,request,session, response }) {
        var file = request.input("file")

        response.attachment(
            Helpers.tmpPath(file),
            file
        )
        
    }
}

module.exports = Herramientas