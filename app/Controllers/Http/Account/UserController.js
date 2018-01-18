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
        var result = await data.execApi(request.hostname(),'/Persona/Persona/getIdPersona',obj);
        
        session.put('idPersona', result.body.data[0].idPersona)


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