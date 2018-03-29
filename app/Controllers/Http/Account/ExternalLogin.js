const User = use('App/Models/User')

class ExternalLogin {
  async redirect ({ ally }) {
    await ally.driver('google').redirect()
  }

  async callback ({ ally, auth ,response,session}) {
    try {
      const googleUser = await ally.driver('google').getUser()

      // user details to be saved
      const userDetails = {
        email: googleUser.getEmail(),
        token: googleUser.getAccessToken(),
        login_source: 'google'
      }
      
      // search for existing user
      const whereClause = {
        email: googleUser.getEmail()
      }
      
      const user = await User.findOrCreate(whereClause, userDetails)
      await auth.login(user)
      
      return response.redirect('/')
    } catch (error) {
      console.log(error)
      return 'Unable to authenticate. Try again later'
    }
  }
}
module.exports = ExternalLogin