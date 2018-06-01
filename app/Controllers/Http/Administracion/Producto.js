'use strict'
const data = use('App/Utils/Data')

class Producto {
    index ({view,request, response, auth}) {

        console.log(auth.user)
        
        return view.render('administracion/producto/index',  {persona:""});
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

module.exports = Producto