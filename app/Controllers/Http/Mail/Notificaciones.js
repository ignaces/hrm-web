'use strict'
const data = use('App/Utils/Data')
const uuidv4 = require('uuid/v4');
const XLSX = require('xlsx');
var Enumerable = require('linq');
class Notificaciones {

    async create ({view,request, response}) {
        var obj={};
        var result = await data.execApi(request.hostname(),'/Core/Administracion/getClientes',obj);  
        
        return view.render('mail/nuevaNotificacion',  {clientes:result.body.data});
    }

    async list ({view,request, response}) {
        var obj = {
            idCliente:""
        };
        
        var result = await data.execApi(request.hostname(),'/Mail/Notificaciones/getNotificaciones',obj);  
        
        return view.render('mail/notificaciones',  {});
    }

    async edit ({view,request, response}) {
        var idNotificacion = request.input("idNotificacion")
        var obj = {
            idNotificacion:idNotificacion
        };
        
        var result = await data.execApi(request.hostname(),'/Mail/Notificaciones/getNotificacion',obj);  
        
        return view.render('mail/edit',  {notificacion:result.body});
    }

    async getNotificaciones ({view,request, response}) {
        var obj = {
            idCliente:""
        };
        
        var result = await data.execApi(request.hostname(),'/Mail/Notificaciones/getNotificaciones',obj);  

        return{notificaciones:result.body};
    }

    async addNotificacion({view,request, response}) {
       
        var tag = request.input("tag");
        var to = request.input("to");
        var subject = request.input("subject");
        var body = request.input("body");
        var mask = request.input("mask");
        var nombre = request.input("nombre");
        var idCliente = request.input("idCliente");
        var obj = {
            tag:tag,
            to:to,
            subject:subject,
            body:body,
            nombre:nombre,
            mask:mask,
            idCliente:idCliente
        };
        try{

            var result = await data.execApiPost(request.hostname(),'/Mail/Notificaciones/create',obj);  

            return{mensaje:"ok"} 
        }catch(err){
            return{mensaje:err}
        }
        



    }

    async saveNotificacion({view,request, response}) {
       
        var tag = request.input("tag");
        var to = request.input("to");
        var subject = request.input("subject");
        var body = request.input("body");
        var mask = request.input("mask");
        var nombre = request.input("nombre");
        var idNotificacion = request.input("idNotificacion");
        var idCliente = request.input("idCliente");
        var obj = {
            tag:tag,
            to:to,
            subject:subject,
            body:body,
            nombre:nombre,
            mask:mask,
            idCliente:idCliente,
            idNotificacion:idNotificacion
        };
        try{

            var result = await data.execApiPost(request.hostname(),'/Mail/Notificaciones/save',obj);  

            return{mensaje:"ok"} 
        }catch(err){
            return{mensaje:err}
        }
        



    }
    async loadFile({view,request,response}){
        const file = request.file("file");
        const idNotificacion = request.input("idNotificacion")
        var name = uuidv4().replace(/-/g,"");
        
        var fileExt = file._clientName.split('.').pop();
        name = `excelNotificacion_${name}.${fileExt}`;
        
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
            return {error:errores.toArray()}
        }else{

            var envio = await data.execApiPost(request.hostname(),'/Mail/Notificaciones/sendNotificacion',notificacion);  
            return {mesaje:"ok"}
        }
        
    }



}

module.exports = Notificaciones