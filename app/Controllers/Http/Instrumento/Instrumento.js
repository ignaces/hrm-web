'use strict'

const got = use('got')

class Instrumento {
     async index ({view,request, response}) {
        const Env = use('Env')

        var server = Env.get('API_SERVER', 'development')

        const facsimiles = await got(`${server}/Evaluacion/Instrumento/getFacsimiles`,
        {
            json:true,
            query:{
                "idCliente":"asdasdsad",
                "idProcesoPersona":"576647a0-f0eb-11e7-bf12-bc764e100f2b",
                "codigoInstrumento":"TCO"
            }
        })
        
        const result = await got(`${server}/Evaluacion/Instrumento/getFacsimilesPersona`,
        {
            json:true,
            query:{
                idCliente:"asdasdasdasd",
                    idProcesoPersona}
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