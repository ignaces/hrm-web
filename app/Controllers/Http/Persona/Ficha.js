'use strict'

const data = use('App/Utils/Data')

class Ficha {
   
    async index ({view,request, response, auth,session}) {

        var persona =  session.get('personaLogueada')
                
        var resultPersona =  await data.execApi(request.hostname(),'/Persona/Ficha/getPersonaDetalle',{idPersona:persona.id});
        var pers = resultPersona.body;

        var objExp = {
            "idPersona":persona.id
        };

        var resultCv =  await data.execApi(request.hostname(),'/Persona/Ficha/getPersonaCurriculum',objExp);
        var personaCv = resultCv.body;

        return view.render('persona/ficha',  {persona:pers[0],personaCv:personaCv});
    }

    async updateCv ({ view,request, response, auth, session }) {
        var cv = request.input("cv");
        var persona =  session.get('personaLogueada')

        var obj = {
            idPersona:persona.id,
            objCv:cv
        }

        var result = await data.execApiPost(request.hostname(),'/Persona/Ficha/updateCv',obj);

        var objExp = {
            "idPersona":persona.id
        };

        var resultCv =  await data.execApi(request.hostname(),'/Persona/Ficha/getPersonaCurriculum',objExp);
        var personaCv = resultCv.body;

        return personaCv;
    } 

    async updateIdioma ({ view,request, response, auth, session }) {
        var idioma = request.input("idioma");
        var persona =  session.get('personaLogueada')

        var obj = {
            idPersona:persona.id,
            objIdioma:idioma
        }

        var result = await data.execApiPost(request.hostname(),'/Persona/Ficha/updateIdioma',obj);
        var resultPersona =  await data.execApi(request.hostname(),'/Persona/Ficha/getPersonaDetalle',{idPersona:persona.id});
        var pers = resultPersona.body;

        return pers[0];
    } 

    async addIdioma ({ view,request, response, auth, session }) {
        var idioma = request.input("idioma");
        var persona =  session.get('personaLogueada')

        var obj = {
            idPersona:persona.id,
            objIdioma:idioma
        }

        var result = await data.execApiPost(request.hostname(),'/Persona/Ficha/addIdioma',obj);
        var resultPersona =  await data.execApi(request.hostname(),'/Persona/Ficha/getPersonaDetalle',{idPersona:persona.id});
        var pers = resultPersona.body;

        return pers[0];
    } 

    async addCv ({ view,request, response, auth, session }) {
        var cv = request.input("cv");
        var persona =  session.get('personaLogueada')

        var obj = {
            idPersona:persona.id,
            objCv:cv
        }

        var result = await data.execApiPost(request.hostname(),'/Persona/Ficha/addCv',obj);

        var objExp = {
            "idPersona":persona.id
        };

        var resultCv =  await data.execApi(request.hostname(),'/Persona/Ficha/getPersonaCurriculum',objExp);
        var personaCv = resultCv.body;

        return personaCv;
    } 

    async deleteIdioma ({ view,request, response, auth, session }) {
        var idioma = request.input("idioma");
        var persona =  session.get('personaLogueada')

        var obj = {
            idPersona:persona.id,
            objIdioma:idioma
        }

        var result = await data.execApiPost(request.hostname(),'/Persona/Ficha/deleteIdioma',obj);
        var resultPersona =  await data.execApi(request.hostname(),'/Persona/Ficha/getPersonaDetalle',{idPersona:persona.id});
        var pers = resultPersona.body;

        return pers[0];
    } 

    async deleteCv ({ view,request, response, auth, session }) {
        var cv = request.input("cv");
        var persona =  session.get('personaLogueada')

        var obj = {
            idPersona:persona.id,
            objCv:cv
        }

        var result = await data.execApiPost(request.hostname(),'/Persona/Ficha/deleteCv',obj);

        var objExp = {
            "idPersona":persona.id
        };

        var resultCv =  await data.execApi(request.hostname(),'/Persona/Ficha/getPersonaCurriculum',objExp);
        var personaCv = resultCv.body;

        return personaCv;
    } 

    /****/
     historia ({view,request,response}){
         const Env = use('Env')
         
         var server = Env.get('API_SERVER', 'development')
         
         var historial = [{
             descripcion:""
         }];
        return view.render('persona/historia',  {historial:historial}); 
    }

    talento ({view,request, response, auth}) {

        
        const Env = use('Env')
        var server = Env.get('API_SERVER', 'development')
        var persona = {
            nombre:"Juan Alberto Gonzales Moya",
            cargo:"Cargo x",
            perfilCargo:"Maestro OOCC Empalmes",
            contratista:"Cobra"
        };
        return view.render('persona/talento',  {persona:persona});
    }
}

module.exports = Ficha