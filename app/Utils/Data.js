'use strict'
const Database = use('Database')
const Env = use('Env')
const Helpers = use('Helpers')
const got = use('got')


module.exports = {
    execApi: async (hostname,method,obj)=>{
        
        var server = Env.get('API_SERVER', 'development')
        var alias = Env.get('HOSTALIAS', 'localhost')

        var cliente = hostname.split(".")[0]
        if(hostname==alias){
            cliente = "localhost";
        }
        obj.cliente = cliente;
        
        var result = await got(`${server}${method}`,
        {
            json:true,
            query:obj
        })
        //console.log(obj)
        return result;
    },
    execApiPost: async (hostname,method,obj)=>{
        
        var server = Env.get('API_SERVER', 'development')
        var alias = Env.get('HOSTALIAS', 'localhost')

        var cliente = hostname.split(".")[0]
        if(hostname==alias){
            cliente = "localhost";
        }
        obj.cliente = cliente;
        
        var result = await got.post(`${server}${method}`,
        {
            json:true,
            body:obj
        })
        //console.log(obj)
        return result;
    }

}
