'use strict'
const data = use('App/Utils/Data')

class Notificaciones {

    async create ({view,request, response}) {
    
        return view.render('mail/nuevaNotificacion',  {mail:""});
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




}

module.exports = Notificaciones