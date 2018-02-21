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


    async nineBoxColaboradores ({view,request, response, auth, session}) {
        
        var all =  session.get('personaLogueada')
        var idOpinante = all.id
        
        var idTalentoProceso = request.input("talento");

        //var idTalento = request.input("talento")
        var obj = {
            "idTalentoProceso":idTalentoProceso,
            "idOpinante":idOpinante
        };
        
        var result = await data.execApi(request.hostname(),'/Talento/Talento/colaboradoresSinCuadrante',obj);
        var personas = result.body;
        
        
        var all1 =  session.get('personaLogueada')
        var idOpinante1 = all1.id
        
        var idTalentoProceso1 = request.input("talento");
        
        var obj = {
            "idOpinante":idOpinante1,
            "idTalentoProceso":idTalentoProceso1
            };

        var result = await data.execApi(request.hostname(),'/Talento/Talento/generaCuadrantes',obj);
        var cuadrantes = result.body;
        
        var cuadrante1 = cuadrantes[0];

        var cuadrante1 = cuadrantes[0];
        var cuadrante2 = cuadrantes[1];
        var cuadrante3 = cuadrantes[2];
        var cuadrante4 = cuadrantes[3];
        var cuadrante5 = cuadrantes[4];
        var cuadrante6 = cuadrantes[5];
       var cuadrante7 = cuadrantes[6];
        var cuadrante8 = cuadrantes[7];
       var cuadrante9 = cuadrantes[8];
        
    

        return view.render('talento/nineBoxColaboradores', {personas:personas,cuadrante1:cuadrante1,cuadrante2:cuadrante2,cuadrante3:cuadrante3,cuadrante4:cuadrante4,cuadrante5:cuadrante5,cuadrante6:cuadrante6,cuadrante7:cuadrante7,cuadrante8:cuadrante8,cuadrante9:cuadrante9});
        
    }

    async colaboradoresEvaluados({view,request, response, auth, session}) {
        var all =  session.get('personaLogueada')
        var idOpinante = all.id
        
        var idTalentoProceso = request.input("talento");

        //var idTalento = request.input("talento")
        var obj = {
            "idTalentoProceso":idTalentoProceso,
            "idOpinante":idOpinante
        };

        var result = await data.execApi(request.hostname(),'/Talento/Talento/colaboradoresSinCuadrante',obj);
        var personas = result.body;

    }



    async seleccionDragTalento({view,request, response, auth, session}) {
        
        //var idColaborador = request.input("idColaborador");
        //const all = request.all()

        //console.log(all);
        var idTalentoMatriz = request.input("idComponente");
        var idTalentoOpinante = request.input("idOpinante");
        
        var obj = {
            "idTalentoOpinante":idTalentoOpinante,
            "idTalentoMatriz":idTalentoMatriz
            };
        //var result = await data.execApi(request.hostname(),'/Acreditacion/Proceso/putRespuesta',obj);
        
        var result = await data.execApi(request.hostname(),'/Talento/Talento/seleccionDragTalentoAPI',obj);
        var idInsert = result.body;
        

        //request.setHeader('Content-Type', 'application/json');
        //request.send(JSON.parse(idInsert));
        //return {mensaje:"OK"}
        //return idInsert //devuelve el ultimo insert creado por el drag and drop
    }


}

module.exports = Talento