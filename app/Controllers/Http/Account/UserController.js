'use strict'

class UserController {
    
      async login ({ view,request, auth ,response}) {
        const { username, password } = request.all()
        await auth.attempt(username, password)
    
        return response.redirect('/')
      }
      async logout ({ view,request, auth }) {
        
        await auth.logout()
    
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

}
module.exports = UserController