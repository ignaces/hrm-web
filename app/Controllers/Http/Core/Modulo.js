'use strict'

    const data = use('App/Utils/Data')
    
    class Modulo {
         async index  ({ view,request, response, auth, session }) {
          
          return view.render('core/modulos/index',  {});
        
        }   
      }
      
    module.exports = Modulo