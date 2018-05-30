'use strict'
const got = use('got')
const data = use('App/Utils/Data')
var Enumerable = require('linq');

class Empresa {


    async index({ view,request, response, auth, session }){
        
        /*TODO 
            getClasificacionesPeriodoEmpresa
            getAplicacionesEncuesta
        */
        return view.render('engagement/empresa/index',  {periodos:periodos});
    }

    async empresasPeriodo({ view,request, response, auth, session }){
            var idPeriodo = request.input("idPeriodo");
            
            var result = await data.execApi(request.hostname(),'/Engagement/Empresa/list',{idPeriodo:idPeriodo});

            const empresas = result.body;
             
           return empresas;
    }
}

module.exports = Empresa
