'use strict'
const api = use('App/Utils/Data');

class EdeEtapaTareaAccionProcesoPersonaController {
    async getBy$PersonaIdentificador$EdeProcesoId$EdeEtapaTareaAccionId({request, response}) {
        console.log('hrm / Entity / EdeEtapaTareaAccionProcesoPersonaController / validate / access');
        var persona_identificador =  request.input("persona_identificador");
        var ede_proceso_id =  request.input("ede_proceso_id");
        var ede_etapa_tarea_accion_id =  request.input("ede_etapa_tarea_accion_id");
        var obj = {
            persona_identificador : persona_identificador,
            ede_proceso_id : ede_proceso_id,
            ede_etapa_tarea_accion_id : ede_etapa_tarea_accion_id
        };
        var result_json = null;
        try {
            result_json = await api.execApi(
request.hostname(),
'/Entity/EdeEtapaTareaAccionProcesoPersonaController/getBy$PersonaIdentificador$EdeProcesoId$EdeEtapaTareaAccionId',
obj);
        } catch (err) {
            console.log("********error =" + err);
        }
        /*
        var result_json = null;

        var persona_identificador =  request.input("persona_identificador");
        var proceso_id = request.input("proceso_id");

        var obj = {
            persona_id : persona_id,
            proceso_id : proceso_id,
            persona_identificador : persona_identificador
        };

        //> validar si persona existe
        try {
            var result = await api.execApi(
                request.hostname(),'/Persona/Persona/getPersonaByIdentificador', obj);
            if (result.body.status.code != '0000') {
                r
                esponse.json(result.body);

                return;
            }
            obj.persona_id = result.body.data[0].id;
        } catch (e) {
            result_json = {
                "state": { "code": "0001", "message": e },
                "data": null
            };
            response.json(result_json);
            return;
        }
        //<

        //> validar si persona existe en proceso
        try {
            var result = await api.execApi(
                request.hostname(),'/Entity/EdeProcesoPersonaController/get', obj);
            console.log('resultado semifinal =[' + JSON.stringify(result.body) + ']');
            if (result.body.status.code != '0000') {
                response.json(result.body);
                return;
            }

        } catch (e) {
            result_json = {
                "status": { "code": "0001", "message": e },
                "data": null
            };
            response.json(result_json);
        }
        //<
*/
        response.json(result_json.body);
    }
}

module.exports = EdeEtapaTareaAccionProcesoPersonaController
