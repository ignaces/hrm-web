'use strict'

class RoleValidator {
  async handle ({ auth,view }, next) {
    
    const isLoggedIn = await auth.check()
    
    if (!isLoggedIn && request.url()!='/login' && request.url()!='/register') {// && request.url()!='/register'
      
       response.redirect('/login');
 
    }
    // call next to advance the request
    await next()
  }
}

module.exports = RoleValidator
