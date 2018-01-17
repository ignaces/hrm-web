'use strict'

const got = use('got')

class Proceso {
    

    async colaboradores ({view,request, response, auth, session}) {
        
        
        const Env = use('Env')

        var idPersona = session.get('idPersona', 'fall')

        var server = Env.get('API_SERVER', 'development')
        
        
        const result = await got(`${server}/Acreditacion/Proceso/getPersonasEvaluaciones`,
        {
            json:true,
            query:{
                "idProceso":"9d212163-f0e6-11e7-bf12-bc764e100f2b",
                "idPersona": idPersona
            }
        })
        
        var personas = result.body.data;
        
        return view.render('acreditacion/proceso/colaboradores',  {tipoOpinante:personas});
    }
}

module.exports = Proceso