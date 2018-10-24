'use strict'

const api = use('App/Utils/Data')
const Antl = use('Antl');

class Proceso {
    
    
    async portada ({view,request, response, auth, session, antl}) {
        
        var idPersona = session.get('idPersona', 'fail')
        var idProceso = request.input("idProceso")
        //cencosud brasil
        antl.switchLocale('es');
        if(idProceso == '8af63afd-c680-11e8-8771-bc764e100f2b')
        {
            antl.switchLocale('pt');
            ////console.log(antl)
        }
        

        //console.log(request.all());
        session.put('idProceso',idProceso);
        
        //Datos Proceso
        var objDatosProceso = {
            "idProceso":idProceso,
            idEstado:""
        };
        var resultProceso =await api.execApi(request.hostname(),'/Desempeno/Proceso/getProcesos',objDatosProceso);
        var datosProceso =resultProceso.body.data[0];

        session.put('dataProceso',datosProceso)
        ////console.log(datosProceso);

        //Etapas Proceso
        var objEtapasProceso = {
            "idProceso":idProceso,
            "idEtapa":""
        };
        var resultEtapasProceso=await api.execApi(request.hostname(),'/Desempeno/Proceso/getEtapas',objEtapasProceso);
        var etapasProceso =resultEtapasProceso.body.data;
        ////console.log(etapasProceso);

        //Menu Contextual
        var objMenuContextual = {
            "idProceso":idProceso,
            idEstado:"1"
        };
        var resultMenu =await api.execApi(request.hostname(),'/Desempeno/Proceso/getMenuUsuario',objMenuContextual);
        var datosMenu =resultMenu.body.data;
        //
        //////console.log(datosMenu);
        //Datos Persona
        var user={usuario:auth.user}
        var persona = session.get('personaLogueada')

        var objdatosPersona = {
            "idProceso":idProceso,
            "idPersona":idPersona
        };
        //////console.log(idProceso)
        //////console.log(idPersona)
        var resultPersonaEde =await api.execApi(request.hostname(),'/Desempeno/Proceso/getProcesoPersona',objdatosPersona);
        var PersonaEde =resultPersonaEde.body.data;
        
        //
        //Etapa
        var objEtapa = {
            "idProceso":idProceso,
            "idEtapa":""
        };
        var resultEtapa=await api.execApi(request.hostname(),'/Desempeno/Proceso/getEtapas',objEtapa);
        var etapa =resultEtapa.body.data;
        //

        //Tareas
        var objTareas = {
            "idEtapa":"76aad0d8-52fe-11e8-8fb3-bc764e100f2b",
            "idTareaEtapa":""
        };
        var resultTareas=await api.execApi(request.hostname(),'/Desempeno/Proceso/getTareasEtapas',objTareas);
        var tareas =resultTareas.body.data;      
        //
        var cliente = request.hostname().split(".")[0]
        if(cliente=="localhost"){
            cliente="hrmdev"
        }
        
        var objMensaje = {
            "idProceso":idProceso
        };

        var mensaje = await api.execApi(request.hostname(),'/Desempeno/Proceso/getMensaje', objMensaje);
        var mensajeResult =mensaje.body.data;

        var etag = `app_${cliente}`
        var texto = "";
        var mensajeTitulo = "";
        console.log(mensajeResult[0])
        if(mensajeResult.length > 0)
        {
            texto = mensajeResult[0].mensaje;
            mensajeTitulo = "";
        }
        return view.render('desempeno/portada',{etag, etapasProceso,datosMenu,persona,PersonaEde,datosProceso,etapa,tareas,mensaje:texto,mensajeTitulo});
    }


    async getTareasEtapa({view,request, response, auth, session}){

        var idProceso = request.input("idProceso");
        var idEtapa = request.input("idEtapa");
        //Etapa
        var objEtapa = {
            "idProceso":idProceso,
            "idEtapa":idEtapa
        };
        var resultEtapa=await api.execApi(request.hostname(),'/Desempeno/Proceso/getEtapas',objEtapa);
        var etapa =resultEtapa.body.data;
        //

        //Tareas
        var objTareas = {
            "idEtapa":idEtapa,
            "idTareaEtapa":""
        };
        var resultTareas=await api.execApi(request.hostname(),'/Desempeno/Proceso/getTareasEtapas',objTareas);
        var tareas =resultTareas.body.data;

        etapa.tareas=tareas;
        return etapa;
    }


    async etapa ({view,request, response, auth, session, params, antl}) {
        //////console.log("A");
        var idPersona = session.get('idPersona', 'fail')
        var idEtapa = request.input("idEtapa")
        var idProceso = session.get('idProceso')
        var datosProceso=session.get('dataProceso')

        //cencosud brasil
        if(idProceso == '8af63afd-c680-11e8-8771-bc764e100f2b') 
        {
            antl.switchLocale('pt');
            ////console.log(antl)
        }
        ////console.log(datosProceso);

        session.put('idEtapa',idEtapa)
        session.put('referer',`/Desempeno/Proceso/etapa?idEtapa=${idEtapa}`)

        //Datos Persona
        var user={usuario:auth.user}
        var persona = session.get('personaLogueada')

        var objdatosPersona = {
            "idProceso":idProceso,
            "idPersona":idPersona
        };

        var resultPersonaEde =await api.execApi(request.hostname(),'/Desempeno/Proceso/getProcesoPersona',objdatosPersona);
        var PersonaEde =resultPersonaEde.body.data;

        //Menu Contextual
        var objMenuContextual = {
            "idProceso":idProceso,
            idEstado:"1"
        };
        var resultMenu =await api.execApi(request.hostname(),'/Desempeno/Proceso/getMenuUsuario',objMenuContextual);
        var datosMenu =resultMenu.body.data;
        //

        //Etapa
        var objEtapa = {
            "idProceso":idProceso,
            "idEtapa":idEtapa
        };
        var resultEtapa=await api.execApi(request.hostname(),'/Desempeno/Proceso/getEtapas',objEtapa);
        var etapa =resultEtapa.body.data;

        //
        ////console.log("AA")
        ////console.log(idEtapa)
        ////console.log(idPersona)
        var cliente = request.hostname().split(".")[0]
        if(cliente=="localhost"){
            cliente="hrmdev"
        }

        var etag = `app_${cliente}`
         //Lista EVAL
        var objEval={
            "idEtapa":idEtapa,
	        "idPersonaActor":idPersona,
            "codigoActor":"EVAL",
            "idAccionPersona":""
        }
        console.log(objEval);
        var resultEval = await api.execApi(request.hostname(),'/Desempeno/Proceso/getListaEvaluados',objEval);
        var listaEval = resultEval.body.data;      
        //
        
        
               
         //Lista Supe
         var objSupe={
            "idEtapa":idEtapa,
	        "idPersonaActor":idPersona,
            "codigoActor":"SUPE",
            "idAccionPersona":"" 
        }
        var resultSupe=await api.execApi(request.hostname(),'/Desempeno/Proceso/getListaEvaluados',objSupe);
        var listaSupe =resultSupe.body.data;      
        //
        //////console.log(objSupe)

        //Lista Asce
        var objAsc={
            "idEtapa":idEtapa,
	        "idPersonaActor":idPersona,
            "codigoActor":"ASC",
            "idAccionPersona":"" 
        }
        //////console.log(objAsc);
        var resultAsc=await api.execApi(request.hostname(),'/Desempeno/Proceso/getListaEvaluados',objAsc);
        var listaAsc =resultAsc.body.data;  

        //Lista Func
        var objFunc={
            "idEtapa":idEtapa,
	        "idPersonaActor":idPersona,
            "codigoActor":"FUNC",
            "idAccionPersona":"" 
        }
        //////console.log(objFunc);
        var resultFunc=await api.execApi(request.hostname(),'/Desempeno/Proceso/getListaEvaluados',objFunc);
        var listaFunc =resultFunc.body.data;  
        
        return view.render('desempeno/etapa',{etag, datosProceso,PersonaEde,datosMenu,etapa,listaEval,listaSupe,listaAsc,listaFunc, idEtapa: idEtapa});
    }

    async evalBrasil ({view,request, response}) {
        return view.render('desempeno/evalBrasil');
    }
    async getHistoricos ({view,request, response}) {
        var idEvaluado=request.input("idEvaluado");

        var obj={
            "idProcesoPersona":idEvaluado
        }
        

        var result=await api.execApi(request.hostname(),'/Desempeno/Reporte/getIdentificador',obj);
        var persona =result.body.data; 
        
        var identificador = "";
        if(persona.length>0)
        {
            identificador = persona[0].identificador;
        }

        
        var archivos=[
            {
                id:"ejecutivos_2017",
                periodo:"2017",
                identificador:identificador
            }/*,
            {
                id:"121212",
                periodo:"2016"
            }
            ,
            {
                id:"121212",
                periodo:"2015"
            }*/
            
        ];
        
        return archivos;
    }
    

    async evalGrupal ({view,request, response,session}) {
        var idPersona = session.get('idPersona', 'fail')
        var idEtapa = session.get("idEtapa")
        var idProceso = session.get('idProceso')
        var datosProceso=session.get('dataProceso')

        var objEval={
            "idEtapa":idEtapa,
	        "idEvaluador":idPersona,
            "idProceso":idProceso
        }
        var resultFunc=await api.execApi(request.hostname(),'/Desempeno/Proceso/getListaEvaluadosGrupal',objEval);
        var eGrupal = resultFunc.body.data;
        
        return view.render('desempeno/evaluacionGrupal',{competencias:eGrupal.competencias,evaluados:eGrupal.evaluados,idProceso,idEtapa});
    }

    async portadaBrasil ({view,request, response}) {
        return view.render('desempeno/portadaBrasil');
    }

    async etapaBrasil ({view,request, response}) {
        return view.render('desempeno/etapaBrasil');
    }
 
    async autoEvalBrasil ({view,request, response}) {
        return view.render('desempeno/autoEvalBrasil');
    }

    async informeBrasil ({view,request, response}) {
        return view.render('desempeno/informeBrasil');
    }

    async informeEjecutivos ({view,request, response, auth, session, antl}) {
        //var idOpinante = all.idOpinante
        var idPersona = session.get('idPersona', 'fail')    
        var idOpinante  = request.input("idOpinante");
        var idProceso   = request.input("idProceso");
        var idEtapa     = request.input("idEtapa");
        var codigo     = request.input("codigoActor");
        var idAccionPersona     = request.input("idAccionPersona");

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
        var persona = session.get('personaLogueada')

        var objdatosPersona = {
            "idProceso":idProceso,
            "idPersona":idPersona
        };
        //////console.log(idProceso)
        //////console.log(idPersona)
        var resultPersonaEde =await api.execApi(request.hostname(),'/Desempeno/Proceso/getProcesoPersona',objdatosPersona);
        var PersonaEde =resultPersonaEde.body.data;
        

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
        return view.render('desempeno/informeEjecutivos', {idPersona: persona.id, idAccionPersona:idAccionPersona, codigoActor:codigo,datosMenu,persona,PersonaEde,etapa, idOpinante: idOpinante, instrumento: instrumento, idProceso: idProceso, idEtapa: idEtapa, escala: escala.body.data, promedioGeneral: promedioGeneral.body, competenciasSpider:competenciasSpider, valoresSpiderAuto:valoresSpiderAuto });
    } 

    

    async portadaEjecutivos({view,request, response}) {
        return view.render('desempeno/portadaEjecutivos');
    }

    async etapaEjecutivos ({view,request, response}) {
        return view.render('desempeno/etapaEjecutivos');
    }

    async evalEjecutivos ({view,request, response, auth}) {
            
            //var idOpinante = all.idOpinante
            
            var idOpinante  = request.input("idOpinante");
            var idProceso   = request.input("idProceso");
            var idEtapa     = request.input("idEtapa");
            var codigo     = request.input("codigoActor");
            
            //var codigo = all.codigo
            //var codigoComponente = all.codigoComponente
    
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
                "codigoActor": codigo,
                "idProceso": idProceso
            };
            var result3 = await api.execApi(request.hostname(),'/Evaluacion/Instrumento/getPromedioGeneral',objPromedio);

            //console.log(result2);
            var codigoAct = "";
            var promedioGeneral;
            

            if(promedioGeneral.body[0].codigoActor != undefined)
            {
                codigoAct = promedioGeneral.body[0].codigoActor
            }
            else
            {
                codigoAct = "";
            }
            try{
                promedioGeneral = result3;
            }
                catch(e)
            {}
           
            

        return view.render('desempeno/evalEjecutivos', { idOpinante: idOpinante, instrumento: instrumento, idProceso: idProceso, idEtapa: idEtapa, escala: escala.body.data, promedioGeneral: promedioGeneral.body, codigoActor: codigoAct});
    }

    async evalComportamientosEjecutivos ({view,request, response}) {
        return view.render('desempeno/evalComportamientosEjecutivos');
    }

    async evalComportamientosEjecutivosEquipo ({view,request, response}) {
        return view.render('desempeno/evalComportamientosEjecutivosEquipo');
    }

}

module.exports = Proceso