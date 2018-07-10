'use strict'
const got = use('got')
const data = use('App/Utils/Data')
const User = use('App/Models/User')
class UserController {
    
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
          var rPersona = await data.execApi(request.hostname(),'/Persona/Persona/getPersonaByIdUser',{idUser:auth.user.id});
          var persona = rPersona.body.data;
          
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

            

          }catch(err){
            console.log(err)
          }
          

        }else{
          var persona = {cargo:"admin",nombres:"",apellidoPaterno:"",apellidoMaterno:"",imageUser:"/assets/images/icons/businessman.svg"}
          session.put('personaLogueada',persona);
          session.put('idPersona', "");
        }
        

        const user = await User.find("1986");
        console.log("uers:"+user.username);
        user.password = "12345678";
        

        await user.save();


        return response.redirect('/')
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