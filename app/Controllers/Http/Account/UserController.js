'use strict'
const got = use('got')
class UserController {
    
      async login ({ view,request, auth ,response}) {
        const { username, password } = request.all()
        await auth.attempt(username, password)
        
        const Env = use('Env')

        var server = Env.get('API_SERVER', 'development')
        
        var obIdPersona = await got(`${server}/Persona/Persona/getIdPersona`,
        {
            json:true,
            query:{
                "hostname":"9d212163-f0e6-11e7-bf12-bc764e100f2b",
                "idUser":auth.user.id
            }
        })

        session.put('idPersona', obIdPersona.body.data[0].idPersona)

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