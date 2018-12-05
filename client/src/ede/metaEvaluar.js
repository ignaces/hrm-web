
$(document).ready(function () {
    $(".inputCumplimiento").blur(function(input){
        
        var obj ={
            id:input.target.id,
            value:input.target.value
        }
        
        $.ajax({    
            type: "GET",
            url: "/Desempeno/Metas/saveCumplimiento",
            contentType: "application/json; charset=utf-8",
            data: obj,
            dataType: "json", 
            success: function (msg) {
                
            }
        });         
    });
    $("#btnGrabar").click(function(){

        var obj = obtenerDatos(false);
        var url = "/Desempeno/Accion/addObservacionAccion";
        var redirect = "/Desempeno/Accion/publicar?idProceso="+obj.idProceso+"&idEtapa="+obj.idEtapa+"&idAccionPersona="+obj.idAccionPersona+"&codigoActor="+obj.codigoActor
        var mensajeExito = 'La Observación se guardó correctamente';
        sendRequest(obj,url,redirect,mensajeExito);
    });

    $("#btnGrabarFinalizar").click(function(){

        var vacios=false;
        $(".inputCumplimiento").each(function() {
            var txt = $(this).prop('value');
            
            if(txt== ""){
                vacios = true;
            }    
            
        });
        
        if (vacios) {
            swal(
                'No has terminado',
                'Debes ingresar cumplimiento para todas las metas.',
                'warning'
            );
            return false;
        }

        swal({
            title: '¿Esta seguro de finalizar?',
            text: "No podra volver a editar la evaluación",
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, finalizar',
            cancelButtonText: 'Cancelar'
          }).then(function(result)  {
            if (result) {
                
                var obj = { 
                  idOpinante:$("#idOpinante").val()
                };

                $.ajax({
                    type: "GET",
                    url: "/Desempeno/Metas/finalizar",
                    contentType: "application/json; charset=utf-8",
                    data: obj,
                    dataType: "json", 
                    success: function (msg) {
                        swal({
                            title:'Finalizado',
                            text:'Evaluación finalizada correctamente.',
                            type:'success'
                        }).then(function(result){
                            $('#frmVolver').submit();
                        });


                    }
                });
            }
          });
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
        var codigoCab = "EMAILPUBMETCAB";
        var codigoCuerpo = "EMAILPUBMET";
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
            codigoCab: codigoCab,
            codigoCuerpo: codigoCuerpo,
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
                    type:'success',
                    confirmButtonText:"Aceptar"
                }).then(function(result){
                    window.location = redirect;
                });
            }
        }); 
    }
    
});
