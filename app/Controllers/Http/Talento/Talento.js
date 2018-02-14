'use strict'

const data = use('App/Utils/Data')

class Talento {
    

    async colaboradoresTalento ({view,request, response, auth, session}) {
        
        var all =  session.get('personaLogueada')
        var idOpinante = all.id

        var idTalentoProceso = request.input("talento");
        var obj = {
            "idTalentoProceso":idTalentoProceso,
            "idOpinante":idOpinante
        };
        var result = await data.execApi(request.hostname(),'/Acreditacion/Proceso/getFindTalentoProceso',obj);
        var total = result.body;
        console.log(total)
        
        return view.render('talento/colaboradores' ,  {total:total});
        
    }

    async colaboradoresTalento2 ({view,request, response, auth, session}) {
        
        
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