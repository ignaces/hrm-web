'use strict'

const got = use('got')

class Administracion {
     administrador  ({ view,request, response, auth }) {
        
        //console.log(auth.user.username)
        //console.log(auth.user.id)

      
        return view.render('administracion/administrador');
    }
}

module.exports = Administracion