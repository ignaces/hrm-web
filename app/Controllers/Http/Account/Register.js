const User = use('App/Models/User')
const Hash = use('Hash')

class Register{
    index({view,request}){
        return view.render('account/register');
      }
    async doRegister({view,request, response}) {
        const user = new User()
        user.username = request.input('name')
        user.email = request.input('email')
        user.password = request.input('password')
        console.log(user)
        
        await user.save()

        var registerMessage = {
            success: 'Registration Successful! Now go ahead and login'
        }

        return view.render('account/login',  {persona:persona,instrumento:instrumento});
    }
}
module.exports = Register