'use strict'

const api = use('App/Utils/Data')

const got = use('got')
const data = use('App/Utils/Data')
const User = use('App/Models/User')


class CambioClave {
    async cambiar ({view,request, response, session, auth}) {
        //await auth.logout();
        return view.render('account/cambioClave');
    }

    async reset ({view,request, response, session}) {
       
        return view.render('account/reset');
    }

    async updateUser({view,request, response, session,auth}){
        var user = await User.find(auth.user.id);
        user.password = request.input('r_password');
        //console.log(user.username);
        //console.log(user.password);
        await user.save();
        
        var updRequiereCambioClave = await data.execApi(request.hostname(),'/Core/Users/updateRequiereCambioClave',{idUser:auth.user.id, estado:0});

        session.clear();
        await auth.logout()


        response.redirect('../../login');


    }

    async resetPassword({view,request, response, session,auth}){
        var userName = request.input('user');
        var obj     = { user: userName };
        var resultado   = await data.execApiPost(request.hostname(),'/Usuario/Usuario/getUsuarioByUserName',obj);
        var idUser = resultado.body.data[0].id
        var user = await User.find(idUser);
        user.password = request.input('r_password');
        var updRequiereCambioClave = await data.execApi(request.hostname(),'/Core/Users/updateRequiereCambioClave',{idUser:idUser,estado:1});

        session.clear();
        await user.save();
        
        response.redirect('../../login');

    }
}

module.exports = CambioClave