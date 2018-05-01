'use strict'

    const data = use('App/Utils/Data')
    
    class Menu {
         async index  ({ view,request, response, auth, session }) {
          
          return view.render('administracion/menu/index',  {});
        
        }   
      }
      
    module.exports = Menu