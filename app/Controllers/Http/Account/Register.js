const User = use('App/Models/User')
const Hash = use('Hash')
const Route = use('Route')

const data = use('App/Utils/Data')

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

    async updateUser(){
        /*var id = "1137";
        var user = await user.find(id);

        //console.log(user.username);
        user.password = '8609816-4';
        user.username = '8609816-4';

        await user.save();
*/
        /*
        const user = await User.find("1137");
        //console.log("uers:"+user.username);
        user.password = '8609816-4';
        user.username = '8609816-4';
        await user.save();
        */
    }
    
    async doRegisterPersonas({view,request, response}) {
       
        
        const personas = request.input("personas");
        for(var item in personas){
            const user = new User()
            const persona=personas[item];
            
            user.username = persona.identificador;
            user.email = persona.email;
            user.password = persona.password;
            
            try{
                var respuesta = await user.save();
            }
            catch(error)
            {

            }
        }
        

  /*      var registerMessage = {
            success: 'Registration Successful! Now go ahead and login'
        }
*/      
    }
    async setSuplantador({request, response}) {
       
        ////console.log("TEST");
        //return false;

        const identificador = request.input("identificador");

       
            
            try{
             
                var registraPersona = await data.execApi(request.hostname(),'/Usuario/Usuario/setSuplantador',{identificador:identificador});
                //console.log(registraPersona);
            }
            catch(error)
            {
                //console.log(error);
            }
            return "OK";
              
    }
    async doRegisterUsuariosPersonas({request, response}) {
       
        ////console.log("TEST");
        //return false;

        const personas = request.input("personas");

        for(var item in personas){
            
            const user = new User()
            const objPersona = {};
            const persona=personas[item];
            
            user.username = persona.identificador;
            user.email = persona.email;
            user.password = persona.password;

            objPersona.identificador = persona.identificador;
            objPersona.nombres = persona.nombres;
            objPersona.apellidoPaterno = persona.apellidoPaterno;
            objPersona.apellidoMaterno = persona.apellidoMaterno;
            objPersona.email = persona.email;
            objPersona.genero = persona.genero;
            objPersona.usuario = persona.usuario;
            objPersona.nacionalidad = persona.nacionalidad;
            
            try{
                var respuesta = await user.save();
                
                ////console.log(user.$attributes.id);
                objPersona.idUsuario = user.$attributes.id;
                
                //console.log(objPersona);
                var registraPersona = await data.execApi(request.hostname(),'/Persona/Persona/addPersona',objPersona);
                //console.log(registraPersona);
            }
            catch(error)
            {
                //console.log(error);
            }
        }
        

  /*      var registerMessage = {
            success: 'Registration Successful! Now go ahead and login'
        }
*/      
    }
    
    async registerPersona({request, response}) {
        ////console.log("...", request.all());
        
        const user = new User()
            
        user.username = request.input('identificador')
        user.email = request.input('email')
        user.password = request.input('password')
        
        var resultado = 1;
        try{
            await user.save();

        }
        catch(error)
        {
            resultado = 0;
        }
        
        
  /*      var registerMessage = {
            success: 'Registration Successful! Now go ahead and login'
        }
*/      

        var objeto = { respuesta: resultado,usuario:user }
        response.json(objeto);
    }
}
module.exports = Register