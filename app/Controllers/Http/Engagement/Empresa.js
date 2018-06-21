'use strict'
const got = use('got')
const data = use('App/Utils/Data')
var Enumerable = require('linq');
const XLSX = require('xlsx')
const Helpers = use('Helpers')
const fs = use('fs')
const readFile = Helpers.promisify(fs.readFile)
class Empresa {


    async index({ view,request, response, auth, session }){
        
        /*TODO 
            getClasificacionesPeriodoEmpresa
            getAplicacionesEncuesta
        */
        return view.render('engagement/empresa/index',  {periodos:periodos});
    }
    async create  ({ view,request, response, auth, session }) {
          
        var empresa = request.get("empresa");
        
        var idPeriodo = request.input("idProceso");
        
        var rEmpresa = await data.execApiPost(request.hostname(),'/Engagement/Empresa/create',{empresa:empresa});
        
        var result = await data.execApi(request.hostname(),'/Engagement/Empresa/list',{idPeriodo:idPeriodo});

        const empresas = result.body;
            
        return empresas;
    
    }  

    async empresasPeriodo({ view,request, response, auth, session }){
            var idPeriodo = request.input("idPeriodo");
            
            var result = await data.execApi(request.hostname(),'/Engagement/Empresa/list',{idPeriodo:idPeriodo});

            const empresas = result.body;
             
           return empresas;
    }
    async getEmpresasFueraProceso({ view,request, response, auth, session }){
            var idProceso = request.input("idProceso");
            
            
            var result = await data.execApi(request.hostname(),'/Engagement/Empresa/getEmpresasFueraProceso',{idProceso:idProceso});

            const empresas = result.body;
            
        return empresas;
    }
    async getClasificaciones({ view,request, response, auth, session }){
        var idEmpresaProceso = request.input("idEmpresaProceso");
        
        
        var result = await data.execApi(request.hostname(),'/Engagement/Empresa/getClasificaciones',{idEmpresaProceso:idEmpresaProceso});

        const clasificaciones = result.body;
        
        return clasificaciones;
    }
    async addClasificacion  ({ view,request, response, auth, session }) {
          
        var clasificacion = request.get("clasificacion");
        
    
        var result = await data.execApiPost(request.hostname(),'/Engagement/Empresa/addClasificacion',{clasificacion:clasificacion});

        const clasificaciones = result.body;
            
        return clasificaciones;
    
    }  
    async getExcelResultado ({ view,request, response, auth, session }) {
        var id = request.input("idEncuestaAplicacion");
        var result = await data.execApi(request.hostname(),'/Engagement/Aplicacion/resultados',{idEncuestaAplicacion:id});  
        const XLSX = require('xlsx');
        
        var cabecera = Object.keys(result.body[0]);
    
        var wb = {
            SheetNames: [],
            Sheets: {}
        }
        
        var registros = result.body;
        var ws_name = "Resultados";

            /* make worksheet */
            var ws_data = [
                cabecera
            ];
            for(var fila in registros){
                
                var registro = [];
                for(var campo in cabecera){
                    
                    registro.push(registros[fila][cabecera[campo]]);
                }
                
                ws_data.push(registro);
                
            }
            
            var ws = XLSX.utils.aoa_to_sheet(ws_data);

            /* Add the sheet name to the list */
            wb.SheetNames.push(ws_name);
        
            /* Load the worksheet object */
            wb.Sheets[ws_name] = ws;
            
        XLSX.writeFile(wb, 'tmp/resultados.xlsx');
        
        response.implicitEnd = false
        
        response.type = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
        
        response.attachment(
            Helpers.tmpPath('resultados.xlsx'),
            'resultados.xlsx'
        )
      
    } 
}

module.exports = Empresa