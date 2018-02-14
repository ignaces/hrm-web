'use strict'

const data = use('App/Utils/Data')

class Talento {
    

    async colaboradoresTalento ({view,request, response, auth, session}) {
        
         //var TotalCount = session.get('Total', totalColaboradores)
       
        /*
        var idPersona = session.get('idPersona', 'fail')
        var idTalento = request.input("talento")
        var obj = {
            "idTalento":idTalento,
            "idPersona": idPersona
        };
        var result = await data.execApi(request.hostname(),'/Acreditacion/Proceso/getPersonasTalentos',obj);
        var personas = result.body.data;
        */
        return view.render('talento/colaboradores' /*,  {tipoOpinante:personas}*/);
        
    }

    async colaboradoresTalento2 ({view,request, response, auth, session}) {
        
        var idPersona = session.get('idPersona', 'fail')
        var all =  session.get('personaLogueada')
        var idOpinante = all.id
        
        //var idOpinante = request.input("idOpinante");

        //var idTalento = request.input("talento")
        var obj = {
            //"idTalento":idTalento,
            "idOpinante": idOpinante
        };
        
        var result = await data.execApi(request.hostname(),'/Acreditacion/Proceso/getPersonaTalentos',obj);
        var personas = result.body;
       
        
        return view.render('talento/colaboradoresTalento' ,  {personas:personas});
        
    }

    

    

}

module.exports = Talento