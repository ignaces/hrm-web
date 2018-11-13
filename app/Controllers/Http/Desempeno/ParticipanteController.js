'use strict'

const api = use('App/Utils/Data');
const Antl = use('Antl');


class ParticipanteController {

    async index ({view, request, response, auth, session}) {
        var proceso_id = request.input('proceso_id');

        //> lista de participantes
        //var obj = {'proceso_id' : proceso_id}
        //var participante_list_temp = await api.execApi(request.hostname(), '/Desempeno/Participante/getParticipanteListByProcesoId', obj);
        //console.log(participantes_list_temp);
        //var participante_list = participante_list_temp.body.data;
        //<

        //return view.render('/administracion/modulos/desempeno/participantes', {proceso_id, participante_list});
        return view.render('/administracion/modulos/desempeno/participantes', {proceso_id});
    }

    async getParticipanteListByProcesoId({view, request, response}) {
        var obj = {
            "data_start" : request.input("start"),
            "data_lenght" : request.input("length"),
            "proceso_id" : request.input("idEde")
        };

        var participante_counter = await api.execApi(
            request.hostname(),'/Desempeno/Participante/getParticipanteCounterByProcesoId', obj);
        var participante_list_temp = await api.execApi(
            request.hostname(),'/Desempeno/Participante/getParticipanteListByProcesoId', obj);

        var participante_array = [];
        var participante_list = participante_list_temp.body.data;
        for (var k in participante_list) {
            var temp = [
                '<img src="' + participante_list[k].persona_foto + '" class="img-circle img-thumbnail" alt="profile-image" width="48px"></img>',
                participante_list[k].persona_nombres,
                participante_list[k].persona_apellido_paterno,
                participante_list[k].persona_apellido_materno,
                participante_list[k].persona_identificador,
                participante_list[k].persona_pais_desc,
                '<a href="/Administracion/desempeno/fichaParticipante?idProceso=' + participante_list[k].proceso_id + '&idPersona=' + participante_list[k].persona_id + '" class="btn btn-success btn-xs btn-rounded btn-bordered waves-effect w-md">'+
                '<i class="fa fa-plus"></i> Ficha </a>'
            ];
            participante_array.push(temp);
        }

        var result_json = {
            "draw": request.input("draw"),
            "recordsTotal": participante_counter.body.data[0].counter,
            "recordsFiltered": participante_counter.body.data[0].counter,
            "data": participante_array
        }

        return result_json;
    }

}

module.exports = ParticipanteController
