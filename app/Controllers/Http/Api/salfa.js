'use strict'

const data = use('App/Utils/Data')

class salfa {

    async InformeResultado ({request,response}) {
        var val = request.input("idProceso");
        //console.log(val)
        if(val == '')
        {
            response.json("Error");
        }
        else
        {
            response.json("OK");
        }
    }
}

module.exports = salfa