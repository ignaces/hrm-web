'use strict'

const data = use('App/Utils/Data')

class Persona {
    

    async fichaCompromiso ({view,request, response, auth, session}) {
        var idTalentoProcesoPersona =request.input('idTalentoProcesoPersona')

        return view.render('talento/fichaCompromiso' ,  {});
    }
}
module.exports = Persona