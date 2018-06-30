'use strict'

const data = use('App/Utils/Data')

class Talento {
    

    async colaboradoresTalento ({view,request, response, auth, session}) {
        //busca proceso por get y trae cantidad colaboradores
        var all =  session.get('personaLogueada')
        var idOpinante = all.id

        var idTalentoProceso = request.input("talento");
        session.put('procesoOrganigrama',idTalentoProceso);
        


        var obj = {
            "idTalentoProceso":idTalentoProceso,
            "idOpinante":idOpinante
        };

        
        var result = await data.execApi(request.hostname(),'/Talento/Talento/getFindTalentoProceso',obj);
        var total = result.body;
        //-----------------------------------COUNT(ColaboradoresClasificados)------------------
        //------------------------------------------------------------------------------------
        var countClasificados = await data.execApi(request.hostname(),'/Talento/Talento/obtenerColaboradorEvaluados',obj);
        var totalEvaluados = countClasificados.body;


        return view.render('talento/colaboradores' ,  {total:total,totalEvaluados:totalEvaluados});
    }

    async getColaboradores ({view,request, response, auth, session}) {
   
        

        var all =  session.get('personaLogueada')
        var idOpinante = all.id
        var idProceso =  session.get('procesoTalento');
        
        var obj = {
            "idTalentoProceso":idProceso,
            "idOpinante":idOpinante
        };
        
        var result = await data.execApi(request.hostname(),'/Talento/Talento/getPersonaTalentos',obj);
        
        var colaboradores = result.body;

        return colaboradores;

    }

    async filtroDragColaboradoresSinClasificar({view,request, response, auth, session}) {
        
        
        var all =  session.get('personaLogueada')
        var idOpinante = all.id
        
        //clasificaciones
        var clasificaciones = request.input("clasificaciones");
        //proceso
        var traerProceso =  session.get('procesoTalento');
        //cargosselectedoption
        var cargos = request.input("cargos");
        var tr = request.input("tr");

        //datos personas
        var identificador = request.input("identificador");
        var nombres = request.input("nombres");
        var paterno = request.input("paterno");
        var materno = request.input("materno");
        var obj = {
            "idOpinante":idOpinante,
            "idTalentoProceso":traerProceso,
            "clasificaciones":clasificaciones,
            "cargos":cargos,
            "tr":tr,
            "identificador":identificador,
            "nombres":nombres,
            "paterno":paterno,
            "materno":materno
        };
        
        var result = await data.execApi(request.hostname(),'/Talento/Talento/filtrarColaboradoresSinClasificar',obj);
        var total = result.body.data.arreglo;
        
        
        return total;
   
    }



    async colaboradoresTalento2 ({view,request, response, auth, session}) {
        //lista personas que estan en un proceso, pero no han sido evaluadas
        var all =  session.get('personaLogueada')
        var idOpinante = all.id
        
        var idTalentoProceso = request.input("talento");
        
        
       
        
        //var idTalento = request.input("talento")
        var obj = {
            "idTalentoProceso":idTalentoProceso,
            "idOpinante":idOpinante
        };
        
        var result = await data.execApi(request.hostname(),'/Talento/Talento/getPersonaTalentos',obj);
        
        var personas = result.body;
        
        return view.render('talento/colaboradoresTalento' ,  {personas:personas});
    }

    


    async nineBoxColaboradores ({view,request, response, auth, session}) {
        
        var all =  session.get('personaLogueada')
        var idOpinante = all.id
        
        
        var idTalentoProceso = request.input("talento");
        var rstl = session.put('procesoTalento',idTalentoProceso);

        //var idTalento = request.input("talento")
        var obj = {
            "idTalentoProceso":idTalentoProceso,
            "idOpinante":idOpinante
        };
        
        var result = await data.execApi(request.hostname(),'/Talento/Talento/colaboradoresSinCuadrante',obj);
        var personas = result.body;
        
        
        
        
        var all1 =  session.get('personaLogueada')
        var idOpinante1 = all1.id
        
        var idTalentoProceso1 = request.input("talento");
        
        var obj = {
            "idOpinante":idOpinante1,
            "idTalentoProceso":idTalentoProceso1
            };

        var result = await data.execApi(request.hostname(),'/Talento/Talento/generaCuadrantes',obj);
        var cuadrantes = result.body;
        
  
        var cuadrante1 = cuadrantes[0];
        var cuadrante2 = cuadrantes[1];
        var cuadrante3 = cuadrantes[2];
        var cuadrante4 = cuadrantes[3];
        var cuadrante5 = cuadrantes[4];
        var cuadrante6 = cuadrantes[5];
        var cuadrante7 = cuadrantes[6];
        var cuadrante8 = cuadrantes[7];
        var cuadrante9 = cuadrantes[8];


       var all2 =  session.get('personaLogueada')
       var idOpinante2 = all2.id
       
       var idTalentoProceso2 = request.input("talento");

       var obj = {
           "idTalentoProceso":idTalentoProceso2,
           "idOpinante":idOpinante2
       };

       var result = await data.execApi(request.hostname(),'/Talento/Talento/colaboradoresEvaluados',obj);
       var colaboradoresEva = result.body;
      
        

       //-----------------------------------------------------------------------------------
       //------------------------------------- CARGA DE COMBOBOX EMPRESA CARGO--------------
       //-----------------------------------------------------------------------------------
       
       var all3 =  session.get('personaLogueada')
        var idOpinante = all3.id
        
        var obj3 = {
            "idOpinante":idOpinante
            };
            var resultadoEmpresa = await data.execApi(request.hostname(),'/Talento/Talento/obtenerEmpresaOpinante',obj);
            
            
            var obtenerEmpresa = resultadoEmpresa.body;
            var idEmpresa = obtenerEmpresa.idEmpresa;
            

            var obj4 = {
                 "idEmpresa":idEmpresa
            };

            var obj5 = {
                "idEmpresa":idEmpresa,
                "idTalentoProceso":idTalentoProceso2
            };
            
            var resultadoCargos = await data.execApi(request.hostname(),'/Talento/Talento/obtenerCargosPorEmpresa',obj4);
            var cargosPorEmpresa = resultadoCargos.body;

            
        //----------------------------------------------------------------------------------
       //------------------------------------- CARGA DE COMBOBOX CLASIFICACION  ------------
       //-----------------------------------------------------------------------------------
       var resultadoClasificaciones = await data.execApi(request.hostname(),'/Talento/Talento/obtenerClasificaciones',obj5);
       var clasificacionesPorEmpresa = resultadoClasificaciones.body;

        return view.render('talento/nineBoxColaboradores', {
            personas:personas,
            cuadrantes:cuadrantes,
            cuadrante1:cuadrante1,
            cuadrante2:cuadrante2,
            cuadrante3:cuadrante3,
            cuadrante4:cuadrante4,
            cuadrante5:cuadrante5,
            cuadrante6:cuadrante6,
            cuadrante7:cuadrante7,
            cuadrante8:cuadrante8,
            cuadrante9:cuadrante9,
            colaboradoresEva:colaboradoresEva,
            cargosPorEmpresa:cargosPorEmpresa,
            clasificacionesPorEmpresa:clasificacionesPorEmpresa
        });
        
    }

   



    async seleccionDragTalento({view,request, response, auth, session}) {
        
        //var idColaborador = request.input("idColaborador");
        //const all = request.all()

        //console.log(all);
        var idTalentoMatriz = request.input("idComponente");
        var idTalentoOpinante = request.input("idOpinante");
        
        var obj = {
            "idTalentoOpinante":idTalentoOpinante,
            "idTalentoMatriz":idTalentoMatriz
            };
        //var result = await data.execApi(request.hostname(),'/Acreditacion/Proceso/putRespuesta',obj);
        
        var result = await data.execApi(request.hostname(),'/Talento/Talento/seleccionDragTalentoAPI',obj);
        var idInsert = result.body;
        

        //request.setHeader('Content-Type', 'application/json');
        //request.send(JSON.parse(idInsert));
        //return {mensaje:"OK"}
        //return idInsert //devuelve el ultimo insert creado por el drag and drop
    }


    async organigrama ({view,request, response, auth, session}) {
       
       
        var all =  session.get('personaLogueada')
        var idOpinante = all.id
        var idProceso =  session.get('procesoOrganigrama')
        
        var obj = {
            "idTalentoProceso":idProceso,
            "idOpinante":idOpinante
        };
        
        var result = await data.execApi(request.hostname(),'/Talento/Talento/getPersonaTalentos',obj);
        
        var colaboradores = result.body;
        
        return view.render('talento/organigrama', {colaboradoresList:colaboradores});


        
    }
    async getColaboradores({view,request, response, auth, session}){
        var persona =  session.get('personaLogueada')
        
        var obj = {
            "idTalentoProceso":session.get('procesoOrganigrama'),
            "idOpinante":persona.id
        };
        var result = await data.execApi(request.hostname(),'/Talento/Talento/getPersonaTalentos',obj);
        
        var personas = result.body;
    }
    async marketPlace ({view,request, response, auth, session}) {
       
       
        
        return view.render('talento/marketPlace', {});


        
    }

    async getOrganigrama({view,request, response, auth, session}){
        var persona =  session.get('personaLogueada')
        
        var obj = {
            "idProceso":session.get('procesoOrganigrama'),
            "idPersonaOpinante":persona.id
        };
        var result = await data.execApi(request.hostname(),'/Talento/Talento/organigrama',obj);
        var orgChart = result.body;
        return orgChart;

    }
    async setSucesor({view,request, response, auth, session}){
        var persona =  session.get('personaLogueada')
        var idPosicion = request.input('idPosicion');
        var idPersonaProceso = request.input('idProcesoPersona');
        
        var obj = {
            "idProceso":session.get('procesoOrganigrama'),
            "idPersonaOpinante":persona.id,
            "idPosicion":idPosicion,
            "idPersonaProceso":idPersonaProceso
        };
        
        var result = await data.execApi(request.hostname(),'/Talento/Organigrama/setSucesor',obj);
        var orgChart = result.body;
        return orgChart;

    }
    async fichaTalento ({view,request, response, auth, session}) {

        //var persona =  session.get('personaLogueada')
        var idPersona = request.input('idPersona')
        
        var obj = {
            "idPersona":idPersona,
            "idProceso":session.get('procesoOrganigrama')
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

            //console.log(objList)
            
            objCurriculum.push(objList)
        });
        return view.render('talento/fichaTalento', { objCurriculum:objCurriculum, persona:persona, idPersona:idPersona});
    }

    async addCurriculumPersona ({view,request, response, auth, session}) {
        
        var persona =  session.get('personaLogueada')
        var obj = {
            "titulo": request.input("titulo"),
            "bajada":request.input("bajada"),
            "desde":request.input("desde"),
            "hasta":request.input("hasta"),//"2010-01-01",
            "descripcion":request.input("descripcion"),
            "idPersonaFicha":request.input("idPersonaFicha"),
            "idPersonaCurriculumCategoria":request.input("idPersonaCurriculumCategoria")
        };
        
        var result = await data.execApi(request.hostname(),'/Talento/Talento/addCurriculumPersona',obj);
        var experiencia = result.body;
        
        return "mensaje:OK";
    }
}

module.exports = Talento