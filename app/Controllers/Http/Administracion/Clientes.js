'use strict'

    const data = use('App/Utils/Data')
    
    class Clientes {
         async index  ({ view,request, response, auth, session }) {
          
          return view.render('administracion/index',  {});
        
        }   
      }
      
    module.exports = Clientes