'use strict'

const data = use('App/Utils/Data')

class MetasCreacion {
    

    async creacion ({view,request, response, auth, session}) {
        
        var idPersona = session.get('idPersona', 'fail')
        var idProceso = request.input("proceso")

        session.put('idProceso',idProceso);

        var obj = {
            "idProceso":idProceso,
            "idPersona": idPersona
        };
       
        return view.render('/desempeno/metas/creacion/creacion');
    }
}

module.exports = MetasCreacion