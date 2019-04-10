'use strict'

const data = use('App/Utils/Data')

class Meta {

    async intro ({ view,request, response, auth }) {

        var resPER = await data.execApi(request.hostname(),'/Incentivos/Incentivos/getMetasAttr_CG',{param:'PER'});
        var resTAB = await data.execApi(request.hostname(),'/Incentivos/Incentivos/getMetasAttr_CG',{param:'TAB'});
        var resTIP = await data.execApi(request.hostname(),'/Incentivos/Incentivos/getMetasAttr_CG',{param:'TIP'});

        var metaDetalle = await data.execApi(request.hostname(),'/Incentivos/Incentivos/getMetasDetalles',{idPeriodo:''});

        return view.render('metas/metas',{
            resPER:resPER.body,
            resTAB:resTAB.body,
            resTIP:resTIP.body,
            metaDetalle:metaDetalle.body.data
        });
    }

    async getPuntosDeVenta({ view,request, response, auth }) {

        var result = await data.execApi(request.hostname(),'/Incentivos/Incentivos/getPuntosDeVenta',{});

        var returning = result.body;
        response.json(returning);

    }

    async dataMetaDetalle({ view,request, response, auth }) {

        var idMetaDetalle = request.input('idMetaDetalle');

        var metaDetalle = await data.execApi(request.hostname(),'/Incentivos/Incentivos/getdataMetaDetalle',{idMetaDetalle:idMetaDetalle});

        return {
            metaDetalle:metaDetalle.body.data[0]
        };
    }

    async consulaMetasDetalles ({ view,request, response, auth }) {
        var idPeriodo = request.input('idPeriodo');

        var metaDetalle = await data.execApi(request.hostname(),'/Incentivos/Incentivos/getMetasDetalles',{idPeriodo:idPeriodo});

        return {
            metaDetalle:metaDetalle.body.data
        };
    }

    async cargaMeta ({ view,request, response, auth }) {
        var meta = request.input('meta');

        var result = await data.execApiPost(request.hostname(),'/Incentivos/Incentivos/cargaMeta',{meta:meta});

        return {};
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
