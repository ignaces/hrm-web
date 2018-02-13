'use strict'

const got = use('got')

class Informe {
     informeSD  ({ view,request, response, auth }) {
        
       
        return view.render('acreditacion/informe/informesd');
    }   
}

module.exports = Informe