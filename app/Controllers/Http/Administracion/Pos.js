'use strict'
const data = use('App/Utils/Data')

class Pos {
    index ({view,request, response, auth}) {

        console.log(auth.user)
        
        return view.render('administracion/pos/index',  {persona:""});
    }

    modificarProducto ({view,request, response, auth}) {

        console.log(auth.user)
        
        return view.render('administracion/producto/modificarProducto',  {persona:""});
    }

    agregarProducto ({view,request, response, auth}) {

        console.log(auth.user)
        
        return view.render('administracion/producto/agregarProducto',  {persona:""});
    }
}

module.exports = Pos