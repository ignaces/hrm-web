'use strict'

const got = use('got')
const fs =require('fs')

  
  
class Herramientas {
    async documentos  ({ view,request, response }) {
        var docs=[{
                id:"",
                nombre:"sss",
                tipo:"pdf",
                url:"#"

        },{
            id:"",
            nombre:"sss",
            tipo:"pdf",
            url:"#"

        }];      
        return view.render('core/herramientas/documentos',{docs});
        
        
    }
}

module.exports = Herramientas