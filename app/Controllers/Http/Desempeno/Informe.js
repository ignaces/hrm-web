'use strict'

const api = use('App/Utils/Data')
var wget = require('node-wget-promise');
class Accion {

    //---->> PUBLICAR METAS

    async meta({ view, request, response, auth, session }) {
        


        var idPersona = session.get('idPersona', 'fail')
        var idEtapa = request.input("idEtapa")
        var idAccionPersona = request.input("idAccionPersona")
        var codigoActor = request.input("codigoActor")
        var idProceso = session.get('idProceso')
        var datosProceso = session.get('dataProceso')

        //DataVista
        var dataVista = {
            "idProceso" : idProceso,
            "idEtapa" : idEtapa,
            "idAccionPersona" : idAccionPersona,
            "codigoActor" : codigoActor
        }

        //Data Evaluado
        var objEval = {
            "idEtapa": idEtapa,
            "idPersonaActor": idPersona,
            "codigoActor": codigoActor,
            "idAccionPersona": idAccionPersona
        }
        var resultEval = await api.execApi(request.hostname(), '/Desempeno/Proceso/getListaEvaluados', objEval);
        var listaEval = resultEval.body.data;
       ////console.log(listaEval)
        //

        var persona = {
            "foto": listaEval[0].foto,
            "nombres": listaEval[0].nombres,
            "apellidoPaterno": listaEval[0].apellidoPaterno,
            "apellidoMaterno": listaEval[0].apellidoMaterno,
            "cargo": listaEval[0].nombreCargo
        }

        var Perso = []

        Perso.push(persona);

        var idEtapaTarea = listaEval[0].tareas[0].tarea.idEtapaTarea

        //Datos Tarea
        var objDatosTarea = {
            "idEtapa": "",
            "idTareaEtapa": idEtapaTarea
        };
        var resultTarea = await api.execApi(request.hostname(), '/Desempeno/Proceso/getTareasEtapas', objDatosTarea);
        var datosTarea = resultTarea.body.data;

        //COLUMNAS
        var objDataColumnas = {
            "idProceso":idProceso
        };
        var resultDataColumnas =await api.execApi(request.hostname(),'/Desempeno/Metas/getMetasColumnas',objDataColumnas);
        var dataColumnas =resultDataColumnas.body.data;

        //METAS
        var objDataMetas = {
            "idProceso":idProceso,
            "idPerfilMeta": listaEval[0].idEdeMetaPerfil,
            "idProcesoPersona": listaEval[0].idEvaluado,
            "eliminada":0
        };
        var resultDataMetas =await api.execApi(request.hostname(),'/Desempeno/Metas/getMetasColaborador',objDataMetas);
        var dataMetas =resultDataMetas.body.data;
        
        
        //OBSERVACION
        var objObservacion = {
            "idObservacionAccion":"",
            "idEtapaTareaAccionProcesoPersona":idAccionPersona,
            "idEtapaTareaActor":""
        }
        var resultObservacion =await api.execApi(request.hostname(),'/Desempeno/Accion/getObservacionAccionColaborador',objObservacion);
        var dataObservacion =resultObservacion.body.data;
        ////console.log(dataObservacion);

        var textoObservacion="";
        if (dataObservacion.length > 0){
            textoObservacion=dataObservacion[0].observacion
        };

        ////console.log(idAccionPersona);

        //RENDER
        return view.render('desempeno/metas/informe/meta', {dataVista, datosTarea, Perso, listaEval,dataMetas,dataColumnas,dataObservacion,textoObservacion});
    }

    async pdf({ view, request, response, auth, session}) {
        
        //var idOpinante = all.idOpinante
        //var idPersona = session.get('idPersona', 'fail')    
        var idOpinante  = request.input("idOpinante");
        var idProceso   = request.input("idProceso");
        var idEtapa     = request.input("idEtapa");
        var codigo     = request.input("codigoActor");
        var idAccionPersona     = request.input("idAccionPersona");
        var idPersona = request.input("idPersona");
        var competenciasSpider = [];
        var valoresSpiderAuto = [];
        var obj = {
            "idOpinante":idOpinante
        };
        //////console.log(obj);

        var result = await api.execApi(request.hostname(),'/Evaluacion/Instrumento/getInstrumentoEde',obj);

        var instrumento = result.body;
        
        var result2 = await api.execApi(request.hostname(),'/Evaluacion/Instrumento/getEscala',obj);

        //////console.log(result2);
        var escala = result2;
        //////console.log(escala.body.data);
    
        var objPromedio = {
            "idOpinante":idOpinante,
            "codigoActor": codigo
        };
        var result3 = await api.execApi(request.hostname(),'/Evaluacion/Instrumento/getPromedioGeneral',objPromedio);

        //console.log(result2);
        var promedioGeneral = result3;
        //console.log(promedioGeneral.body[0].codigoActor)

        //Menu Contextual
        var objMenuContextual = {
            "idProceso":idProceso,
            idEstado:"1"
        };
        var resultMenu =await api.execApi(request.hostname(),'/Desempeno/Proceso/getMenuUsuario',objMenuContextual);
        var datosMenu =resultMenu.body.data;
        //

        //Datos Persona
        var user={usuario:auth.user}
       // var persona = session.get('personaLogueada')

        var objdatosPersona = {
            "idProceso":idProceso,
            "idPersona":idPersona
        };
        //////console.log(idProceso)
        console.log(idPersona)
        var resultPersonaEde =await api.execApi(request.hostname(),'/Desempeno/Proceso/getProcesoPersona',objdatosPersona);
        var PersonaEde;
        var persona =resultPersonaEde.body.data;

        //Etapa
        var objEtapa = {
            "idProceso":idProceso,
            "idEtapa":idEtapa
        };
        var resultEtapa=await api.execApi(request.hostname(),'/Desempeno/Proceso/getEtapas',objEtapa);
        var etapa =resultEtapa.body.data;
        
        promedioGeneral.body.forEach(e => {
            
            competenciasSpider.push(e.competencia);
            valoresSpiderAuto.push(e.valorAuto);
        });
        
        return view.render('desempeno/informe/informeEjecutivospdf', {datosMenu,persona,PersonaEde,etapa, idOpinante: idOpinante, instrumento: instrumento, idProceso: idProceso, idEtapa: idEtapa, escala: escala.body.data, promedioGeneral: promedioGeneral.body, competenciasSpider:competenciasSpider, valoresSpiderAuto:valoresSpiderAuto });
    
    }

    async getPdf({ view, request, response, auth }) {
        var conDetalle = request.input("cd");
        var idPersona = request.input("procesoPersona");
        var server = request.hostname().split(".")[0]+'.enovum.cl';//request.hostname();

        //var result = await got(`http://192.168.3.4:8080?url=${server}/Acreditacion/Informe/pdf?procesoPersona=${idPersona}&cd=${conDetalle}`);
        // var url = `http://192.168.3.4:8080/?url=http%3A%2F%2F${server}%2FAcreditacion%2FInforme%2Fpdf%3FprocesoPersona%3D${idPersona}%26cd%3D${conDetalle}`;
       
        var url = `http://192.168.3.4:8080/?url=http{server}%2FDesempeno%2FInforme%2Fpdf%3FidProceso%3Dca95dced-c680-11e8-8771-bc764e100f2b%26idEtapa%3D1f05c0a0-c70e-11e8-8771-bc764e100f2b%26idAccionPersona%3Dc007bb5c-d596-11e8-8771-bc764e100f2b%26codigoActor%3DEVAL%26idOpinante%3D2d15dfea-d597-11e8-8771-bc764e100f2b`;
        ////console.log(url);

        var file = await wget(url, { output: 'tmp/reporte.pdf' });

        response.type = "application/pdf";

        response.attachment(
            Helpers.tmpPath('reporte.pdf'),
            'reporte.pdf'
        )



    }



}

module.exports = Accion