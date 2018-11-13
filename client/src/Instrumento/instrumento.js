import _ from 'lodash';
//holi
$(document).ready(function(){
    
    $( ".r_alternativa" ).click(function() {
        
        var id = $( this ).attr('id');
        
        var arr = id.split("_");
        var idPregunta = arr[1];
        var idAlternativa = arr[2];
        var requiereJustificacion = arr[3]*1;
        var idOpinante =arr[4]; 
        var justificacion = "";
        var txtJustificacion = "#txt_"+idPregunta+"_"+idOpinante;

        if(requiereJustificacion==1){
            $(txtJustificacion).show();
            $(txtJustificacion).attr("idAlternativa", idAlternativa);
        }else{
            $(txtJustificacion).val("");
            $(txtJustificacion).hide();
            $(txtJustificacion).attr("idAlternativa", "");
        }

        if($(txtJustificacion).val()){
            justificacion=$(txtJustificacion).val()
        }

        putRespuesta(idOpinante, idPregunta, idAlternativa, justificacion, id);
    });

    $( ".txt_justificacion" ).focusout(function() {  
        var id = $( this ).attr('id');
        var idAlternativa = $( this ).attr('idAlternativa');
        
        var arr = id.split("_");
        var idPregunta = arr[1];
        var idOpinante =arr[2]; 
        var justificacion = "";
        
        if($("#txt_"+idPregunta+"_"+idOpinante).val()){
            justificacion=$("#txt_"+idPregunta+"_"+idOpinante).val()
        }
       
        putRespuesta(idOpinante, idPregunta, idAlternativa, justificacion, id);
    });

    var putRespuesta = function(idOpinante, idPregunta, idAlternativa, justificacion, idElementoHTML){
        var obj = { 
            idOpinante:idOpinante,
            idPregunta:idPregunta,
            idAlternativa:idAlternativa,
            justificacion:justificacion
         };
        
        $.ajax({
            type: "GET",
            url: "/Instrumento/Instrumento/putRespuesta",
            contentType: "application/json; charset=utf-8",
            data: obj,
            dataType: "json",   
            success: function (msg) {
                

                $.toast({
                    text: 'Respuesta guardada correctamente.',
                    position: 'top-right',
                    loaderBg: '#5ba035',
                    icon: 'success',
                    hideAfter: 3000,
                    stack: 1
                });

                
            },
            error: function(XMLHttpRequest, textStatus, errorThrown) { 
                $.toast({
                    text: 'No se pudo guardar su respuesta. Intente nuevamente.',
                    position: 'top-right',
                    loaderBg: '#5ba035',
                    icon: 'error',
                    hideAfter: 3000,
                    stack: 1
                });

                $("#"+idElementoHTML).prop('checked', false);
            },
            timeout: 10000
        });
    };

    
    
    $( "#instrumento_btn_guardar" ).click(function() {
        var obj = {
            idOPinante: $("#idOpinante").val(),
        };
        $.ajax({
            type: "GET",
            url: "/Instrumento/Instrumento/putObservacionEde",
            contentType: "application/json; charset=utf-8",
            data: obj,
            dataType: "json",   
            success: function (msg) {
                
                swal(
                    'Guardado',
                    'Datos guardados correctamente.',
                    'success'
                );

                
            },
            error: function(XMLHttpRequest, textStatus, errorThrown) { 
                
                swal(
                    'Error',
                    'Hubo un problema al guardar sus datos, inténtelo nuevamente. Si el problema persiste, por favor, comuníquese con la mesa de ayuda.',
                    'error'
                  );
            },
            timeout: 10000
        });
        
    });

    $( "#instrumento_btn_finalizar" ).click(function() {
        
        var checked;
        var vacios = true;

        $(".pr_pregunta").each(function () {
            checked = false;
            var idPregunta = $(this).prop('id');
           
            $("input[name='rd_"+idPregunta+"']").each(function () {
                
                if ($(this).prop('checked')) {
                   
                    checked = true
                }
               
            });
            
            if (!checked) {
                return false;
            }
        });

        if (!checked) {
            swal(
                'No has terminado',
                'Debes responder todas las preguntas antes de poder finalizar.',
                'warning'
            );
            return false;
        }
        
        $(".r_alternativa").each(function() {
        
            var id = $( this ).prop('id');
            
            var arr = id.split("_");
            var idPregunta = arr[1];
            var idAlternativa = arr[2];
            var requiereJustificacion = parseInt(arr[3]);
            var idOpinante =arr[4]; 
            var justificacion = "";
            var txtJustificacion = "#txt_"+idPregunta+"_"+idOpinante;
            
            if($(txtJustificacion).attr('idAlternativa') != "" && $(txtJustificacion).val() == ""){
                vacios = false;
            }    
            
        });
        
        if (vacios==false) {
            swal(
                'No has terminado',
                'Debes ingresar un comentario a todas las preguntas que requieran justificacion para poder finalizar.',
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
                    url: "/Instrumento/Instrumento/cerrarInstrumento",
                    contentType: "application/json; charset=utf-8",
                    data: obj,
                    dataType: "json", 
                    success: function (msg) {
                        swal({
                            title:'Finalizado',
                            text:'Evaluación finalizado correctamente.',
                            type:'success'
                        }).then(function(result){
                            $('#frmVolver').submit();
                        });


                    }
                });
            }
          });
    });

    /*$('.table-responsive').DataTable();*/

}); 