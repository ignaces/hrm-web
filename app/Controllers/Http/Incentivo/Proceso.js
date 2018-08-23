'use strict'

const data = use('App/Utils/Data')

class Proceso {
    

    async colaboradores ({view,request, response, auth, session}) {
        
        var idPersona = session.get('idPersona', 'fail')
        var idPuntoDeVenta = session.get('idPuntoDeVenta', 'fail');

        //var idProceso = request.input("proceso")
        var persona = session.get('personaLogueada')

        //session.put('idProceso',idProceso);
        
        //var obj = {
        //    "idProceso":idProceso,
        //    "idPersona": idPersona
        //};
        
        //var result = await data.execApi(request.hostname(),'/Acreditacion/Proceso/getPersonasEvaluaciones',obj);
        //var personas = result.body.data;
        
        var objMet = {
            "idPersona": idPersona,
            "idPuntoDeVenta": idPuntoDeVenta
        };
        console.log(objMet);
        
        var resultMetas = await data.execApi(request.hostname(),'/Incentivos/Incentivos/getValoresMeta',objMet);
        var resultMetasBonoMix = await data.execApi(request.hostname(),'/Incentivos/Incentivos/getValoresMetaBonoMix',objMet);
        //var valoresMetas = "";
        var valoresMetas = resultMetas.body[0];
        //console.log(resultMetas);
        
        var valoresMetasBonoMix = resultMetasBonoMix.body;
        //console.log(valoresMetasBonoMix);
        
        return view.render('incentivo/proceso/colaboradores', {persona, valoresMetas, valoresMetasBonoMix});
    }

    async supervisor ({view,request, response, auth, session}) {
        
        //var idPersona = session.get('idPersona', 'fail')
        //var idProceso = request.input("proceso")

        //session.put('idProceso',idProceso);
        /*
        var obj = {
            "idProceso":idProceso,
            "idPersona": idPersona
        };
        */
        //var result = await data.execApi(request.hostname(),'/Acreditacion/Proceso/getPersonasEvaluaciones',obj);
        //var personas = result.body.data;
        
        return view.render('incentivo/proceso/supervisor');
    }

    async gestionDeVenta ({view,request, response, auth, session}) {
        
        //var idPersona = session.get('idPersona', 'fail')
        //var idProceso = request.input("proceso")

        //session.put('idProceso',idProceso);
        /*
        var obj = {
            "idProceso":idProceso,
            "idPersona": idPersona
        };
        */
        //var result = await data.execApi(request.hostname(),'/Acreditacion/Proceso/getPersonasEvaluaciones',obj);
        //var personas = result.body.data;
        
        return view.render('incentivo/proceso/gestionDeVenta');
    }

    async catalogo ({view,request, response, auth, session}) {
        
        var idPersona = session.get('idPersona', 'fail')
        var idProceso = request.input("proceso")

        session.put('idProceso',idProceso);

        var obj = {
            "idProceso":idProceso,
            "idPersona": idPersona
        };
        //console.log(obj);
        //var result = await data.execApi(request.hostname(),'/Acreditacion/Proceso/getPersonasEvaluaciones',obj);
        //var personas = result.body.data;
        
        return view.render('incentivo/proceso/catalogo');
    }
    async cardex ({view,request, response, auth, session}) {
        
        var idPersona = session.get('idPersona', 'fail')
        var idProceso = request.input("proceso")

        var idPersona = session.get('idPersona', 'fail')
        var idPuntoDeVenta = session.get('idPuntoDeVenta', 'fail');

        //var idProceso = request.input("proceso")
        var persona = session.get('personaLogueada')

        session.put('idProceso',idProceso);

        var obj = {
            "idProceso":idProceso,
            "idPersona": idPersona
        };
        //console.log(obj);
        //var result = await data.execApi(request.hostname(),'/Acreditacion/Proceso/getPersonasEvaluaciones',obj);
        //var personas = result.body.data;
        
        return view.render('incentivo/proceso/cardex', {persona});
    }

    //async addCheckIn ({view,request, response, auth, session}) {
    async addCheckIn ({request, response}) {
        var idPersona = request.input("idPersona");
        var idPuntoDeVenta = request.input("idPuntoDeVenta");
        var lat = request.input("lat");
        var lon = request.input("lon");

        var obj = {
            "idPersona":idPersona,
            "idPuntoDeVenta":idPuntoDeVenta,
            "lat":lat,
            "lon":lon
        };
            
        var result = await data.execApi(request.hostname(),'/Incentivos/Incentivos/addCheckIn',obj);

        return {mensaje:"OK"};
    }

    async addCliente ({request, response, session}) {
        var idPersona = session.get('idPersona', 'fail');
        var idPuntoDeVenta = session.get('idPuntoDeVenta', 'fail');
        var identificador = request.input("identificador");
        
        var nombres = request.input("nombre");
        var apellido = request.input("apellido");
        var email = request.input("email");
        var telefono = request.input("telefono");
        
        var obj = {
            "idPersona":idPersona,
            "idPuntoDeVenta":idPuntoDeVenta,
            "identificador": identificador,
            "nombres":nombres,
            "apellido":apellido,
            "email": email, 
            "telefono": telefono
        };
            
        var result = await data.execApi(request.hostname(),'/Incentivos/Incentivos/addCliente',obj);

        return {mensaje:"OK"};
    }

    async addVenta ({request, response, session}) {
        
        //objProds.prods = ventaProds;
        //console.log(objProds);
        var idPersona = session.get("idPersona");
        var idPuntoDeVenta = session.get("idPuntoDeVenta");
        var urlFoto = "";
        var lat = request.input("lat");
        var lon = request.input("lon");
        var productos = request.input("productos");
        var idCliente = request.input("idCliente");
        var identificadorCliente = request.input("identificadorCliente");
        var nombreCliente = request.input("nombreCliente");
        var apellidoCliente = request.input("apellidoCliente");
        var emailCliente = request.input("emailCliente");
        var telefonoCliente = request.input("telefonoCliente");
        
        //console.log(productos);
        //return false;
        
        var objForm = {
            "idPersona": idPersona,
            "idPuntoDeVenta": idPuntoDeVenta,
            "urlFoto": "",
            "lat": lat,
            "lon": lon,
            "idCliente": idCliente,
            "identificadorCliente": identificadorCliente,
            "nombreCliente": nombreCliente,
            "apellidoCliente": apellidoCliente,
            "emailCliente": emailCliente,
            "telefonoCliente": telefonoCliente,
            "productos": productos 
        };

        var result = await data.execApiPost(request.hostname(),'/Incentivos/Incentivos/addVenta',objForm);
        console.log(result);
        return {mensaje:"OK"};
        //return view.render('incentivo/proceso/addVenta');
    }

    async ingresoVenta ({request, response, session, view, auth}) {
        
        //objProds.prods = ventaProds;
        //console.log(objProds);
        return view.render('incentivo/proceso/ingresoVenta');
    }

    async detalleVentas ({request, response, session, view, auth}) {
        var idPersona = session.get('idPersona', 'fail')
        var idPuntoDeVenta = session.get('idPuntoDeVenta', 'fail');

        var idProceso = request.input("proceso")
        var persona = session.get('personaLogueada')
        //objProds.prods = ventaProds;
        //console.log(objProds);

        var objDet = {
            "idPersona": idPersona,
            "idPuntoDeVenta": idPuntoDeVenta
        };
        //console.log(objDet);
        var resultVentas = await data.execApi(request.hostname(),'/Incentivos/Incentivos/getDetalleVentas',objDet);
        //var valoresMetas = "";
        var valoresVentasCab = resultVentas.body.cabeceras;
        var valoresVentasDet = resultVentas.body.detalles;
        console.log(valoresVentasCab);
        return view.render('incentivo/proceso/detalleVentas', {persona, valoresVentasCab, valoresVentasDet});
    }


    async getProducto ({view,request, response, auth, session}) {
        
        var idProducto = request.input("idProducto")
        
        var obj = {
            "idProducto":idProducto
        };
        //console.log(obj);
        var result = await data.execApi(request.hostname(),'/Incentivos/Incentivos/getProducto',obj);
        var personas = result.body;

        response.json(personas);
    }

    async getCliente ({request, response, session}) {
        
        var identificador = request.input("identificador")
        
        var obj = {
            "identificador":identificador
        };
        //console.log(obj);
        var result = await data.execApi(request.hostname(),'/Incentivos/Incentivos/getCliente',obj);
        var cliente = result.body;
        //console.log(cliente);
        response.json(cliente);
    }

    async deleteVenta ({request, response}) {
        
        var idVenta = request.input("idVenta");
        
        var obj = {
            "idVenta": idVenta
        };
        //console.log(obj);
        var result = await data.execApi(request.hostname(),'/Incentivos/Incentivos/deleteVenta',obj);

        response.json(1);
    }

    async getProductoPos ({view,request, response, auth, session}) {
        
        var idProducto = request.input("idProducto");
        var nombre = request.input("nombre");
        var marca = request.input("marca");
        
        var obj = {
            ean:idProducto,
            idPuntoDeVenta: session.get("idPuntoDeVenta"),
            nombre: nombre,
            marca: marca
        };
        //console.log(obj);
        var result = await data.execApi(request.hostname(),'/Incentivos/Incentivos/getProductoPOS',obj);
        var personas = result.body;

        response.json(personas);
    }

    async getCatalogoProductos ({request, response, session}) {
        
        var idProducto = request.input("idProducto")
        
        var obj = {
            "idProducto":idProducto
        };
        //console.log(obj);
        var result = await data.execApi(request.hostname(),'/Incentivos/Incentivos/getProducto',obj);
        var personas = result.body;

        response.json(personas);
    }
}

module.exports = Proceso