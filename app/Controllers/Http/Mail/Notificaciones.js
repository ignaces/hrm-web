'use strict'
const data = use('App/Utils/Data')

class Notificaciones {

    async create ({view,request, response}) {
    
        return view.render('mail/nuevaNotificacion',  {mail:""});
    }


}

module.exports = Notificaciones