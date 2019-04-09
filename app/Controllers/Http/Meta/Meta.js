'use strict'

const data = use('App/Utils/Data')

class Meta {

    async intro ({ view,request, response, auth }) {

        var resPER = await data.execApi(request.hostname(),'/Incentivos/Incentivos/getMetasAttr_CG',{param:'PER'});
        var resTAB = await data.execApi(request.hostname(),'/Incentivos/Incentivos/getMetasAttr_CG',{param:'TAB'});
        var resTIP = await data.execApi(request.hostname(),'/Incentivos/Incentivos/getMetasAttr_CG',{param:'TIP'});

        return view.render('metas/metas',{
            resPER:resPER.body,
            resTAB:resTAB.body,
            resTIP:resTIP.body
        });
    }

    async carga ({ view,request, response, auth }) {
        var accion = request.input('accion');

        var obj = {
            identificador:accion.identificador,
            per:accion.per,
            tip:accion.tip,
            tab:accion.tab,
            cargaVolumen:JSON.stringify(accion.cargaVolumen),
            cargaMix:JSON.stringify(accion.cargaMix)
        }

        var result = await data.execApiPost(request.hostname(),'/Incentivos/Incentivos/cargaMetas',{accion:obj});

        return {};
    }
}

module.exports = Meta
