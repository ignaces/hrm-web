'use strict'
const data = use('App/Utils/Data')

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




}

module.exports = Notificaciones