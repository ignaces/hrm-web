'use strict'
const api = use('App/Utils/Data');

class EdeEtapaController {
    async getByEdeProceso({request, response}) {
        var obj = {
            "edeproceso_id" : request.input("edeproceso_id")
        };
        try {
            var etapa_list_temp = await api.execApi(
                request.hostname(),'/Entity/EdeEtapaController/getByEdeProceso', obj);
            var etapa_list = etapa_list_temp.body.data;
            return etapa_list;
        } catch (e) {
            console.log('error al obtener lista de etapas =[' + e + ']');
        }
        return null;
    }
}

module.exports = EdeEtapaController
