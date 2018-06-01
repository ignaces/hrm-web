'use strict'

const data = use('App/Utils/Data')

class Proceso {
    

    async colaboradores ({view,request, response, auth, session}) {
        
        var idPersona = session.get('idPersona', 'fail')
        var idProceso = request.input("proceso")

        session.put('idProceso',idProceso);

        var obj = {
            "idProceso":idProceso,
            "idPersona": idPersona
        };
        console.log(obj);
        var result = await data.execApi(request.hostname(),'/Acreditacion/Proceso/getPersonasEvaluaciones',obj);
        var personas = result.body.data;
        
        return view.render('incentivo/proceso/colaboradores');
    }

    async catalogo ({view,request, response, auth, session}) {
        
        var idPersona = session.get('idPersona', 'fail')
        var idProceso = request.input("proceso")

        session.put('idProceso',idProceso);

        var obj = {
            "idProceso":idProceso,
            "idPersona": idPersona
        };
        //console.log(obj);
        //var result = await data.execApi(request.hostname(),'/Acreditacion/Proceso/getPersonasEvaluaciones',obj);
        //var personas = result.body.data;
        
        return view.render('incentivo/proceso/catalogo');
    }

    async ingresoVenta ({view,request, response, auth, session}) {
        /*
        var idPersona = session.get('idPersona', 'fail')
        var idProceso = request.input("proceso")

        session.put('idProceso',idProceso);

        var obj = {
            "idProceso":idProceso,
            "idPersona": idPersona
        };
        console.log(obj);
        var result = await data.execApi(request.hostname(),'/Acreditacion/Proceso/getPersonasEvaluaciones',obj);
        var personas = result.body.data;
        */

        var ventaProds = [];
        var objProds = {};

        for(var i=1; i<=5; i++)
        {
            ventaProds.push(i);
        }

        objProds.prods = ventaProds;
        //console.log(objProds);

        return view.render('incentivo/proceso/ingresoVenta');
    }

    async getProducto ({view,request, response, auth, session}) {
        
        var idProducto = request.input("idProducto")
        
        var obj = {
            "idProducto":idProducto
        };
        //console.log(obj);
        var result = await data.execApi(request.hostname(),'/Incentivos/Incentivos/getProducto',obj);
        var personas = result.body;

        response.json(personas);
    }
}

module.exports = Proceso