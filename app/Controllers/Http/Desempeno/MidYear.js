'use strict'

const api = use('App/Utils/Data')

class MidYear {

    async portada ({view,request, response, auth, session}) {
        
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

        //AUTO
        var objAuto = {
            "idProcesoEtapa":idProcesoEtapa,
            "idPersona": idPersona,
            "idPersonaSuperior": ""
        };
        ////console.log(objAuto)
        var resultPersonaAuto =await api.execApi(request.hostname(),'/Desempeno/Metas/getDataPersonasCreacionMetas',objAuto);
        var PersonaAuto =resultPersonaAuto.body.data;

        //SUPERIOR
        var objSupe = {
            "idProcesoEtapa":idProcesoEtapa,
            "idPersona": "",
            "idPersonaSuperior": idPersona
        };
        var resultPersonaSupe =await api.execApi(request.hostname(),'/Desempeno/Metas/getDataPersonasCreacionMetas',objSupe);
        var PersonaSupe =resultPersonaSupe.body.data;

        
        //Widgets
        var widgets=[];
        
        var widgetMetasPropias= {
             id:PersonaAuto[0].idEdePersonaEtapa,
             columna:"col-md-4",
             icono:"fa fa-flag-checkered",
             titulo:"Metas Propias",
             numero:PersonaAuto[0].numeroMetas,
             subtitulo:PersonaAuto[0].textoEstado,
             fondo:PersonaAuto[0].colorEstado
        };
 
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
                titulo:"Colaboradores con Metas",
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
                    titulo:"Colaboradores con Metas",
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
                        titulo:"Colaboradores con Metas",
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
                        titulo:"Colaboradores con Metas",
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



        //COLABORADOR
        var objColaborador = {
            "idProcesoEtapa":idProcesoEtapa,
            "idPersona": idColaborador,
            "idPersonaSuperior": ""
        };
        var resultColaborador =await api.execApi(request.hostname(),'/Desempeno/Metas/getDataPersonasCreacionMetas',objColaborador);
        var colaborador =resultColaborador.body.data;

       
        return view.render('/desempeno/midyear/portada',{datosProceso,etapasProceso,colaborador});

    }


}

module.exports = MidYear