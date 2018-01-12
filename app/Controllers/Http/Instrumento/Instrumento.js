'use strict'

const got = use('got')

class Instrumento {
     async index ({view,request, response}) {
        const Env = use('Env')

        var server = Env.get('API_SERVER', 'development')
        const all = request.all();
        var idOpinante = all.idOpinante
        var codigo = all.codigo
        
        
        console.log(idProcesoPersona)
        const result = await got(`${server}/Evaluacion/Instrumento/getInstrumento`,
        {
            json:true,
            query:{
                "hostname":request.hostname(),
                "idOpinante":idOpinante,
                "tipoInstrumento":codigo
                }
        })
        
        
       
        var persona = {
            nombre:"Juan Alberto Gonzales Olivares",
            cargo:"Cargo x",
            perfilCargo:"Maestro OOCC Empalmes",
            contratista:"Cobra"
        };
        
        var instrumento = result.body;
        return view.render('instrumento/instrumento',  {persona:persona,instrumento:instrumento});
    }
     historia ({view,request,response}){
         const Env = use('Env')
         
         var server = Env.get('API_SERVER', 'development')
         
         var historial = [{
             descripcion:""
         }];
        return view.render('persona/historia',  {historial:historial}); 
    }
    historia2 ({view,request,response}){
        const Env = use('Env')
        
        var server = Env.get('API_SERVER', 'development')
        
        var historial = [{
            descripcion:""
        }];
       return view.render('persona/historia',  {historial:historial}); 
   }
}

module.exports = Instrumento