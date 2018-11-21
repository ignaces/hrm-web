'use strict'

const api = use('App/Utils/Data')
const Antl = use('Antl');

class CalibracionController {
    async updateCalibracion({request, response}) {
try {
        console.log('******entro hrm updateCalibracion');
        var idEdeEtapaTareaActor= request.input("idEdeEtapaTareaActor");
        var calibracion= request.input("calibracion");
        
        var obj = {
            "idEdeEtapaTareaActor":idEdeEtapaTareaActor,
            "calibracion":calibracion
        };

        var result = await api.execApi(request.hostname(),'/Desempeno/Proceso/updateCalibracion',obj);  
        console.log('******salio hrm updateCalibracion');
    } catch (e) {
        console.log(e);
        
    }
    return {mensaje:"ok"}
    }
}