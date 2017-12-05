'use strict'

const got = use('got')
const fs =require('fs')

  
  
class Style {
    async index  ({ view,request, response }) {
        const estilo= new Array()
        var currentArea =""
        var lines = require('fs').readFileSync('public/themes/horizontal/assets/less/variables.less', 'utf-8').split('\n').filter(Boolean);
            
        lines.forEach((item)=>{
            if(item.search('//begin')>-1){
                
                currentArea=item.substring(7,item.length)
                
            }else{
                
                var endVar = item.search(':')
                var endVal = item.search(';')
                var nombre = item.substring(0,endVar)
                var valor  = item.substring(endVar+1,endVal).trim() 
                estilo.push({
                    tipo:currentArea,
                    nombre:nombre,
                    valor:valor
                })
            }
        })
         
            
            
            
        
        
        
        
        
        return view.render('core/style/index',{estilos:estilo});
        
        
    }
}

module.exports = Style