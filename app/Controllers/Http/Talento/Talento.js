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
        var result = await data.execApi(request.hostname(),'/Talento/Talento/getFindTalentoProceso',obj);
        var total = result.body;
        
        
        return view.render('talento/colaboradores' ,  {total:total});
        
    }

    async colaboradoresTalento2 ({view,request, response, auth, session}) {
        
        
        var all =  session.get('personaLogueada')
        var idOpinante = all.id
        
        var idTalentoProceso = request.input("talento");

        //var idTalento = request.input("talento")
        var obj = {
            "idTalentoProceso":idTalentoProceso,
            "idOpinante":idOpinante
        };
        
        var result = await data.execApi(request.hostname(),'/Talento/Talento/getPersonaTalentos',obj);
        var personas = result.body;
       
        
        return view.render('talento/colaboradoresTalento' ,  {personas:personas});
        
    }

    

    

}

module.exports = Talento