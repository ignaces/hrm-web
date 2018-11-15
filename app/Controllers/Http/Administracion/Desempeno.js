'use strict'
const api = use('App/Utils/Data')

class Desempeno {

    //----->> PROCESO

     async proceso  ({ view,request, response, auth }) {
        
       //Datos Procesos Activos
       var objDatosProcesoActivos = {
        "idProceso":"",
        "idEstado":"ACTIVO"
        };
        var resultProcesosActivos =await api.execApi(request.hostname(),'/Desempeno/Proceso/getProcesos',objDatosProcesoActivos);
        var datosProcesosActivos =resultProcesosActivos.body.data;

        ////console.log(datosProcesosActivos);

        //Datos Procesos Inactivos
        var objDatosProcesoInactivos = {
        "idProceso":"",
        "idEstado":"INACTIVO"
        };
        var resultProcesosInactivos =await api.execApi(request.hostname(),'/Desempeno/Proceso/getProcesos',objDatosProcesoInactivos);
        var datosProcesosInactivos =resultProcesosInactivos.body.data;

        ////console.log(datosProcesosInactivos);

        //Render
        return view.render('/administracion/modulos/desempeno/desempeno', {datosProcesosActivos, datosProcesosInactivos});
    }

    async fichaproceso ({view,request, response, auth, session}) {
        
        //Data
        var idProceso = request.input("idProceso")
        session.put('idProceso',idProceso); 

        //Datos Proceso
        var objDatosProceso = {
         "idProceso":idProceso,
         idEstado:""
         };
         var resultProceso =await api.execApi(request.hostname(),'/Desempeno/Proceso/getProcesos',objDatosProceso);
         var datosProceso =resultProceso.body.data;
 
         ////console.log(datosProceso);
         
        //Etapas Proceso
        var objEtapasProceso = {
            "idProceso":idProceso,
            "idEtapa":""
        };
        var resultEtapasProceso=await api.execApi(request.hostname(),'/Desempeno/Proceso/getEtapas',objEtapasProceso);
        var etapasProceso =resultEtapasProceso.body.data;
        
        ////console.log(etapasProceso);
        
         //Render
         return view.render('/administracion/modulos/desempeno/fichaProceso', {datosProceso,etapasProceso});
     }

     async agregarProceso ({view,request, response, auth, session}) {
               
        //Tipo de Proceso
        var objDatosTipoProceso = {
            "idTipoProceso":""
            };
        var resultTipoProceso =await api.execApi(request.hostname(),'/Desempeno/Proceso/getTipoProceso',objDatosTipoProceso);
        var datosTipoProceso =resultTipoProceso.body.data;
        
        //Modelos de Competencia
        var objDatosModelo = {
            "idModelo":""
            };
        var resultModelo =await api.execApi(request.hostname(),'/Desempeno/Proceso/getModelosCompetencia',objDatosModelo);
        var datosModelo =resultModelo.body.data;

         //Estados Proceso
         var objEstadosProceso = {
            "nombreTipo":"EdeProceso",
            "activoEstado":"1",
            "activoTipoEstado":"1"
        };
        var resultEstadosProceso=await api.execApi(request.hostname(),'/Desempeno/Proceso/getEstadosEde',objEstadosProceso);
        var datosEstados =resultEstadosProceso.body.data;     


        //Render
        return view.render('/administracion/modulos/desempeno/agregarProceso',{datosTipoProceso,datosModelo,datosEstados});
    }

    async addProceso({view,request, response}) {
       
        var nombreProceso = request.input("nombreProceso");
        var tipoProceso = request.input("tipoProceso");
        var modeloCompetencias = request.input("modeloCompetencias");
        var imagen = request.input("imagen");
        var fechaInicio = request.input("fechaInicio");
        var fechaTermino = request.input("fechaTermino");
        var idEstado = request.input("idEstado");
        var obj = {
            "nombre":nombreProceso,
            "idTipoProceso":tipoProceso,
            "idCompetenciaModelo":modeloCompetencias,
            "imagen":imagen,
            "fecha_inicio":fechaInicio,
            "fecha_termino":fechaTermino,
            "idEstado":idEstado
        };

        var result = await api.execApi(request.hostname(),'/Desempeno/Proceso/addProceso',obj);  

        return{mensaje:"ok"} 
      
    }

    async editarProceso ({view,request, response, auth, session}) {
        
        //DATA
        var idProceso=request.input("idProceso")

        //Datos Proceso
        var objDatosProceso = {
            "idProceso":idProceso,
            idEstado:""
            };
        var resultProceso =await api.execApi(request.hostname(),'/Desempeno/Proceso/getProcesos',objDatosProceso);
        var datosProceso =resultProceso.body.data;
        ////console.log(datosProceso);
        
        //Tipo de Proceso
        var objDatosTipoProceso = {
            "idTipoProceso":""
            };
        var resultTipoProceso =await api.execApi(request.hostname(),'/Desempeno/Proceso/getTipoProceso',objDatosTipoProceso);
        var datosTipoProceso =resultTipoProceso.body.data;
        ////console.log(datosTipoProceso);

        //Modelos de Competencia
        var objDatosModelo = {
            "idModelo":""
            };
        var resultModelo =await api.execApi(request.hostname(),'/Desempeno/Proceso/getModelosCompetencia',objDatosModelo);
        var datosModelo =resultModelo.body.data;
        ////console.log(datosModelo);

         //Estados Proceso
         var objEstadosProceso = {
            "nombreTipo":"EdeProceso",
            "activoEstado":"1",
            "activoTipoEstado":"1"
        };
        var resultEstadosProceso=await api.execApi(request.hostname(),'/Desempeno/Proceso/getEstadosEde',objEstadosProceso);
        var datosEstados =resultEstadosProceso.body.data;     


        //Render
        return view.render('/administracion/modulos/desempeno/editarProceso',{datosProceso,datosTipoProceso,datosModelo,datosEstados});
    }

    async updProceso({view,request, response}) {
       
        var nombreProceso = request.input("nombreProceso");
        var tipoProceso = request.input("tipoProceso");
        var modeloCompetencias = request.input("modeloCompetencias");
        var imagen = request.input("imagen");
        var fechaInicio = request.input("fechaInicio");
        var fechaTermino = request.input("fechaTermino");
        var idEstado = request.input("idEstado");
        var idProceso = request.input("idProceso");
        var obj = {
            "nombre":nombreProceso,
            "idTipoProceso":tipoProceso,
            "idCompetenciaModelo":modeloCompetencias,
            "imagen":imagen,
            "fecha_inicio":fechaInicio,
            "fecha_termino":fechaTermino,
            "idEstado":idEstado,
            "idProceso":idProceso
        };

        var result = await api.execApi(request.hostname(),'/Desempeno/Proceso/updProceso',obj);  

        return{mensaje:"ok"} 
      
    }

    //-----<< PROCESO

    //----->> ETAPA

    async fichaetapa ({view,request, response, auth, session}) {
        
        //Data
        var idProceso = session.get('idProceso')
        var idEtapa = request.input("idEtapa")
        ////console.log(idProceso);
        ////console.log(idEtapa); 

        //Datos Proceso
        var objDatosProceso = {
         "idProceso":idProceso,
         idEstado:""
         };
         var resultProceso =await api.execApi(request.hostname(),'/Desempeno/Proceso/getProcesos',objDatosProceso);
         var datosProceso =resultProceso.body.data;
 
        //Datos Etapa
        var objDatosEtapa = {
            "idProceso":idProceso,
            "idEtapa":idEtapa
            };
        var resultEtapa =await api.execApi(request.hostname(),'/Desempeno/Proceso/getEtapas',objDatosEtapa);
        var datosEtapa =resultEtapa.body.data;
        //console.log(datosEtapa);

        //Tareas Etapa
        var objDatosTareas = {
            "idEtapa":idEtapa,
            "idTareaEtapa":""
            };
        var resultTareas =await api.execApi(request.hostname(),'/Desempeno/Proceso/getTareasEtapas',objDatosTareas);
        var datosTareas =resultTareas.body.data;
        ////console.log(idProceso);
        ////console.log(idEtapa);
        ////console.log(datosTareas);

         //Render
         return view.render('/administracion/modulos/desempeno/fichaEtapa', {datosProceso,datosEtapa,datosTareas});
     }

     async editarEtapa ({view,request, response, auth, session}) {
        
        //DATA
        var idProceso = session.get('idProceso')
        var idEtapa=request.input("idEtapa")

        //Datos Etapa
        var objDatosEtapa = {
        "idProceso":idProceso,
        "idEtapa":idEtapa
        };
        var resultEtapa =await api.execApi(request.hostname(),'/Desempeno/Proceso/getEtapas',objDatosEtapa);
        var datosEtapa =resultEtapa.body.data;
        //console.log(datosEtapa)

        //Estados Etapa
        var objEstadosProceso = {
            "nombreTipo":"EdeEtapa",
            "activoEstado":"1",
            "activoTipoEstado":"1"
        };
        var resultEstadosProceso=await api.execApi(request.hostname(),'/Desempeno/Proceso/getEstadosEde',objEstadosProceso);
        var datosEstados =resultEstadosProceso.body.data;   
        
         //Render
        return view.render('/administracion/modulos/desempeno/editarEtapa',{datosEtapa,datosEstados});
    }

    async updEtapa({view,request, response}) {
       
        var idEtapa= request.input("idEtapa");
        var idProceso= request.input("idProceso");
        var nombre= request.input("nombre");
        var fecha_inicio = request.input("fecha_inicio");
        var fecha_termino = request.input("fecha_termino");
        var imagen = request.input("imagen");
        var color = request.input("color");
        var orden = request.input("orden");
        var ocultar = request.input("ocultar");
        var idEstado = request.input("idEstado");
        
        var obj = {
            "idEtapa":idEtapa,
            "idProceso":idProceso,
            "nombre":nombre,
            "fecha_inicio":fecha_inicio,
            "fecha_termino":fecha_termino,
            "imagen":imagen,
            "color":color,
            "orden":orden,
            "ocultar":ocultar,
            "idEstado":idEstado
            
        };
        
        var result = await api.execApi(request.hostname(),'/Desempeno/Proceso/updEtapa',obj);  

        return{mensaje:"ok"} 
      
    }

    async agregarEtapa ({view,request, response, auth, session}) {
               
        //DATA
        var idProceso = session.get('idProceso')

       //Estados Etapa
        var objEstadosProceso = {
            "nombreTipo":"EdeEtapa",
            "activoEstado":"1",
            "activoTipoEstado":"1"
        };
        var resultEstadosProceso=await api.execApi(request.hostname(),'/Desempeno/Proceso/getEstadosEde',objEstadosProceso);
        var datosEstados =resultEstadosProceso.body.data;   
        
         //Render
        return view.render('/administracion/modulos/desempeno/agregarEtapa',{idProceso,datosEstados});
    }

    async addEtapa({view,request, response}) {
       
        var idProceso= request.input("idProceso");
        var nombre= request.input("nombre");
        var fecha_inicio = request.input("fecha_inicio");
        var fecha_termino = request.input("fecha_termino");
        var imagen = request.input("imagen");
        var color = request.input("color");
        var orden = request.input("orden");
        var ocultar = request.input("ocultar");
        var idEstado = request.input("idEstado");
        
        var obj = {
            "idProceso":idProceso,
            "nombre":nombre,
            "fecha_inicio":fecha_inicio,
            "fecha_termino":fecha_termino,
            "imagen":imagen,
            "color":color,
            "orden":orden,
            "ocultar":ocultar,
            "idEstado":idEstado
            
        };

        var result = await api.execApi(request.hostname(),'/Desempeno/Proceso/addEtapa',obj);  

        return{mensaje:"ok"} 
      
    }

     //-----<< ETAPA

     //----->> TAREA - ETAPA

     async agregarTarea ({view,request, response, auth, session}) {
               
        //DATA
        var idProceso= session.get('idProceso')
        var idEtapa = request.input('idEtapa')

        //Datos Proceso
        var objDatosProceso = {
            "idProceso":idProceso,
            idEstado:""
        };
        var resultProceso =await api.execApi(request.hostname(),'/Desempeno/Proceso/getProcesos',objDatosProceso);
        var datosProceso =resultProceso.body.data;
        
        var codigoTipoProceso=datosProceso[0].codigoTipoProceso

        //Tareas
        var objTareas = {
            "idTarea":"",
            "codigoTipoProceso":codigoTipoProceso
        };
        var resultTareas=await api.execApi(request.hostname(),'/Desempeno/Proceso/getTareas',objTareas);
        var datosTareas =resultTareas.body.data;   

       //Estados Etapa
        var objEstadosTareas = {
            "nombreTipo":"EdeEtapaTarea",
            "activoEstado":"1",
            "activoTipoEstado":"1"
        };
        var resultEstadosTareas=await api.execApi(request.hostname(),'/Desempeno/Proceso/getEstadosEde',objEstadosTareas);
        var datosEstados =resultEstadosTareas.body.data;   
        
         //Render
        return view.render('/administracion/modulos/desempeno/agregarTarea',{idEtapa,datosEstados,datosTareas});
    }

    async addTarea({view,request, response}) {
       
        var idEtapa= request.input("idEtapa");
        var idTarea= request.input("idTarea");
        var nombre= request.input("nombre");
        var fecha_inicio = request.input("fecha_inicio");
        var fecha_termino = request.input("fecha_termino");
        var imagen = request.input("imagen");
        var color = request.input("color");
        var orden = request.input("orden");
        var ocultar = request.input("ocultar");
        var idEstado = request.input("idEstado");
        
        var obj = {
            "idEtapa":idEtapa,
            "idTarea":idTarea,
            "nombre":nombre,
            "fecha_inicio":fecha_inicio,
            "fecha_termino":fecha_termino,
            "imagen":imagen,
            "color":color,
            "orden":orden,
            "ocultar":ocultar,
            "idEstado":idEstado
            
        };

        var result = await api.execApi(request.hostname(),'/Desempeno/Proceso/addTareaEtapa',obj);  

        return{mensaje:"ok"} 
      
    }

    async fichaTarea ({view,request, response, auth, session}) {
        
        //Data
        var idEtapaTarea = request.input('idEtapaTarea')
               
        //Datos Tarea
        var objDatosTarea = {
            "idEtapa":"",
            "idTareaEtapa":idEtapaTarea
         };
         var resultTarea =await api.execApi(request.hostname(),'/Desempeno/Proceso/getTareasEtapas',objDatosTarea);
         var datosTarea =resultTarea.body.data;
 
         //Datos Acciones
         var objDatosAcciones = {
            "idEtapaTarea":idEtapaTarea,
            "idAccionTarea":"",
            "idAccion":"",
            "idActor":""
        };
        var resultAcciones =await api.execApi(request.hostname(),'/Desempeno/Proceso/getAccionesTarea',objDatosAcciones);
        var datosAcciones =resultAcciones.body.data;
     
       // //console.log(datosAcciones)

         //Render
         return view.render('/administracion/modulos/desempeno/fichaTarea', {datosTarea,datosAcciones});
     }

     async editarTarea ({view,request, response, auth, session}) {
               
        //DATA
        var idProceso= session.get('idProceso')
        var idEtapaTarea = request.input('idEtapaTarea')

        //Datos Proceso
        var objDatosProceso = {
            "idProceso":idProceso,
            idEstado:""
        };
        var resultProceso =await api.execApi(request.hostname(),'/Desempeno/Proceso/getProcesos',objDatosProceso);
        var datosProceso =resultProceso.body.data;
        
        var codigoTipoProceso=datosProceso[0].codigoTipoProceso

        //Datos Tarea
        var objDatosTarea = {
            "idEtapa":"",
            "idTareaEtapa":idEtapaTarea
            };
            var resultTarea =await api.execApi(request.hostname(),'/Desempeno/Proceso/getTareasEtapas',objDatosTarea);
            var datosTarea =resultTarea.body.data;  

       //Estados Etapa
        var objEstadosTareas = {
            "nombreTipo":"EdeEtapaTarea",
            "activoEstado":"1",
            "activoTipoEstado":"1"
        };
        var resultEstadosTareas=await api.execApi(request.hostname(),'/Desempeno/Proceso/getEstadosEde',objEstadosTareas);
        var datosEstados =resultEstadosTareas.body.data;   
        
         //Render
        return view.render('/administracion/modulos/desempeno/editarTarea',{idEtapaTarea,datosEstados,datosTarea});
    }

    async updTarea({view,request, response}) {
       
        var idEtapaTarea= request.input("idEtapaTarea");
        var idEtapa= request.input("idEtapa");
        var idTarea= request.input("idTarea");
        var nombre= request.input("nombre");
        var fecha_inicio = request.input("fecha_inicio");
        var fecha_termino = request.input("fecha_termino");
        var imagen = request.input("imagen");
        var color = request.input("color");
        var orden = request.input("orden");
        var ocultar = request.input("ocultar");
        var idEstado = request.input("idEstado");
        
        var obj = {
            "idEtapaTarea":idEtapaTarea,
            "idEtapa":idEtapa,
            "idTarea":idTarea,
            "nombre":nombre,
            "fecha_inicio":fecha_inicio,
            "fecha_termino":fecha_termino,
            "imagen":imagen,
            "color":color,
            "orden":orden,
            "ocultar":ocultar,
            "idEstado":idEstado
            
        };

        var result = await api.execApi(request.hostname(),'/Desempeno/Proceso/updTareaEtapa',obj);  

        return{mensaje:"ok"} 
      
    }

    //-----<< TAREA - ETAPA


    //----->> ACCION - TAREA

    async agregarAccion ({view,request, response, auth, session}) {
               
        //DATA
        var idProceso= session.get('idProceso')
        var idEtapaTarea = request.input('idEtapaTarea')

        //Datos Proceso
        var objDatosProceso = {
            "idProceso":idProceso,
            idEstado:""
        };
        var resultProceso =await api.execApi(request.hostname(),'/Desempeno/Proceso/getProcesos',objDatosProceso);
        var datosProceso =resultProceso.body.data;
        
        var codigoTipoProceso=datosProceso[0].codigoTipoProceso

        //Datos Tarea
        var objDatosTarea = {
            "idEtapa":"",
            "idTareaEtapa":idEtapaTarea
            };
        var resultTarea =await api.execApi(request.hostname(),'/Desempeno/Proceso/getTareasEtapas',objDatosTarea);
        var datosTarea =resultTarea.body.data;  

        //console.log(idEtapaTarea)
        
        var idTarea = datosTarea[0].idTarea

        //Acciones
        var objDatosAcciones = {
            "idAccion":"",
            "idTarea":idTarea
            };
        var resultAcciones=await api.execApi(request.hostname(),'/Desempeno/Proceso/getAcciones',objDatosAcciones);
        var datosAcciones =resultAcciones.body.data;
       
        //Actores
        var objDatosActores = {
            "idActor":""
            };
        var resultActores=await api.execApi(request.hostname(),'/Desempeno/Proceso/getActores',objDatosActores);
        var datosActores =resultActores.body.data;

         //Estados Acciones
         var objEstadosAcciones = {
            "nombreTipo":"EdeEtapaTareaAccion",
            "activoEstado":"1",
            "activoTipoEstado":"1"
        };
        var resultEstadosAcciones=await api.execApi(request.hostname(),'/Desempeno/Proceso/getEstadosEde',objEstadosAcciones);
        var datosEstados =resultEstadosAcciones.body.data;  

         //Render
        return view.render('/administracion/modulos/desempeno/agregarAccion',{idEtapaTarea,datosTarea,datosAcciones,datosActores,datosEstados});
    }

    async editarAccion ({view,request, response, auth, session}) {
               
        //DATA
        var idProceso= session.get('idProceso')
        //var idEtapaTarea = request.input('idEtapaTarea')
        var idAccionTarea = request.input('idAccionTarea')

        //Datos Proceso
        var objDatosProceso = {
            "idProceso":idProceso,
            idEstado:""
        };
        var resultProceso =await api.execApi(request.hostname(),'/Desempeno/Proceso/getProcesos',objDatosProceso);
        var datosProceso =resultProceso.body.data;
        

        //Datos Accion
        var objDatosAccion = {
            "idEtapaTarea":"",
            "idAccionTarea":idAccionTarea,
            "idAccion":"",
            "idActor":""

        };
        var resultAccion =await api.execApi(request.hostname(),'/Desempeno/Proceso/getAccionesTarea',objDatosAccion);
        var datosAccion=resultAccion.body.data;

        //console.log(datosAccion)

        var idEtapaTarea = datosAccion[0].idEtapaTarea
        var idTarea = datosAccion[0].idTarea

        //Acciones
        var objDatosAcciones = {
            "idAccion":"",
            "idTarea":idTarea
            };
        var resultAcciones=await api.execApi(request.hostname(),'/Desempeno/Proceso/getAcciones',objDatosAcciones);
        var datosAcciones =resultAcciones.body.data;
       
        //Actores
        var objDatosActores = {
            "idActor":""
            };
        var resultActores=await api.execApi(request.hostname(),'/Desempeno/Proceso/getActores',objDatosActores);
        var datosActores =resultActores.body.data;

         //Estados Acciones
         var objEstadosAcciones = {
            "nombreTipo":"EdeEtapaTareaAccion",
            "activoEstado":"1",
            "activoTipoEstado":"1"
        };
        var resultEstadosAcciones=await api.execApi(request.hostname(),'/Desempeno/Proceso/getEstadosEde',objEstadosAcciones);
        var datosEstados =resultEstadosAcciones.body.data;  

        ////console.log(datosEstados)

         //Render
        return view.render('/administracion/modulos/desempeno/editarAccion',{idEtapaTarea,datosAcciones,datosActores,datosEstados,datosAccion});
    }

    async addAccionTarea({view,request, response}) {
       
        var idEtapaTarea= request.input("idEtapaTarea");
        var idAccion= request.input("idAccion");
        var idActor= request.input("idActor");
        var instruccion = request.input("instruccion");
        var esFin = request.input("esFin");
        var orden = request.input("orden");
        var idEstado = request.input("idEstado");
        
        var obj = {
            "idEtapaTarea":idEtapaTarea,
            "idAccion":idAccion,
            "idActor":idActor,
            "instruccion":instruccion,
            "esFin":esFin,
            "orden":orden,
            "idEstado":idEstado
            
        };

        var result = await api.execApi(request.hostname(),'/Desempeno/Proceso/addAccionTarea',obj);  

        return{mensaje:"ok"} 
      
    }

    async updAccionTarea({view,request, response}) {
       
        var idAccionTarea= request.input("idAccionTarea");
        var idEtapaTarea= request.input("idEtapaTarea");
        var idAccion= request.input("idAccion");
        var idActor= request.input("idActor");
        var instruccion = request.input("instruccion");
        var esFin = request.input("esFin");
        var orden = request.input("orden");
        var idEstado = request.input("idEstado");
        
        var obj = {
            "idAccionTarea":idAccionTarea,
            "idEtapaTarea":idEtapaTarea,
            "idAccion":idAccion,
            "idActor":idActor,
            "instruccion":instruccion,
            "esFin":esFin,
            "orden":orden,
            "idEstado":idEstado
            
        };

        var result = await api.execApi(request.hostname(),'/Desempeno/Proceso/updAccionTarea',obj);  

        return{mensaje:"ok"} 
      
    }

    //-----<< ACCION - TAREA

    //-----<< PARTICIPANTES

    /*
    async participantes ({view,request, response, auth, session}) {
        
        //Data
        var idProceso = request.input("idProceso")
        session.put('idProceso',idProceso); 
      
        //Datos Proceso
            var objDatosProceso = {
               "idProceso":idProceso,
               idEstado:""
            };
            var resultProceso =await api.execApi(request.hostname(),'/Desempeno/Proceso/getProcesos',objDatosProceso);
            var datosProceso =resultProceso.body.data;
       
             ////console.log(datosProceso);


        //Render
        return view.render('/administracion/modulos/desempeno/participantes', {datosProceso});
     }
     */

     async buscarParticipante({view,request, response}) {
       
        var idProceso= request.input("idEde");
        var identificador= request.input("identificador");
        var appat= request.input("appat")
        
        var obj = {
            "idEde":idProceso,
            "identificador":identificador,
            "appat":appat,
            "idPersona":""
            
        };

        ////console.log(obj)

        var result = await api.execApi(request.hostname(),'/Desempeno/Participante/getParticipantes',obj);  
        var resultP =result.body.data;

        ////console.log(resultP);

        //Render
        return resultP;
      
    }

    async fichaParticipante ({view,request, response, auth, session}) {
        
        //Data
        var idProceso = request.input("idProceso");
        var idPersona =request.input("idPersona")
        
      
        //Datos Proceso
            var objDatosProceso = {
               "idProceso":idProceso,
               idEstado:""
            };
            var resultProceso =await api.execApi(request.hostname(),'/Desempeno/Proceso/getProcesos',objDatosProceso);
            var datosProceso =resultProceso.body.data;
       
        //Datos Persona
        var objPersona ={
            "idEde":idProceso,
            "identificador":"",
            "appat":"",
            "idPersona":idPersona
        }
        var resultPersona = await api.execApi(request.hostname(),'/Desempeno/Participante/getParticipantes',objPersona)
        var datosPersona = resultPersona.body.data;

        ////console.log(datosPersona)

        //Render
        return view.render('/administracion/modulos/desempeno/fichaParticipante', {datosProceso,datosPersona});
     }


    //----->> PARTICIPANTES

}

module.exports = Desempeno