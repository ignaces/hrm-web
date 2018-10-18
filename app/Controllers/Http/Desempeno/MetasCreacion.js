'use strict'

const api = use('App/Utils/Data')

class MetasCreacion {
    

    async creacion ({view,request, response, auth, session}) {
        
        var idPersona = session.get('idPersona', 'fail')
        var idProceso = session.get("idProceso")
        var idProcesoEtapa=request.input("idProcesoEtapa")

        var datosProceso=session.get('dataProceso')
       
        var objEtapaProceso = {
            "idProceso":idProceso,
            "idProcesoEtapa":idProcesoEtapa
        };

        var resultEtapasProceso=await api.execApi(request.hostname(),'/Desempeno/Proceso/getEtapasProceso',objEtapaProceso);
        var etapasProceso =resultEtapasProceso.body.data;
        var obj = {
            "idProceso":idProceso,
            "idPersona": idPersona
        };
        var resultPersonaEde =await api.execApi(request.hostname(),'/Desempeno/Proceso/getProcesoPersona',obj);
        var PersonaEde =resultPersonaEde.body.data;
       
        //AUTO
        var objAuto = {
            "idProcesoEtapa":idProcesoEtapa,
            "idPersona": idPersona,
            "idPersonaSuperior": ""
        };
        ////console.log(objAuto)
        var resultPersonaAuto =await api.execApi(request.hostname(),'/Desempeno/Metas/getDataPersonasCreacionMetas',objAuto);
        var PersonaAuto =resultPersonaAuto.body.data;
        
        ////console.log("4")
        
         //SUPERIOR
        var objSupe = {
            "idProcesoEtapa":idProcesoEtapa,
            "idPersona": "",
            "idPersonaSuperior": idPersona
        };
        var resultPersonaSupe =await api.execApi(request.hostname(),'/Desempeno/Metas/getDataPersonasCreacionMetas',objSupe);
        var PersonaSupe =resultPersonaSupe.body.data;

       //WIDGET CREACION DE METAS PROPIAS
       var widgets=[];
        
       var widgetMetasPropias= {
            id:PersonaAuto[0].idEdePersonaEtapa,
            columna:"col-md-4",
            icono:"fa fa-flag-checkered",
            titulo:"Mi Revisión",
            numero:'',//PersonaAuto[0].numeroMetas,
            subtitulo:PersonaAuto[0].textoEstado,
            fondo:PersonaAuto[0].colorEstado
       };

       widgets.push(widgetMetasPropias)

       //WIDGET CREACION DE METAS EQUIPO
        var objCola = {
        "idProcesoEtapa":idProcesoEtapa,
        "idPersonaSuperior": idPersona
        };
        var resultDataCola =await api.execApi(request.hostname(),'/Desempeno/Proceso/getCuentaEstados',objCola);
        var dataCola =resultDataCola.body.data;
        
        var total=0;
        var cuentaFin=0;
        var cuentaNoIni=0;
        for ( var i in dataCola)
        {
            total=total+dataCola[i].cuenta;
            if(dataCola[i].codigo="VALIDADAS")
            {
                cuentaFin=dataCola[i].cuenta;
            };
            if(dataCola[i].codigo="NOINICIADO")
            {
                cuentaNoIni=dataCola[i].cuenta;
            };
        };
        var widgetMetasCol= {
            id:"2",
            columna:"col-md-4",
            icono:"fa fa-group",
            titulo:"Colaboradores con Revisión",
            numero:`0 %`,
            avance:`0 %`,
            subtitulo:`0 de  ${total}  colaboradores`,
            color:"danger"
       };
        if (cuentaFin==total)
        {
            var widgetMetasCol= {
                id:"2",
                columna:"col-md-4",
                icono:"fa fa-group",
                titulo:"Colaboradores con Revisión",
                numero:`100 %`,
                avance:`100 %`,
                subtitulo:`${total} de  ${total}  colaboradores`,
                fondo:"success"
           };
        }else{
            if(cuentaNoIni==total)
            {
                var widgetMetasCol= {
                    id:"2",
                    columna:"col-md-4",
                    icono:"fa fa-group",
                    titulo:"Colaboradores con Revisión",
                    numero:`0 %`,
                    avance:`0 %`,
                    subtitulo:`0 de  ${total}  colaboradores`,
                    fondo:"danger"
               };
            }
            else
            {
                var porce=0;
                if(total>0)
                {
                    porce=((cuentaFin/total)*100).toFixed(1);
                };
                var widgetMetasCol= {
                    id:"2",
                    columna:"col-md-4",
                    icono:"fa fa-group",
                    titulo:"Colaboradores con Revisión",
                    numero:`${porce} %`,
                    avance:`${porce} %`,
                    subtitulo:`${cuentaFin} de  ${total}  colaboradores`,
                    fondo:"warning"
               };
            }
        };
        widgets.push(widgetMetasCol)

        //WIDGET DATOS PROCESO

        var widgetMetasProceso= {
            id:"3",
            columna:"col-md-4",
            fondo:"navy",
            icono:"fa fa-calendar-check-o",
            titulo:"Fecha Cierre de la Etapa",
            numero:etapasProceso[0].fecha_termino,
            avance:"100%",
            subtitulo:`${etapasProceso[0].diasfaltan} días para el cierre`
       };

        widgets.push(widgetMetasProceso)
      
        return view.render('/desempeno/metas/creacion/creacion',{datosProceso,PersonaEde,widgets,PersonaAuto,PersonaSupe,etapasProceso});
    }

    async lista ({view,request, response, auth, session}) {
        
        var idPersona = session.get('idPersona', 'fail')
        var idProceso = session.get("idProceso")
        var idProcesoEtapa=request.input("idProcesoEtapa")
        var idColaborador=request.input("idColaborador")
        ////console.log(idColaborador);
        var datosProceso=session.get('dataProceso')

        var objEtapaProceso = {
            "idProceso":idProceso,
            "idProcesoEtapa":idProcesoEtapa
        };

        var resultEtapasProceso=await api.execApi(request.hostname(),'/Desempeno/Proceso/getEtapasProceso',objEtapaProceso);
        var etapasProceso =resultEtapasProceso.body.data;

        //COLABORADOR
        var objColaborador = {
            "idProcesoEtapa":idProcesoEtapa,
            "idPersona": idColaborador,
            "idPersonaSuperior": ""
        };
        var resultColaborador =await api.execApi(request.hostname(),'/Desempeno/Metas/getDataPersonasCreacionMetas',objColaborador);
        var colaborador =resultColaborador.body.data;
        ////console.log(colaborador);
        ////console.log(objColaborador);

        //WIDGETS
        var widgets=[];
        var widget1= {
            id:"1",
            columna:"col-md-12",
            fondo:colaborador[0].colorEstado,
            icono:"fa fa-flag-checkered",
            titulo:"Metas Propias",
            numero:colaborador[0].numeroMetas,
            avance:"100%",
            subtitulo:colaborador[0].textoEstado
        }
        widgets.push(widget1)

        //ALERTA - BOTON CREACIÓN
        var numeroMetas=colaborador[0].numeroMetas;
        var ponderacionMetas=colaborador[0].ponderacionMetas;
        var numeroMinimo=colaborador[0].numeroMinimo;
        var numeroMaximo=colaborador[0].numeroMaximo;
        var puedeCrear="NO"
        if(numeroMetas<numeroMaximo){
            if(ponderacionMetas<100){
                puedeCrear="SI"
            }
        }
        ////console.log(puedeCrear)

        //INSTRUCCIONES

        //COLUMNAS
        var objDataColumnas = {
            "idProceso":idProceso
        };
        var resultDataColumnas =await api.execApi(request.hostname(),'/Desempeno/Metas/getMetasColumnas',objDataColumnas);
        var dataColumnas =resultDataColumnas.body.data;
        ////console.log(dataColumnas);

        //METAS
        var objDataMetas = {
            "idProceso":idProceso,
            "idProcesoEtapa":idProcesoEtapa,
            "idPerfilMeta": colaborador[0].idEdeMetaPerfil,
            "idProcesoPersona": colaborador[0].idEdeProcesoPersona,
            "eliminada":0

        };
        var resultDataMetas =await api.execApi(request.hostname(),'/Desempeno/Metas/getMetasColaborador',objDataMetas);
        var dataMetas =resultDataMetas.body.data;
        ////console.log(dataMetas);
      
        return view.render('/desempeno/metas/creacion/listaMetas',{datosProceso,etapasProceso,widgets,colaborador,puedeCrear,dataMetas,dataColumnas});
    }

    async metaNueva ({view,request, response, auth, session}) {
        
        var idPersona = session.get('idPersona', 'fail')
        var idProceso = session.get("idProceso")
        var idProcesoEtapa=request.input("idProcesoEtapa")
        var idColaborador=request.input("idColaborador")
        var datosProceso=session.get('dataProceso')

        var objEtapaProceso = {
            "idProceso":idProceso,
            "idProcesoEtapa":idProcesoEtapa
        };

        var resultEtapasProceso=await api.execApi(request.hostname(),'/Desempeno/Proceso/getEtapasProceso',objEtapaProceso);
        var etapasProceso =resultEtapasProceso.body.data;

        //COLABORADOR
        var objColaborador = {
            "idProcesoEtapa":idProcesoEtapa,
            "idPersona": idColaborador,
            "idPersonaSuperior": ""
        };
        var resultColaborador =await api.execApi(request.hostname(),'/Desempeno/Metas/getDataPersonasCreacionMetas',objColaborador);
        var colaborador =resultColaborador.body.data;

        //WIDGETS
        var widgets=[];
        var widget1= {
            id:"1",
            columna:"col-md-12",
            fondo:colaborador[0].colorEstado,
            icono:"fa fa-flag-checkered",
            titulo:"Metas Propias",
            numero:colaborador[0].numeroMetas,
            avance:"100%",
            subtitulo:colaborador[0].textoEstado
        }
        widgets.push(widget1)

        //COLUMNAS
        var objDataColumnas = {
        "idProceso":idProceso
        };
        var resultDataColumnas =await api.execApi(request.hostname(),'/Desempeno/Metas/getMetasColumnas',objDataColumnas);
        var dataColumnas =resultDataColumnas.body.data;
        ////console.log(dataColumnas);

        return view.render('/desempeno/metas/creacion/nuevaMeta',{datosProceso,etapasProceso,colaborador,widgets,dataColumnas});

    }

    async metaEditar ({view,request, response, auth, session}) {
        
        var idPersona = session.get('idPersona', 'fail')
        var idProceso = session.get("idProceso")
        var idProcesoEtapa=request.input("idProcesoEtapa")
        var idColaborador=request.input("idColaborador")
        var idMeta=request.input("idMeta")
        var datosProceso=session.get('dataProceso')

        var objEtapaProceso = {
            "idProceso":idProceso,
            "idProcesoEtapa":idProcesoEtapa
        };

        var resultEtapasProceso=await api.execApi(request.hostname(),'/Desempeno/Proceso/getEtapasProceso',objEtapaProceso);
        var etapasProceso =resultEtapasProceso.body.data;

        //COLABORADOR
        var objColaborador = {
            "idProcesoEtapa":idProcesoEtapa,
            "idPersona": idColaborador,
            "idPersonaSuperior": ""
        };
        var resultColaborador =await api.execApi(request.hostname(),'/Desempeno/Metas/getDataPersonasCreacionMetas',objColaborador);
        var colaborador =resultColaborador.body.data;

        //WIDGETS
        var widgets=[];
        var widget1= {
            id:"1",
            columna:"col-md-12",
            fondo:colaborador[0].colorEstado,
            icono:"fa fa-flag-checkered",
            titulo:"Metas Propias",
            numero:colaborador[0].numeroMetas,
            avance:"100%",
            subtitulo:colaborador[0].textoEstado
        }
        widgets.push(widget1)

        //COLUMNAS
        var objDataColumnas = {
        "idProceso":idProceso
        };
        var resultDataColumnas =await api.execApi(request.hostname(),'/Desempeno/Metas/getMetasColumnas',objDataColumnas);
        var dataColumnas =resultDataColumnas.body.data;
        ////console.log(dataColumnas);

        //META
        var objDataMetas = {
            "idProceso":idProceso,
            "idProcesoEtapa":idProcesoEtapa,
            "idPerfilMeta": colaborador[0].idEdeMetaPerfil,
            "idProcesoPersona": colaborador[0].idEdeProcesoPersona,
            "idMeta":idMeta

        };
        var resultDataMetas =await api.execApi(request.hostname(),'/Desempeno/Metas/getMetasColaborador',objDataMetas);
        var dataMetas =resultDataMetas.body.data;

        return view.render('/desempeno/metas/creacion/editarMeta',{datosProceso,etapasProceso,colaborador,widgets,dataColumnas,dataMetas});

    }

}

module.exports = MetasCreacion