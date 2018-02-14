'use strict'
const data = use('App/Utils/Data')

class Jasper {
     async test ({view,request, response}) {

       
        return view.render('Reportes/jasper',  {});
    }
    
   
    
    
}

module.exports = Jasper