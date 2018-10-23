'use strict'
const got = use('got')
const data = use('App/Utils/Data')
const User = use('App/Models/User')
class UserController {
    
      async cambioClave ({ view,request, auth ,response, session}) {
        return response.redirect('/')
      }

      async updateUser ({ view,request, auth ,response, session}) {
        
      }

      async login ({ view,request, auth ,response, session}) {

        session.clear();
        await auth.logout();
        
        const { username, password } = request.all()
        await auth.attempt(username, password)

        var obj = {
          "idUser":auth.user.id
        };
        
        if(auth.user.is_admin!=1){
          
          try{
            var rPersona = await data.execApi(request.hostname(),'/Persona/Persona/getPersonaByIdUser',{idUser:auth.user.id});
            var persona = rPersona.body.data;
          
          }catch(e)
          {
            console.log(e);
          }
          //var result = await data.execApi(request.hostname(),'/Persona/Persona/getIdPersona',obj);

          
          if(!persona){
            persona={};
            persona.imageUser="/assets/images/icons/businessman.svg"
          }else{
            persona.cargo=""
            
            if(persona.imageUser=="" || persona.imageUser==null){
              persona.imageUser="/assets/images/icons/businessman.svg"
              if (persona.codigoGenero=="F"){
                persona.imageUser="/assets/images/icons/businesswoman.svg"
              }
            }
            
            
            //var traerLog = session.put('personaLogueada',persona); 
            
            session.put('personaLogueada',persona);
            session.put('idPersona', persona.id)
          }
          
          try{
            var rUsuario = await data.execApi(request.hostname(),'/Core/Users/getMenuUser',{idUser:auth.user.id});
            var usuario = rUsuario.body.data;
            session.put('usuario_roles_menu',usuario);

            var cambioClave = await data.execApi(request.hostname(),'/Core/Users/getRequiereCambioClave',{idUser:auth.user.id});

            var u = cambioClave.body.data;

            //console.log('req cambio ' + u[0].requiereCambioClave);
            session.put('requiere_cambio_clave', u[0].requiereCambioClave);

            if(u[0].requiereCambioClave == 1)
            {
              return response.redirect('Account/CambioClave/cambiar')
            }

          }catch(err){
            //console.log(err)
          }
          

        }else{
          var persona = {cargo:"admin",nombres:"",apellidoPaterno:"",apellidoMaterno:"",imageUser:"/assets/images/icons/businessman.svg"}
          session.put('personaLogueada',persona);
          session.put('idPersona', "");
        }
        
        return response.redirect('/')
      }

      
    async forgotPassword({request,response}){

      var correo = request.input("correo")
      var obj = {
          "correo":correo          
          };
          

      return {mensaje:"OK"}
  } 
      
      async logout ({ view,request, auth ,response,session}) {
        session.clear();
        await auth.logout()
    //
        return response.redirect('/')
      }

      loginView({view,request}){
        return view.render('account/login');
      }
      
      profile ({ auth, params }) {
          
        if (auth.user.id !== Number(params.id)) {
          return 'You cannot   else\'s profile'
        }
        return auth.user
      }

      async list({view,request,response}){
        
        return view.render('account/users')
      }

      async find({view,request,response}){
        
        const result = await data.execApi(request.hostname(),'/Core/Users/find', {
          
          nombre:"a"
          
        });
        
        const usuarios = result.body
        //console.log(usuarios)
        return usuarios;
      }

      async cambioIdioma  ({ view,request, response, auth, session ,antl}) {
        //console.log("qq")
    }
}
module.exports = UserController