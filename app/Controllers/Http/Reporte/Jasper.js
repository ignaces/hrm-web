'use strict'
const data = use('App/Utils/Data')

class Jasper {
     async test ({view,request, response}) {

       
        return view.render('Reportes/jasper',  {});
    }
    
   async Show ({view,request,response}){
    return view.render('Reportes/jasperE',  {});
   }
    
    
}

module.exports = Jasper