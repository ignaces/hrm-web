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
        
        
        await user.save()

        var registerMessage = {
            success: 'Registration Successful! Now go ahead and login'
        }

        return view.render('account/login',  {persona:persona,instrumento:instrumento});
    }
    async doRegisterPersonas({view,request, response}) {
        
        

        const personas = request.input("personas");

        for(var item in personas){
            const user = new User()
            const persona=personas[item];
            
            user.username = persona.identificador;
            user.email = persona.email;
            user.password = persona.password;
            
            
            await user.save()
        }
        

  /*      var registerMessage = {
            success: 'Registration Successful! Now go ahead and login'
        }
*/
        response.json("");
    }
}
module.exports = Register