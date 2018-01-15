'use strict'

const got = use('got')

class Portada {
     welcome  ({ view,request, response, auth }) {
        
        //console.log(auth.user.username)
        console.log(auth.user)

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