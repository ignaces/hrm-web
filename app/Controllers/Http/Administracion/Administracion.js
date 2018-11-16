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


class Administracion {
     administrador  ({ view,request, response, auth }) {
        
        ////console.log(auth.user.username)
        ////console.log(auth.user.id)

      
        return view.render('/administracion/administrador');
    }

    async admincs  ({ view,request, response, auth }) {
        
        ////console.log(auth.user.username)
        ////console.log(auth.user.id)
        var objDatosProcesoActivos = {
            "idProceso":"",
            "idEstado":"ACTIVO"
        };
        var resultProcesosActivos =await api.execApi(request.hostname(),'/Desempeno/Proceso/getProcesos',objDatosProcesoActivos);
        
        var datosProcesosActivos =resultProcesosActivos.body.data;
      
        return view.render('/administracion/admincs', {datosProcesosActivos});
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

    async verDatosPersonaProceso  ({ view,request, response, auth }) {
        
        ////console.log(auth.user.username)
        ////console.log(auth.user.id)

        var idProceso = request.input("idProceso");
        var idPersona = request.input("idPersona");
        var linkVolver = '/administracion/Administracion/verPersonasProceso?idProceso='+idProceso;
        var obj = {
            "idProceso":idProceso,
            "idPersona":idPersona,
            "tipo": "evaluado"
        };

        var resultPersonasProceso =await api.execApi(request.hostname(),'/Desempeno/Proceso/getDatosPersonaProceso',obj);
        
        var datosPersonasProceso =resultPersonasProceso.body.data;

        var obj = {
            "idProceso":idProceso,
            "idPersona":idPersona,
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
        return view.render('/administracion/personaProceso', {datosEvaluador,datosPersonasProceso,datosEvaluadorProceso,datosClasificacionesPadres, datosClasificacionesHijos, setClasificacionesPersona, idProceso,linkVolver, datosPersonasEvaluadoras });
    }

    async resetearPassPorIdPersona ({ view,request, response, auth }) 
    {
        var idPersona = request.input("idPersona");
        var idProceso = request.input("idProceso");
        var origen = request.input("origen");

        var obj = {
            "idPersona":idPersona
        };

        var resultPersonasProceso =await api.execApi(request.hostname(),'/Persona/Persona/resetPassByPersonaId',obj);
        
        if(origen == "ficha")
        {
            response.redirect('/Administracion/administracion/verDatosPersonaProceso?idProceso='+idProceso+'&idPersona='+idPersona);
        }
        else
        {
            response.redirect('/Administracion/administracion/verPersonasProceso?idProceso='+idProceso);
        }
        
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
        
        response.redirect('/Administracion/administracion/verDatosPersonaProceso?idProceso='+idProceso+'&idPersona='+idPersona);
        
    }
    
    async updDatosPersona ({ view,request, response, auth }) 
    {
        var idPersona = request.input("idPersona");
        var idProceso = request.input("idProceso");
        
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
        
        response.redirect('/Administracion/administracion/verDatosPersonaProceso?idProceso='+idProceso+'&idPersona='+idPersona);
        
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
            response.redirect('/Administracion/administracion/verDatosPersonaProceso?idProceso='+idProceso+'&idPersona='+idPersona);
        }
        else
        {
            response.redirect('/Administracion/administracion/verPersonasProceso?idProceso='+idProceso);
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
        
        
        response.redirect('/Administracion/administracion/verDatosPersonaProceso?idProceso='+idProceso+'&idPersona='+idPersona);
    }

    async sabanaAvanceDownload({ view, request, response }) {


        var idProceso = request.input("idProceso")
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


}

module.exports = Administracion