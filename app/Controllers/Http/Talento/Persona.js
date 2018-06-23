'use strict'

const data = use('App/Utils/Data')
const Helpers = use('Helpers')
const fs = use('fs')
const Antl = use('Antl')
var safeUrl = require('safe-url')
var wget = require('node-wget-promise');
const readFile = Helpers.promisify(fs.readFile)
class Persona {
    

    async fichaCompromiso ({view,request, response, auth, session}) {
        
        var idPersona = request.input('idPersona')
        
        var obj = {
            "idPersona":idPersona,
            "idProceso":session.get('procesoOrganigrama')
        };
        
        var resultPersona =  await data.execApi(request.hostname(),'/Talento/Persona/getPersona',obj);
        var resultPlanDesarrollo =  await data.execApi(request.hostname(),'/Talento/Accion/getPlanDesarrollo',obj);
        
        var tiposAccion =  await data.execApi(request.hostname(),'/Talento/Accion/tipoAccion',{obj});
        
        var resultCompetencias =  await data.execApi(request.hostname(),'/Talento/Accion/getCompetencias',{});
        var persona = resultPersona.body;

        
        return view.render('talento/fichaCompromiso' ,  {
                persona:persona[0], 
                idPersona:idPersona,
                tiposAccion:tiposAccion.body,
                accionesPredefinidas:[],
                competencias:resultCompetencias.body,
                planDesarrollo:resultPlanDesarrollo.body
            });
    }

    async getPosiblesSucesores ({view,request, response, auth, session}) {
        
        var idPosicion = request.input('idPosicion')
        var idPersona = request.input('idPersona')
        var obj = {
            "idPosicion":idPosicion,
            "idProceso":session.get('procesoOrganigrama')
        };
        
        var result =  await data.execApi(request.hostname(),'/Talento/Persona/getPosiblesSucesores',obj);
        
       
        var posiciones = result.body;

       
        response.json(posiciones);
    }
    async getPdfFicha({ view, request, response, auth ,session}) {
        
        var idPersona = request.input("idPersona");
        var idProceso = session.get('procesoOrganigrama');
        var server = 'cs.enovum.cl';//request.hostname();


        //var result = await got(`http://192.168.3.4:8080?url=${server}/Acreditacion/Informe/pdf?procesoPersona=${idPersona}&cd=${conDetalle}`);
        //%2FTalento%2FPersona%2FfichaPdf%3FidPersona=%3D
        var url = `http://192.168.3.4:8080/?url=http%3A%2F%2F${server}%2FTalento%2FPersona%2FfichaPdf%3FidPersona=%3D${idPersona}%26idProceso%3D${idProceso}`;


        var file = await wget(url, { output: 'tmp/ficha.pdf' });

        response.type = "application/pdf";

        response.attachment(
            Helpers.tmpPath('ficha.pdf'),
            'ficha.pdf'
        )



    }
    async fichaPdf ({view,request, response, auth, session}) {

        //var persona =  session.get('personaLogueada')
        var idPersona = request.input('idPersona')
        
        var idProceso = request.input('idProceso')
        var obj = {
            "idPersona":idPersona,
            "idProceso":idProceso
        };
        
        var resultPersona =  await data.execApi(request.hostname(),'/Talento/Talento/getPersona',obj);
       
        var result = await data.execApi(request.hostname(),'/Talento/Talento/getCurriculumCategoria',obj);
        var categoria = result.body;
        var persona = resultPersona.body;

        var result2 = await data.execApi(request.hostname(),'/Talento/Talento/getCurriculumPersona',obj);
        var curriculum = result2.body;
        var objCurriculum = [];

        categoria.forEach(element => {

            var objItems = [];

            for(var c in curriculum){
                if(curriculum[c]["id"] == element.id)
                {
                    objItems.push(curriculum[c]);
                }
            }

            var objList = {
                "nombreCategoria": element.nombre,
                "idCategoria": element.id,
                "listItems": objItems,
                "totalItems": objItems.length
            }
            objCurriculum.push(objList)
        });
        return view.render('talento/fichaTalentoPdf', { objCurriculum:objCurriculum, persona:persona, idPersona:idPersona});
    }
    async accionesTipo ({view,request, response, auth, session}) {
        
        
        var idTipo = request.input('idTipo')
        var obj = {
            "idTipo":idTipo,
            "idProceso":session.get('procesoOrganigrama')
        };
        
        
        var result =  await data.execApi(request.hostname(),'/Talento/Accion/acciones',obj);
        
       
        var acciones = result.body;

       
        response.json(acciones);
    }
    async addAccion ({view,request, response, auth, session}) {
        
        var accion = request.get('acciones')
        var idPlan = request.input('idPlan')
       
        var obj = {
        
            "accion":accion,
            "idPlan":idPlan,
            "idProceso":session.get('procesoOrganigrama')
        };
        
        var result =  await data.execApiPost(request.hostname(),'/Talento/Accion/addAccion',obj);
        
        var resultPlanDesarrollo =  await data.execApi(request.hostname(),'/Talento/Accion/getPlanDesarrolloById',obj);
        var acciones = resultPlanDesarrollo.body.acciones;

       
        response.json(acciones);
    }
    async saveAccion ({view,request, response, auth, session}) {
        
        var accion = request.get('acciones')
        var idPlan = request.input('idPlan')
       
        var obj = {
        
            "accion":accion,
            "idPlan":idPlan,
            "idProceso":session.get('procesoOrganigrama')
        };
        
        var result =  await data.execApiPost(request.hostname(),'/Talento/Accion/saveAccion',obj);
        
        var resultPlanDesarrollo =  await data.execApi(request.hostname(),'/Talento/Accion/getPlanDesarrolloById',obj);
        var acciones = resultPlanDesarrollo.body.acciones;

       
        response.json(acciones);
    }
    async deleteAccion ({view,request, response, auth, session}) {
        
        var accion = request.get('acciones')
        var idPlan = request.input('idPlan')
       
        var obj = {
        
            "accion":accion,
            "idPlan":idPlan,
            "idProceso":session.get('procesoOrganigrama')
        };
        
        var result =  await data.execApiPost(request.hostname(),'/Talento/Accion/deleteAccion',obj);
        
        var resultPlanDesarrollo =  await data.execApi(request.hostname(),'/Talento/Accion/getPlanDesarrolloById',obj);
        var acciones = resultPlanDesarrollo.body.acciones;

       
        response.json(acciones);
    }

}
module.exports = Persona