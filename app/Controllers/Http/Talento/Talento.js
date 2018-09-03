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
        var jefatura = request.input("jefatura");

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
            "jefatura":jefatura,
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

    
    async getColaboradoresClasificados ({view,request, response, auth, session}) {
        var all =  session.get('personaLogueada')
        var idOpinante = all.id
        
        var idTalentoProceso = session.get('talentoProceso');
        //clasificaciones
        var clasificaciones = request.input("clasificaciones");
        //cargosselectedoption
        var cargos = request.input("cargos");
        var tr = request.input("tr");
        var jefatura = request.input("jefatura");

        //datos personas
        var identificador = request.input("identificador");
        var nombres = request.input("nombres");
        var paterno = request.input("paterno");
        var materno = request.input("materno");

        var obj = {
            "idTalentoProceso":idTalentoProceso,
            "idOpinante":idOpinante,
            "clasificaciones":clasificaciones,
            "cargos":cargos,
            "tr":tr,
            "jefatura":jefatura,
            "identificador":identificador,
            "nombres":nombres,
            "paterno":paterno,
            "materno":materno
        };
        
        var result = await data.execApi(request.hostname(),'/Talento/Talento/colaboradoresEvaluados',obj);
        var colaboradoresEva = result.body;

        return colaboradoresEva.clasificaciones;
       
    }

    async nineBoxColaboradores ({view,request, response, auth, session}) {
        
        var all =  session.get('personaLogueada')
        
        var idOpinante = all.id
        
        
        var idTalentoProceso = request.input("talento");
        session.put('talentoProceso',idTalentoProceso);
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

       var all2 =  session.get('personaLogueada')
       var idOpinante2 = all2.id
       
       var idTalentoProceso2 = request.input("talento");

       var obj = {
           "idTalentoProceso":idTalentoProceso2,
           "idOpinante":idOpinante2
       };

       /*var result = await data.execApi(request.hostname(),'/Talento/Talento/colaboradoresEvaluados',obj);
       var colaboradoresEva = result.body;*/
      
        

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

            var resultJefaturas = await data.execApi(request.hostname(),'/Talento/Talento/getPersonasArbol',{
                "idProceso":idTalentoProceso,
                "idPersonaOpinante":idOpinante
            });
            var jefaturas= resultJefaturas.body;
       //-----------------------------------------------------------------------------------
       //------------------------------------- CARGA DE COMBOBOX CLASIFICACION  ------------
       //-----------------------------------------------------------------------------------
       var resultadoClasificaciones = await data.execApi(request.hostname(),'/Talento/Talento/obtenerClasificaciones',obj5);
       var clasificacionesPorEmpresa = resultadoClasificaciones.body;
       

        return view.render('talento/nineBoxColaboradores', {
            personas:personas,
            cuadrantes:cuadrantes,
            cargosPorEmpresa:cargosPorEmpresa,
            clasificacionesPorEmpresa:clasificacionesPorEmpresa,
            jefaturas
        });
        
    }

   



    async seleccionDragTalento({view,request, response, auth, session}) {
        
        
        var idTalentoMatriz = request.input("idComponente");
        var idTalentoOpinante = request.input("idOpinante");
        var justificacion = request.input("justificacion");
        
        var obj = {
                "idTalentoOpinante":idTalentoOpinante,
                "idTalentoMatriz":idTalentoMatriz,
                "justificacion":justificacion
            };
        
        var result = await data.execApi(request.hostname(),'/Talento/Talento/seleccionDragTalentoAPI',obj);
        
       // var idInsert = result.body;
        
       
       return result.body;
        
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
        var clasificacionesPersona = await data.execApi(request.hostname(),'/Talento/Persona/getClasificaciones',{idProceso:idProceso,idPersona:idOpinante});
        var colaboradores = result.body;

        clasificacionesPersona = clasificacionesPersona.body;
        var Clasificaciones={area:"",division:""};
        

        for(var i in clasificacionesPersona){
            
            if(clasificacionesPersona[i].CodigoClasificacionPadre=="CSCL002"){
                    Clasificaciones.area = clasificacionesPersona[i].nombre
            }
            if(clasificacionesPersona[i].CodigoClasificacionPadre=="CSCL001"){
                Clasificaciones.division = clasificacionesPersona[i].nombre
            }
        }
        return view.render('talento/organigrama', {colaboradoresList:colaboradores,Clasificaciones:Clasificaciones});


        
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
    async delSucesor({view,request, response, auth, session}){
        var persona =  session.get('personaLogueada')
        var idSucesion = request.input('idSucesion');
        
        var obj = {
            "idProceso":session.get('procesoOrganigrama'),
            "idPersonaOpinante":persona.id,
            "idSucesion":idSucesion
        };
        
        var result = await data.execApi(request.hostname(),'/Talento/Organigrama/delSucesor',obj);
        var orgChart = result.body;
        return orgChart;

    }
    async fichaTalento ({view,request, response, auth, session}) {
        try{
            var personaLogueada =  session.get('personaLogueada')
            
            var idPersona = request.input('idPersona')
            var showAll = true
            if(personaLogueada.id==idPersona){
                showAll=false;
            }
            var obj = {
                "idPersona":idPersona,
                "idProceso":session.get('procesoOrganigrama')
            };
            var resultPersona =  await data.execApi(request.hostname(),'/Talento/Persona/getPersona',obj);;//data.execApi(request.hostname(),'/Talento/Talento/getPersona',obj);
            var resultadosPersona =  await data.execApi(request.hostname(),'/Talento/Persona/getResultados',{idPersona:idPersona});
            var result = await data.execApi(request.hostname(),'/Talento/Talento/getCurriculumCategoria',obj);
            var categoria = result.body;
            var persona = resultPersona.body[0];
            var result2 = await data.execApi(request.hostname(),'/Talento/Talento/getCurriculumPersona',obj);
            var curriculum = result2.body;
            var objCurriculum = [];
            persona.resultados=resultadosPersona.body;
            if(persona.fotoPersona=="" || persona.fotoPersona==null){
                persona.fotoPersona="/assets/images/icons/businessman.svg"
            }
            
            categoria.forEach(element => {
                var objItems = [];
                if(curriculum.length > 0)
                {
                    for(var c in curriculum){
                        if(c != null && curriculum[c]["id"] == element.id)
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
                }
            });
            
            var objEncuestaLista = {
                idPersona:idPersona
            }
            var resultEncuestaLista = await data.execApi(request.hostname(),'/Encuesta/Medicion/getListaEncuesta',objEncuestaLista);
            var lista = resultEncuestaLista.body;
            
            var idEncuestaPersona = 0
            if(lista.data.length > 0)
            {
                idEncuestaPersona = lista.data[0].id 
            }

            var objEnc = {
                idEncuestaPersona:idEncuestaPersona
            }
            //console.log("OK2")
            var result = await data.execApi(request.hostname(),'/Encuesta/Medicion/getInstrumento',objEnc);
            var instrumento = result.body;

            var resultEncuestaFraseo = await data.execApi(request.hostname(),'/Talento/Persona/getEncuestaFraseo',objEnc);
            var encuestaFraseo = resultEncuestaFraseo.body.data;
            
            return view.render('talento/fichaTalento', 
            { 
                objCurriculum:objCurriculum, 
                persona:persona, 
                idPersona:idPersona,
                showAll:showAll,

                idEncuestaPersona:idEncuestaPersona,
                instrumento:instrumento,
                encuestaFraseo
            });
        } catch(e){
            console.log(e);
            return "";
        }
        
    }

    async encuesta ({view,request, response, auth, session}) {

        try
        {
            var personaLogueada =  session.get('personaLogueada')
            
            var idPersona = request.input('idPersona')
            var showAll = true
            if(personaLogueada.id==idPersona){
                showAll=false;
            }

            var obj = {
                "idPersona":idPersona
            };
            
            var resultPersona =  await data.execApi(request.hostname(),'/Encuesta/Medicion/getPersona',obj);;//data.execApi(request.hostname(),'/Talento/Talento/getPersona',obj);
            
            var persona = resultPersona.body.data[0];

            
        
            var objEncuestaLista = {
                idPersona:idPersona
            }
            var resultEncuestaLista = await data.execApi(request.hostname(),'/Encuesta/Medicion/getListaEncuesta',objEncuestaLista);
            var lista = resultEncuestaLista.body;

            var idEncuestaPersona = lista.data[0].id 
            var objEnc = {
                idEncuestaPersona:idEncuestaPersona
            }
            var result = await data.execApi(request.hostname(),'/Encuesta/Medicion/getInstrumento',objEnc);

            var instrumento = result.body;
            
            return view.render('talento/encuesta', 
            {
                persona:persona, 
                idPersona:idPersona,                

                idEncuestaPersona:idEncuestaPersona,
                instrumento:instrumento
            });

        } catch(e){
            console.log(e)
        }
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