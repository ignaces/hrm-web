'use strict'
const got = use('got')
const data = use('App/Utils/Data')

class Visualizador {
    async viewGraph({view,request,response,params}){

        var obj={idAplicacio:"4771dc31-2621-11e8-80db-bc764e10787e"};
        var graph = await data.execApi(request.hostname(),'/Redes/Medicion/getGraph',obj);
        
        return view.render('redes/visualizacion',{graph:graph.body})
    }

   
}
module.exports = Visualizador;