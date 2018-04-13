'use strict'
const got = use('got')
const data = use('App/Utils/Data')
class UserController {
    
      async login ({ view,request, auth ,response, session}) {
        const { username, password } = request.all()
        await auth.attempt(username, password)

        var obj = {
          "idUser":auth.user.id
        };
        
        console.log(auth.user.is_admin);
        if(auth.user.is_admin!=1){
          var rPersona = await data.execApi(request.hostname(),'/Persona/Persona/getPersonaByIdUser',{idUser:auth.user.id});
          var persona = rPersona.body.data;
          
          //var result = await data.execApi(request.hostname(),'/Persona/Persona/getIdPersona',obj);
          persona.cargo="Evaluador"

        
          persona.imageUser="/assets/images/icons/businessman.svg"
          if (persona.codigoGenero=="F"){
            persona.imageUser="/assets/images/icons/businesswoman.svg"
          }
          console.log(persona)
          //var traerLog = session.put('personaLogueada',persona); 
          
          session.put('personaLogueada',persona);
          session.put('idPersona', persona.id)
          

        }
        


        return response.redirect('/')
      }
      
      async logout ({ view,request, auth }) {
        
        await auth.logout()
    //
        return view.render('account/login')
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
        const Env = use('Env')
        var server = Env.get('API_SERVER', 'development')

        const result = await got(`${server}/Core/Users/find`,
        {
          
          json:true,
          query:{nombre:"a"}
          
        })
        
        const usuarios = result.body
        
        return view.render('account/users',{usuarios:usuarios})
      }

}
module.exports = UserController