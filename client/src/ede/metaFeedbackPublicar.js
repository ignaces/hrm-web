$(document).ready(function () {


    $("#btnGrabar").click(function(){

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
        console.log("");
        $.ajax({    
            type: "POST",
            url: "/Desempeno/Accion/addObservacionAccion",
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify(obj),
            dataType: "json", 
            success: function (msg) {
               
                swal({
                    title:'Exito',
                    text:'La Observación se guardó correctamente',
                    type:'success'
                }).then(function(result){
                    window.location = "/Desempeno/Accion/publicar?idProceso="+idProceso+"&idEtapa="+idEtapa+"&idAccionPersona="+idAccionPersona+"&codigoActor="+codigoActor ;
                });
             
            }
        }); 
    });

    $("#btnGrabarFinalizar").click(function(){

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

        
        $.ajax({    
            type: "POST",
            url: "/Desempeno/Accion/addObservacionAccionFinalizar",
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify(obj), 
            dataType: "json", 
            success: function (msg) {
               
                swal({
                    title:'Exito',
                    text:'La Observación se guardó correctamente',
                    type:'success'
                }).then(function(result){
                    window.location = "/Desempeno/Proceso/etapa?idProceso="+idProceso+"&idEtapa="+idEtapa;
                });
             
            }
        }); 
    }); 
//

    $("#btnEditar").click(function(){

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
        
        $.ajax({    
            type: "POST",
            url: "/Desempeno/Accion/updObservacionAccion",
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify(obj),
            dataType: "json", 
            success: function (msg) {
               
                swal({
                    title:'Exito',
                    text:'La Observación se guardó correctamente',
                    type:'success'
                }).then(function(result){
                    window.location = "/Desempeno/Accion/publicar?idProceso="+idProceso+"&idEtapa="+idEtapa+"&idAccionPersona="+idAccionPersona+"&codigoActor="+codigoActor ;
                });
             
            }
        }); 
    });


    $("#btnEditarFinalizar").click(function(){

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
        
        $.ajax({    
            type: "POST",
            url: "/Desempeno/Accion/updObservacionAccionFinalizar",
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify(obj),
            dataType: "json", 
            success: function (msg) {
               
                swal({
                    title:'Exito',
                    text:'La Observación se guardó correctamente',
                    type:'success'
                }).then(function(result){
                    window.location = "/Desempeno/Proceso/etapa?idProceso="+idProceso+"&idEtapa="+idEtapa;
                });
             
            }
        }); 
    });


});