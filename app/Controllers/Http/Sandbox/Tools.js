'use strict'

const data = use('App/Utils/Data')

class Tools {
    

    async qr ({view,request, response, auth, session}) {
        
        
        return view.render('sandbox/qr' ,  {});
        
    }
}
module.exports = Tools;