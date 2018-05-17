'use strict'

    const data = use('App/Utils/Data')
    
    class Chat {
      async index({ view,request, response, auth, session }){

        return view.render('core/chat',  {});
      }
      async room  ({ view,request, response, auth, session }) {
      
        return view.render('core/chat',  {});
    
      }   
    }
      
    module.exports = Chat