'use strict'
const got = use('got')
const data = use('App/Utils/Data')

class Visualizador {
    async viewGraph({view,request,response,params}){

        var obj={};
        var graph = await data.execApi(request.hostname(),'/Redes/Medicion/getGraph',obj);
        
        return view.render('redes/visualizacion',{graph:graph.body})
    }
}
module.exports = Visualizador;