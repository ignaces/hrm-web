'use strict'

const got = use('got')

class Portada {
     async welcome  ({ view,request, response, auth, session }) {
        
        //console.log(auth.user.username)
        var idPersona = session.get('idPersona', 'fall')

        var user={usuario:auth.user}
        var cargo="Evaluador FCH"
        var genero="F"
        var imageUser="/assets/images/icons/businessman.svg"
        if (genero=="F"){
            imageUser="/assets/images/icons/businesswoman.svg"
        }
        return view.render('core/welcome',  {user,cargo,genero,imageUser});
    }   
}

module.exports = Portada