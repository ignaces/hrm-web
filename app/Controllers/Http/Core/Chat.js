'use strict'

    const data = use('App/Utils/Data')
    
    class Chat {
         async room  ({ view,request, response, auth, session }) {
          
          return view.render('chat',  {});
        
        }   
      }
      
    module.exports = Chat