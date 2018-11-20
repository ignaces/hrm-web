'use strict'
const api = use('App/Utils/Data');

class EdeEtapaTareaController {
    async getByEdeEtapaId({request, response}) {
        var obj = {
            "ede_etapa_id" : request.input("ede_etapa_id")
        };
        try {
            var ede_etapa_tarea_list_temp = await api.execApi(
                request.hostname(),'/Entity/EdeEtapaTareaController/getByEdeEtapaId', obj);
            var ede_etapa_tarea_list = ede_etapa_tarea_list_temp.body.data;
            return ede_etapa_tarea_list;
        } catch (e) {
            console.log('error al obtener lista de ede-etapa-tarea =[' + e + ']');
        }
        return null;
    }
}

module.exports = EdeEtapaTareaController
