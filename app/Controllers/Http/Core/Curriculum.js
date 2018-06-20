'use strict'

const data = use('App/Utils/Data')

class Curriculum {

    async getCurriculum ({view,request, response, auth, session}) {

        var persona =  session.get('personaLogueada')

        var obj = {
            "idPersona":persona.id
        };
        
        var result = await data.execApi(request.hostname(),'/Talento/Talento/getExperienciaLaboral',obj);
        var experiencia = result.body;
        
        return view.render('Core/curriculum', { experiencia:experiencia});
    }

}
module.exports = Curriculum