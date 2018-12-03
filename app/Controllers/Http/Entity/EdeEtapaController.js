'use strict'
const api = use('App/Utils/Data');

class EdeEtapaController {
    async getBy$EdeProceso({request, response}) {
        var obj = {
            "ede_proceso_id" : request.input("ede_proceso_id")
        };
        try {
            var etapa_list_temp = await api.execApi(
                request.hostname(),'/Entity/EdeEtapaController/getBy$EdeProceso', obj);
            var etapa_list = etapa_list_temp.body.data;
            return etapa_list;
        } catch (e) {
            console.log('error al obtener lista de etapas =[' + e + ']');
        }
        return null;
    }
}

module.exports = EdeEtapaController
