$(document).ready(function () {


    $("#btnConfirmar").click(function(){



        var idProceso = $("#idProceso").val();
        var idEtapa = $("#idEtapa").val();
        var idAccionPersona = $("#idAccionPersona").val();
        var codigoActor = $("#codigoActor").val();
        var idObservacionAccion = $("#idObservacionAccion").val();
        var idEtapaTareaAccionProcesoPersona = $("#idEtapaTareaAccionProcesoPersona").val();
        var idEtapaTareaActor = $("#idEtapaTareaActor").val();
        var idAccionEstado = $("#idAccionEstado").val();
        var valor = $('input[name=rdoConfirmar]:checked').val();
        var codigoCab = "EMAILRECHAZOFEEDCAB";
        var codigoCuerpo = "EMAILRECHAZOFEED";
        
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
            valor:valor,
            codigoCab: codigoCab,
            codigoCuerpo: codigoCuerpo,
            _csrf:csrf
        };
        
        if($('input[name=rdoConfirmar]:checked').length == 0){
            swal({
                title:'Advertencia',
                text:'No ha contestado todas las preguntas.',
                type:'warning'
            }).then(function(result){
                
            });
            return false;
        }
        $.ajax({    
            type: "POST",
            url: "/Desempeno/Accion/addConfirmacionAccion",
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