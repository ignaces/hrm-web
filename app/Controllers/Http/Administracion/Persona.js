'use strict'
const data = use('App/Utils/Data')

    class Persona {
        async registrarPersona  ({ view,request, response, session }) {
        
            //console.log(auth.user.username)
            //console.log(auth.user.id)//
            var objeto = {
                tabla:"Genero"
            };
            
            var resultado = await data.execApi(request.hostname(),'/Utils/Listar/getCombo',objeto);
            var comboGenero = resultado.body;
            
            //console.log(comboGenero.data);
            return view.render('administracion/persona/registrarPersona', {comboGenero:comboGenero.data} );
        }



        async doRegisterPersona  ({ view,request, response, session }) {
        
            //console.log(auth.user.username)
            //console.log(request.all());
            var identificador = request.input("identificador");
            var nombres = request.input("nombres");
            var ap_pat = request.input("ap_pat");
            var ap_mat = request.input("ap_mat");
            var genero = request.input("genero");
            var email = request.input("email");

            var creaUsuario = request.input("usuario");
            
            var objeto = {
                "identificador": identificador,
                "nombres": nombres,
                "apellidoPaterno": ap_pat,
                "apellidoMaterno": ap_mat,
                "genero": genero,
                "email": email
            };
            
            var resultado = await data.execApi(request.hostname(),'/Persona/Persona/addPersona',objeto);
            var respuesta = resultado.body;
            
            //console.log(respuesta.estado);
            //console.log(respuesta.data);   
            //return view.render('administracion/persona/registrarPersona', {estado:respuesta.estado, datos:respuesta.data} );
            
            if(creaUsuario == "true")
            {
                var objetoUsuario = {
                            identificador:identificador,
                            email:email,
                            password:identificador
                        };
                //console.log(objetoUsuario);

                await data.execApiLocal(request.hostname(),'/Account/Register/registerPersona',objetoUsuario);
            }

            response.json(respuesta.estado, respuesta.data);
        }

        async userExiste({ request, response, session }) {
        
            var emailPre   = request.input("email");
            var obj     = { email: emailPre };
            //console.log(obj);

            var resultado   = await data.execApiPost(request.hostname(),'/Usuario/Usuario/getUsuarioByEmail',obj);
            //console.log(resultado.body);
            response.json(resultado.body);
        }
    }
      
    module.exports = Persona