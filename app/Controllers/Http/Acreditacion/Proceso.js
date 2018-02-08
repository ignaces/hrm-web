'use strict'

const data = use('App/Utils/Data')

class Proceso {
    

    async colaboradores ({view,request, response, auth, session}) {
        
        var idPersona = session.get('idPersona', 'fail')
        var idProceso = request.input("proceso")
        var obj = {
            "idProceso":idProceso,
            "idPersona": idPersona
        };
        var result = await data.execApi(request.hostname(),'/Acreditacion/Proceso/getPersonasEvaluaciones',obj);
        var personas = result.body.data;
        
        return view.render('acreditacion/proceso/colaboradores',  {tipoOpinante:personas});
    }
}

module.exports = Proceso