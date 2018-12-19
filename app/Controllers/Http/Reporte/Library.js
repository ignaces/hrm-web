'use strict'
const data = use('App/Utils/Data')

class Library {
    async index ({view,request, response,session}) {
        var persona =  session.get('personaLogueada')
        var idEmpresa = persona.idEmpresa;
        var result = await data.execApi(request.hostname(),'/Reportes/Reportes/list',{idEmpresa:idEmpresa});
        
        return view.render('Reportes/index',  {reportes:result.body});
    }
    async Show ({view,request,response}){
        var idReporte = request.input("rp");
        var result = await data.execApi(request.hostname(),'/Reportes/Reportes/get',{idReporte:idReporte});
        return view.render('Reportes/jasperE',  {reporte:result.body});
    }
}

module.exports = Library