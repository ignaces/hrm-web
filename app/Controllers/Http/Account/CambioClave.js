'use strict'

const api = use('App/Utils/Data')

const got = use('got')
const data = use('App/Utils/Data')
const User = use('App/Models/User')


class CambioClave {
    async cambiar ({view,request, response, session}) {
        return view.render('account/cambioClave');
    }

    async updateUser({view,request, response, session, auth}){
        var user = await User.find(auth.user.id);
        user.password = request.input('r_password');
        console.log(user.username);
        console.log(user.password);
        await user.save();
        
        var updRequiereCambioClave = await data.execApi(request.hostname(),'/Core/Users/updateRequiereCambioClave',{idUser:auth.user.id});

        session.clear();
        await auth.logout()


        response.redirect('../../login');

    }
}

module.exports = CambioClave