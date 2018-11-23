'use strict'
const api = use('App/Utils/Data');
const Antl = use('Antl');


class ParticipanteController {

    async index ({view, request, response, auth, session}) {
        var proceso_id = request.input('proceso_id');

        var objeto = {
            tabla:"Genero"
        };

        var void_obj = {};

        try {
            var resultado = await api.execApi(request.hostname(), '/Utils/Listar/getCombo', objeto);

            try {
                var pais_list_temp = await api.execApi(request.hostname(), '/Entity/PaisController/getAll', void_obj);
                var pais_list = pais_list_temp.body.data;
            } catch (e) {
                console.log('error al obtener lista de paises =[' + e + ']');
            }

            try {
                var proceso_list_temp = await api.execApi(
                    request.hostname(), '/Entity/EdeProcesoController/getAll', void_obj);
                var proceso_list = proceso_list_temp.body.data;
            } catch (e) {
                console.log('error al obtener lista de procesos =[' + e + ']');
            }

            try {
                var accion_list_temp = await api.execApi(
                    request.hostname(), '/Entity/EdeAccionController/getAll', void_obj);
                var accion_list = accion_list_temp.body.data;
            } catch (e) {
                console.log('error al obtener lista de acciones =[' + e + ']');
            }

            var comboGenero = resultado.body;
            //> lista de participantes
            //var obj = {'proceso_id' : proceso_id}
            //var participante_list_temp = await api.execApi(request.hostname(), '/Desempeno/Participante/getParticipanteListByProcesoId', obj);
            //console.log(participantes_list_temp);
            //var participante_list = participante_list_temp.body.data;
            //<

            //return view.render('/administracion/modulos/desempeno/participantes', {proceso_id, participante_list});
            return view.render(
                '/administracion/modulos/desempeno/participantes',
                {proceso_list, accion_list, pais_list, proceso_id, comboGenero:comboGenero.data});
        } catch (e) {
            console.log(e);
        }

    }

    async getParticipanteListByProcesoId({request, response}) {
        console.log('access app =[hrm] class =[ParticipanteController] method =[getParticipanteListByProcesoId]');
        var obj = {
            "data_start" : request.input("start"),
            "data_lenght" : request.input("length"),
            "proceso_id" : request.input("idEde")
        };

        var participante_counter = null;
        var participante_list_temp = null;
        try {
            participante_counter = await api.execApi(
                request.hostname(),'/Desempeno/Participante/getParticipanteCounterByProcesoId', obj);
        } catch (e) {
            console.log('error =[' + e + ']');
        }
        try {
            participante_list_temp = await api.execApi(
                request.hostname(),'/Desempeno/Participante/getParticipanteListByProcesoId', obj);
        } catch (e) {
            console.log('error =[' + e + ']');
        }
        var result_json = null;
        try {
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
        } catch (e) {
            console.log('error =[' + e + ']');
        }
        console.log('exit app =[hrm] class =[ParticipanteController] method =[getParticipanteListByProcesoId]');
        return result_json;
    }

    async addParticipante({view, request, response}) {
        return '{"result":"ok"}';
    }

    
}

module.exports = ParticipanteController
