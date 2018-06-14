'use strict'

    const data = use('App/Utils/Data')
    
    class Empresa {
         async create  ({ view,request, response, auth, session }) {
          
            var empresa = request.get("empresa");

          return view.render('core/modulos/index',  {});
        
        }   
      }
      
    module.exports = Empresa