const User = use('App/Model/User')
const Hash = use('Hash')

class Register{
    index({view,request}){
        return view.render('account/register');
      }
    async doRegister(request, response) {
        const user = new User()
        user.username = request.input('name')
        user.email = request.input('email')
        user.password = request.input('password')
        
        await user.save()

        var registerMessage = {
            success: 'Registration Successful! Now go ahead and login'
        }

        response.sendView('register', { registerMessage : registerMessage })
    }
}
module.exports = UserController