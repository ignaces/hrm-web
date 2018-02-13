'use strict'

const data = use('App/Utils/Data')

class Talento {
    

    async colaboradoresTalento ({view,request, response, auth, session}) {
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
        var idOpinante = request.input("idOpinante");
        //var idTalento = request.input("talento")
        var obj = {
            //"idTalento":idTalento,
            "idPersona": idPersona
        };
        
        var result = await data.execApi(request.hostname(),'/Acreditacion/Proceso/getPersonaTalentos',obj);
        var personas = result.body.data;
        console.log(idOpinante);
        
        return view.render('talento/colaboradoresTalento' /*,  {personas:personas}*/);
        
    }

    async widget({request,response}){
       
        return view.render('talento/colaboradores');

    }

    

}

module.exports = Talento