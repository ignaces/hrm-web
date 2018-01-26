'use strict'

const got = use('got')

class Rrhh {
    async reporte  ({ view,request, response, auth }) {
        
       
        return view.render('rrhh/reporte');
    }   
}

module.exports = Rrhh