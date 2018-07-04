$(document).ready(function () {

    $("#btnGrabar").click(function(){

        var obj = obtenerDatos(false);
        var url = "/Desempeno/Accion/addObservacionAccion";
        var redirect = "/Desempeno/Accion/publicar?idProceso="+obj.idProceso+"&idEtapa="+obj.idEtapa+"&idAccionPersona="+obj.idAccionPersona+"&codigoActor="+obj.codigoActor
        var mensajeExito = 'La Observación se guardó correctamente';
        sendRequest(obj,url,redirect,mensajeExito);
    });

    $("#btnGrabarFinalizar").click(function(){

        var obj = obtenerDatos(true);
        var url = "/Desempeno/Accion/addObservacionAccionFinalizar";
        var redirect = "/Desempeno/Proceso/etapa?idProceso="+obj.idProceso+"&idEtapa="+obj.idEtapa;
        var mensajeExito = 'La Observación se guardó correctamente';
        sendRequest(obj,url,redirect,mensajeExito);
    }); 

    $("#btnEditar").click(function(){

        var obj = obtenerDatos(false);
        var url = "/Desempeno/Accion/updObservacionAccion";
        var redirect = "/Desempeno/Accion/publicar?idProceso="+obj.idProceso+"&idEtapa="+obj.idEtapa+"&idAccionPersona="+obj.idAccionPersona+"&codigoActor="+obj.codigoActor;
        var mensajeExito = 'La Observación se guardó correctamente';
        sendRequest(obj,url,redirect,mensajeExito);
    });

    $("#btnEditarFinalizar").click(function(){

        var obj = obtenerDatos(true);
        var url = "/Desempeno/Accion/updObservacionAccionFinalizar";
        var redirect = "/Desempeno/Proceso/etapa?idProceso="+obj.idProceso+"&idEtapa="+obj.idEtapa;
        var mensajeExito = 'La Observación se guardó correctamente';
        sendRequest(obj,url,redirect,mensajeExito);
    });

    function obtenerDatos(validarForm){

        if(validarForm){
            var observacion = $("#observacion").val();
            if(observacion.length < 100){
                swal({
                    title:'Advertencia',
                    text:'Debe ingresar un comentario de al menos 100 caracteres.',
                    type:'warning'
                }).then(function(result){
                    $("#observacion").focus();
                });
                return false;
            }
        }

        var idProceso = $("#idProceso").val();
        var idEtapa = $("#idEtapa").val();
        var idAccionPersona = $("#idAccionPersona").val();
        var codigoActor = $("#codigoActor").val();
        var idObservacionAccion = $("#idObservacionAccion").val();
        var idEtapaTareaAccionProcesoPersona = $("#idEtapaTareaAccionProcesoPersona").val();
        var idEtapaTareaActor = $("#idEtapaTareaActor").val();
        var idAccionEstado = $("#idAccionEstado").val();
        var observacion = $("#observacion").val();
        var csrf = $('input[name=_csrf]').val();

        var obj = {
            idProceso:idProceso,
            idEtapa:idEtapa,
            idAccionPersona:idAccionPersona,
            codigoActor:codigoActor,
            idObservacionAccion:idObservacionAccion,
            idEtapaTareaAccionProcesoPersona:idEtapaTareaAccionProcesoPersona,
            idEtapaTareaActor:idEtapaTareaActor,
            idAccionEstado:idAccionEstado,
            observacion:observacion,
            _csrf:csrf
        };
        return obj;
    }

    function sendRequest(obj, url, redirect, mensajeExito){
        $.ajax({    
            type: "POST",
            url: url,
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify(obj),
            dataType: "json", 
            success: function (msg) {
                swal({
                    title:'Exito',
                    text:'Acción realizada correctamente',
                    type:'success'
                }).then(function(result){
                    window.location = redirect;
                });
            }
        }); 
    }
});