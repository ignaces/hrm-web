'use strict'
const got = use('got')
const data = use('App/Utils/Data')
const User = use('App/Models/User')
class ActiveDirectoryLoginController {
    
      async callback ({ view,request, auth ,response, session}) {
        
        session.clear();
        await auth.logout();

        const token = request.input("t")

        var userData = await data.execApiExterna(`https://login.banmedica.cl/api/validate/${token}`);
        var identificador = userData.body.run;//'17355674-8'//userData.body.run;
        var email = userData.body.email; //'dcarrasco@banmedica.cl'  //userData.body.email;

        // user details to be saved
        const userDetails = {
            email: email,
            token: token,
            login_source: 'ad'
        }
        
        // search for existing user
        const whereClause = {
            email: email
        }
       
      const user = await User.findOrCreate(whereClause, userDetails)
      //console.log(user)
      await auth.login(user)
      
        
    
        
      var rPersona = await data.execApi(request.hostname(),'/Persona/Persona/getPersonaByIdUser',{idUser:auth.user.id});
          var persona = rPersona.body.data;
          
          //var result = await data.execApi(request.hostname(),'/Persona/Persona/getIdPersona',obj);
          //console.log(persona)

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

            
            session.put('requiere_cambio_clave', 0);

            

          }catch(err){
            //console.log(err)
          }
          
        return response.redirect('/')
      }

      
}
module.exports = ActiveDirectoryLoginController