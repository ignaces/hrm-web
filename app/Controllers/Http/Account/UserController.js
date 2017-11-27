'use strict'
const got = use('got')
class UserController {
    
      async login ({ view,request, auth ,response}) {
        const { username, password } = request.all()
        await auth.attempt(username, password)
    
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
        const result = await got.get(`http://${server}/Core/Users/find?nombre=`,{json:true})
        
        const usuarios = result.body
        
        return view.render('account/users',{usuarios:usuarios})
      }

}
module.exports = UserController