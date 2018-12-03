'use strict'
const api = use('App/Utils/Data');

class EdeEtapaTareaAccionController {
    async getBy$EdeEtapaTareaId({request, response}) {
        var obj = {
            "ede_etapa_tarea_id" : request.input("ede_etapa_tarea_id")
        };
        try {
            var ede_etapa_tarea_accion_list_temp = await api.execApi(
                request.hostname(),'/Entity/EdeEtapaTareaAccionController/getBy$EdeEtapaTareaId', obj);
            var ede_etapa_tarea_accion_list = ede_etapa_tarea_accion_list_temp.body.data;
            return ede_etapa_tarea_accion_list;
        } catch (e) {
            console.log('error al obtener lista de ede-etapa-tarea-accion =[' + e + ']');
        }
        return null;
    }
}

module.exports = EdeEtapaTareaAccionController
