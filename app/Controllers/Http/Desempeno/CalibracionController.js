'use strict'

const api = use('App/Utils/Data')
const Antl = use('Antl');

class CalibracionController {
    async updateCalibracion({request, response}) {
        try {
            var idEdeEtapaTareaActor= request.input("idEdeEtapaTareaActor");
            var calibracion= request.input("calibracion");
            
            var obj = {
                "idEdeEtapaTareaActor":idEdeEtapaTareaActor,
                "calibracion":calibracion
            };

            var result = await api.execApi(request.hostname(),'/Desempeno/Proceso/updateCalibracion',obj);  
        } catch (e) {
            console.log(e);
            
        }
        return {mensaje:"ok"}
    }
    async updateCalibracionCompleto({request, response,session}) {
        try {
            var persona= session.get('personaLogueada')
            var obj = {
                "idPersona":persona.id
            };

            var result = await api.execApi(request.hostname(),'/Desempeno/Calibracion/updateCalibracion',obj);  
        } catch (e) {
            console.log(e);
            
        }
        return {mensaje:"ok"}
    }
}

module.exports = CalibracionController