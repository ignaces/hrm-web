'use strict'

const got = use('got')
const api = use('App/Utils/Data')
const XLSX = require('xlsx');
const Helpers = use('Helpers');
const fs = use('fs');
const Antl = use('Antl');
var safeUrl = require('safe-url');
var wget = require('node-wget-promise');
const readFile = Helpers.promisify(fs.readFile);
var Enumerable = require('linq');
const User = use('App/Models/User');

class Administracion {
     administrador  ({ view,request, response, auth }) {
        
        ////console.log(auth.user.username)
        ////console.log(auth.user.id)

      
        return view.render('/administracion/administrador');
    }

    async evaluadorMasivo  ({ view,request, response, auth }) {
        
        var idProceso = request.input("idProceso")

        var objEtapasProceso = {
            "idProceso":idProceso,
            "idEtapa":""
        };

        var resultEtapasProceso=await api.execApi(request.hostname(),'/Desempeno/Proceso/getEtapas',objEtapasProceso);
        var etapasProceso =resultEtapasProceso.body.data;

        return view.render('/administracion/evaluadorMasivo',{etapasProceso,idProceso});
    }

    async cargaEvaluadorMasivo({request,response}){

        var idProceso = request.input('idProceso');
        var idEtapa = request.input('idEtapa');
        var json = request.input('jsonEvaluados');

        var obj = {
            "idProceso":idProceso,
            "idEtapa":idEtapa,
            "json":JSON.stringify(json)
        };

        var resultCarga = await api.execApi(request.hostname(),'/Core/Administracion/cargaEvaluadorMasiva',obj);

        return {mensaje:resultCarga.body.mensaje}
    }

    async admincs  ({ view,request, response, auth, antl }) {
        
        ////console.log(auth.user.username)
        ////console.log(auth.user.id)
        antl.switchLocale('es');

        var cliente = request.hostname().split(".")[0]
        if(cliente=="localhost"){
            cliente="hrmdev"
        }

        var etag = `app_${cliente}`

        var objDatosProcesoActivos = {
            "idProceso":"",
            "idEstado":"ACTIVO"
        };
        var resultProcesosActivos =await api.execApi(request.hostname(),'/Desempeno/Proceso/getProcesos',objDatosProcesoActivos);
        
        var objDatosProcesoActivos = {
            "idProceso":"",
            "idEstado":"ACTIVO"
        };

        var resultEtapas =await api.execApi(request.hostname(),'/Desempeno/Proceso/getEtapasProcesos', {});
        
        var datosProcesosActivos    =   resultProcesosActivos.body.data;
        var datosEtapasProcesos     =   resultEtapas.body.data;
        console.log(datosProcesosActivos);
        return view.render('/administracion/admincs', {datosProcesosActivos, datosEtapasProcesos});
    }

    async verPersonasProceso  ({ view,request, response, auth }) {
        
        ////console.log(auth.user.username)
        ////console.log(auth.user.id)

        var idProceso = request.input("idProceso")

        var obj = {
            "idProceso":idProceso
        };
        var resultPersonasProceso =await api.execApi(request.hostname(),'/Desempeno/Proceso/getPersonasProcesos',obj);
        
        var datosPersonasProceso =resultPersonasProceso.body.data;
      
        return view.render('/administracion/personasProceso', {datosPersonasProceso, idProceso});
    }

    async verPersonasEtapa  ({ view,request, response, auth }) {
        
        ////console.log(auth.user.username)
        ////console.log(auth.user.id)

        var idProceso = request.input("idProceso")
        var idEtapa = request.input("idEtapa")

        var obj = {
            "idProceso":idProceso,
            "idEtapa": idEtapa
        };
        var resultPersonasProceso =await api.execApi(request.hostname(),'/Desempeno/Proceso/getPersonasProcesos',obj);
        
        var resultDatosProcesoEtapa = await api.execApi(request.hostname(), '/Desempeno/Proceso/getDatosProcesoEtapa', obj);
        
        var datosProcesoEtapa = resultDatosProcesoEtapa.body.data[0];
        var datosPersonasProceso =resultPersonasProceso.body.data;
        console.log(datosProcesoEtapa);
        return view.render('/administracion/personasEtapa', {datosPersonasProceso, datosProcesoEtapa, idProceso, idEtapa});
    }

    async verDatosPersonaProceso  ({ view,request, response, auth }) {
        
        ////console.log(auth.user.username)
        ////console.log(auth.user.id)

        var idProceso = request.input("idProceso");
        var idEtapa = request.input("idEtapa");
        var idPersona = request.input("idPersona");
        var msgOK = request.input("msgReset");
        
        var linkVolver = '/Administracion/Administracion/verPersonasEtapa?idProceso='+idProceso+'&idEtapa='+idEtapa;

        var obj = {
            "idProceso":idProceso,
            "idEtapa":idEtapa
        };

        var resultDatosProcesoEtapa = await api.execApi(request.hostname(), '/Desempeno/Proceso/getDatosProcesoEtapa', obj);
        var datosProcesoEtapa = resultDatosProcesoEtapa.body.data[0];

        var obj = {
            "idProceso":idProceso,
            "idPersona":idPersona,
            "idEtapa":idEtapa,
            "tipo": "evaluado"
        };

        var resultPersonasProceso =await api.execApi(request.hostname(),'/Desempeno/Proceso/getDatosPersonaProceso',obj);
        
        var datosPersonasProceso =resultPersonasProceso.body.data;

        var obj = {
            "idProceso":idProceso,
            "idPersona":idPersona,
            "idEtapa":idEtapa,
            "tipo": "evaluador"
        };

        var resultPersonasProcesoEvaluador =await api.execApi(request.hostname(),'/Desempeno/Proceso/getDatosPersonaProceso',obj);
        
        var datosEvaluador = resultPersonasProcesoEvaluador.body.data[0];
        var datosEvaluadorProceso =resultPersonasProcesoEvaluador.body.data;
        
        var obj = {
            "idProceso":idProceso
        };
        var resultClasificaciones =await api.execApi(request.hostname(),'/Desempeno/Proceso/getClasificaciones',obj);
        
        var datosClasificacionesPadres = resultClasificaciones.body.padres;
        var datosClasificacionesHijos = resultClasificaciones.body.hijos;
        
        var obj = {
            "idProceso":idProceso,
            "idPersona":idPersona
        };
        var resultClasificacionesPersona =await api.execApi(request.hostname(),'/Desempeno/Proceso/getClasificacionesPersona',obj);
        
        var datosClasificacionesPersona = resultClasificacionesPersona.body.data;

        var setClasificacionesPersona = {};
        
        for(var i = 0; i<datosClasificacionesPersona.length; i++)
        {
            setClasificacionesPersona[datosClasificacionesPersona[i].codigoPadre] = datosClasificacionesPersona[i].idEdeClasificacion;
        }

        var personasEvaluadoras =await api.execApi(request.hostname(),'/Desempeno/Proceso/getPersonasEvaluadoras',obj);
        
        var datosPersonasEvaluadoras = personasEvaluadoras.body.data; 

        //console.log(setClasificacionesPersona);

        
        return view.render('/administracion/personaProceso', {datosEvaluador,datosPersonasProceso,datosEvaluadorProceso,datosClasificacionesPadres, datosClasificacionesHijos, setClasificacionesPersona, idProceso, idEtapa, linkVolver, datosPersonasEvaluadoras, msgReset:msgOK, datosProcesoEtapa });
    }

    async resetearPassPorIdPersona ({ view,request, response, auth }) 
    {
        var idPersona = request.input("idPersona");
        var idProceso = request.input("idProceso");
        var origen = request.input("origen");
        var identificador = request.input("identificador");
        var idUser = request.input("idUser");
        //console.log(identificador)
        var obj = {
            "idPersona":idPersona
        };

        //var resultPersonasProceso =await api.execApi(request.hostname(),'/Persona/Persona/resetPassByPersonaId',obj);
        
        
        var user = await User.find(idUser);
        user.password = identificador;
        //console.log(user.username);
        //console.log(user.password);
        await user.save();
        
        var updRequiereCambioClave = await api.execApi(request.hostname(),'/Core/Users/updateRequiereCambioClave',{idUser:idUser, estado:1});

        if(origen == "ficha")
        {
            response.redirect('/Administracion/Administracion/verDatosPersonaProceso?msgReset=OK&idProceso='+idProceso+'&idPersona='+idPersona);
        }
        else
        {
            response.redirect('/Administracion/Administracion/verPersonasProceso?idProceso='+idProceso);
        }

        
        //session.clear();
        //await auth.logout()

        
    }

    async cambiaEstadoEvaluacion ({ view,request, response, auth }) 
    {
        var idPersona = request.input("idPersona");
        var idProceso = request.input("idProceso");
        var idEvaluacion = request.input("idEvaluacion");
         
        var obj = {
            "idProceso":idProceso,
            "idEvaluacion": idEvaluacion
        };
        
        try
        {
            var resultPersonasProceso =await api.execApi(request.hostname(),'/Desempeno/Proceso/cambiaEstadoEvaluacion',obj);
        
        }
        catch(e)
        {
            console.log(e);
        }
        
        response.redirect('/Administracion/Administracion/verDatosPersonaProceso?idProceso='+idProceso+'&idPersona='+idPersona);
        
    }
    
    async updDatosPersona ({ view,request, response, auth }) 
    {
        var idPersona = request.input("idPersona");
        var idProceso = request.input("idProceso");
        var idEtapa = request.input("idEtapa");

        var nombres = request.input("nombresPersona");
        var apellidoPaterno = request.input("apellidoPaternoPersona");
        var apellidoMaterno = request.input("apellidoMaternoPersona");
        var email = request.input("emailPersona");
        
        var obj = {
            "idPersona": idPersona,
            "nombres": nombres,
            "apellidoPaterno": apellidoPaterno,
            "apellidoMaterno": apellidoMaterno,
            "emailPersona": email
        };
        
        try
        {
            var resultPersonasProceso =await api.execApi(request.hostname(),'/Persona/Persona/updDatosPersona',obj);
        
        }
        catch(e)
        {
            console.log(e);
        }
        
        response.redirect('/Administracion/Administracion/verDatosPersonaProceso?idProceso='+idProceso+'&idPersona='+idPersona+'&idEtapa='+idEtapoa);
        
    }

    async enviarNotificacion({ view,request, response, auth }) 
    {
        var idPersona = request.input("idPersona");
        var idProceso = request.input("idProceso");
        var email = request.input("emailPersona");
        var origen = request.input("origen");

        try
        {
            var cliente = request.hostname().split(".")[0];

            if(email != ""){
                var obj = {
                    tag: cliente+ ' notificacion cambio clave CS',
                    to:email,
                    subject:"Enovum - Reseteo Contraseña",
                    body:"Estimado(a): <br> Le informamos que su contrase&ntilde;a para el acceso a la plataforma de desempe&ntilde;o ha sido reseteada. <br> Ingrese a <a href='http://cs.enovum.cl/'>http://cs.enovum.cl</a> utilizando su identificador como usuario y la contrase&ntilde;a <b>cencosud</b>. <br> Recuerde que el sistema le solicitar&aacute; reasignar la contraseña. <br><br> Se despide Atte.<br>Equipo de Soporte <b>Circular HR</b><b>"
                }; 
    
                var result = await api.execApiPost(request.hostname(),'/Mail/Mailgun/send',obj);
            }
        
        }
        catch(e)
        {
            console.log(e);
        }
        
        if(origen == "ficha")
        {
            response.redirect('/Administracion/Administracion/verDatosPersonaProceso?idProceso='+idProceso+'&idPersona='+idPersona);
        }
        else
        {
            response.redirect('/Administracion/Administracion/verPersonasProceso?idProceso='+idProceso);
        }

        

    }
    
    async updClasificacionPersona({ view,request, response, auth })
    {
        var idPersona = request.input("idPersona");
        var idProceso = request.input("idProceso");
        
        var obj = {
            "idProceso":idProceso,
            "idPersona":idPersona
        };

        var resultClasificaciones =await api.execApi(request.hostname(),'/Desempeno/Proceso/getClasificaciones',obj);
        
        var datosClasificacionesPadres = resultClasificaciones.body.padres;

        for(var i = 0; i<datosClasificacionesPadres.length; i++)
        {
            //console.log(datosClasificacionesPadres[i].codigo);
            var nombrePadre = request.input("padre_"+datosClasificacionesPadres[i].codigo);
            var valor = request.input("valor_"+datosClasificacionesPadres[i].codigo);
            
            var obj = {
                "idProceso":idProceso,
                "idPersona":idPersona,
                "codigoPadre": nombrePadre,
                "idClasificacion": valor
            };

            var updClasificaciones =await api.execApi(request.hostname(),'/Persona/Persona/updClasificacionesPersona',obj);
            
        }
        return false;
        //response.redirect('/administracion/Administracion/verDatosPersonaProceso?idProceso='+idProceso+'&idPersona='+idPersona);
    }

    async updEvaluador({ view,request, response, auth })
    {
        var idPersona = request.input("idPersona");
        var idProceso = request.input("idProceso");
        var idEtapa = request.input("idEtapa");
        var idEvaluacion = request.input("idEvaluacion");
        var idEvaluador = request.input("idEvaluador");
        var idTareaActor = request.input("idTareaActor");
        
        var obj = {
            "idProceso":idProceso,
            "idEvaluacion": idEvaluacion,
            "idTareaActor": idTareaActor,
            "idEvaluador": idEvaluador,
            "idEvaluado": idPersona
        };
        //console.log(obj);
        //return false;
        
        try
        {
            var resultPersonasProceso =await api.execApi(request.hostname(),'/Desempeno/Proceso/updEvaluador',obj);
        
        }
        catch(e)
        {
            console.log(e);
        }
        
        
        response.redirect('/Administracion/Administracion/verDatosPersonaProceso?idProceso='+idProceso+'&idPersona='+idPersona+'&idEtapa='+idEtapa);
    }

    async sabanaAvanceDownload({ view, request, response }) {


        var idProceso = request.input("idProceso");
        var idEvaluador = request.input("idEvaluador");

        var obj = {
            "idProceso": idProceso,
            "idEvaluador": idEvaluador
        };

        try
        {
            var result = await api.execApi(request.hostname(), '/Desempeno/Proceso/getSabanaAvance', obj);

            var cabecera = Object.keys(result.body.data[0]);

            var wb = {
                SheetNames: [],
                Sheets: {}
            }

            var registros = result.body.data;
            var ws_name = "Avance";

            /* make worksheet */
            var ws_data = [ 
                cabecera
            ];
            for (var fila in registros) {

                var registro = [];
                for (var campo in cabecera) {

                    registro.push(registros[fila][cabecera[campo]]);
                }

                ws_data.push(registro);

            }

            var ws = XLSX.utils.aoa_to_sheet(ws_data);

            /* Add the sheet name to the list */
            wb.SheetNames.push(ws_name);

            /* Load the worksheet object */
            wb.Sheets[ws_name] = ws;

            XLSX.writeFile(wb, 'tmp/reporte_avance.xlsx');

            response.implicitEnd = false

            response.type = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";

            response.attachment(
                Helpers.tmpPath('reporte_avance.xlsx'),
                'reporte_avance.xlsx'
            )
        }
        catch(e)
        {
            console.log(e);
        }
        

    }

    async informeCalibracion({ view, request, response }) {
        var idProceso = request.input("idProceso")

        try {
            const result = await api.execApi(request.hostname(),'/Desempeno/Proceso/getInformeAvanceCalibracion',{idProceso});
            
            var cabecera = Object.keys(result.body.data[0]);

            var wb = {
                SheetNames: [],
                Sheets: {}
            }

            var registros = result.body.data;
            var ws_name = "Calibracion";

            /* make worksheet */
            var ws_data = [ 
                cabecera
            ];
            for (var fila in registros) {

                var registro = [];
                for (var campo in cabecera) {

                    registro.push(registros[fila][cabecera[campo]]);
                }

                ws_data.push(registro);

            }

            var ws = XLSX.utils.aoa_to_sheet(ws_data);

            /* Add the sheet name to the list */
            wb.SheetNames.push(ws_name);

            /* Load the worksheet object */
            wb.Sheets[ws_name] = ws;

            XLSX.writeFile(wb, 'tmp/informe_calibracion.xlsx');

            response.implicitEnd = false

            response.type = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";

            response.attachment(
                Helpers.tmpPath('informe_calibracion.xlsx'),
                'informe_calibracion.xlsx'
            )
        } catch (e) {
            console.log(e)
        }
    }

}

module.exports = Administracion