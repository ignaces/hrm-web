'use strict'
const got = use('got')
const data = use('App/Utils/Data')

class Visualizador {
    async viewApps({view,request,response,params}){
        var obj={};
        var apps = await data.execApi(request.hostname(),'/Redes/Medicion/getAplicaciones',obj);
        console.log(apps.body);

        return view.render('redes/aplicaciones',{aplicaciones:apps.body});
    }
    
    async viewGraph({view,request,response,params}){

        var obj={};
        var participantes = {};

        var idAplicacion = request.input("idAplicacion");
        if(request.input("idAplicacion") || request.input("idAplicacion") == "undefined")
        {
            var idAplicacion = "'4771dc31-2621-11e8-80db-bc764e10787e'";
        }

        if(request.input("id"))
        {
            obj.id = request.input("id");
        }
        
        if(request.input("sentido"))
        {
            obj.sentido = request.input("sentido");
        }
        else
        {
            obj.sentido = 0;
        }

        obj.idAplicacion = idAplicacion;
        participantes.idAplicacion = idAplicacion;

        var graph = await data.execApi(request.hostname(),'/Redes/Medicion/getGraph',obj);
        var participantes = await data.execApi(request.hostname(),'/Redes/Medicion/getParticipantes',participantes);

        var idCodigo = 0;
        var sentido = 0;

        if(request.input("id")!="0")
        {
            idCodigo = request.input("id");
        }

        if(request.input("sentido"))
        {
            sentido = request.input("sentido");
        }

        return view.render('redes/visualizacion',{graph:graph.body, participantes:participantes.body, idCodigo:idCodigo, sentido:sentido});
    }
}
module.exports = Visualizador;