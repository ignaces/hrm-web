'use strict'

class AuthValidator {
  async handle ({ auth,view ,request,response}, next) {
    
    try {
      
      const isLoggedIn = await auth.check()
    
      if (!isLoggedIn && request.url()!='/login' && request.url()!='/register') {// && request.url()!='/register'
      
         response.redirect('/login');
 
      }
    } catch (error) {
      response.redirect('/login');
    }
    //var uu = await request.session.get('roles');

    await next()
  }
}

module.exports = AuthValidator
