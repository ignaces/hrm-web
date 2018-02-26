'use strict'

const got = use('got')

class Informe {
     index  ({ view,request, response, auth }) {
        
       
        return view.render('acreditacion/informe/informesd');
    }   
}

module.exports = Informe