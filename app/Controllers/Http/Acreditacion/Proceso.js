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
        
        var result = await data.execApi(request.hostname(),'/Acreditacion/Proceso/getPersonasEvaluaciones',obj);
        var personas = result.body.data;

        ////console.log(personas);

        var avance = result.body.data.avance;
        var cliente = request.hostname().split(".")[0];
        var hideTipo = false;

        //Andres!!! >.<'!!
        //TODO: Parametrizar esto, no puede quedar asi!!!!
        if(cliente=="metro"){
            hideTipo=true;
        }

        return view.render('acreditacion/proceso/colaboradores',  {tipoOpinante:personas,avance:avance,hideTipo});
    }
}

module.exports = Proceso