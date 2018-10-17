import _ from 'lodash';
//holi
$(document).ready(function(){
    
    tinymce.init({
        selector: "textarea",  // change this value according to your HTML
        toolbar: false,
        oninit : "setPlainText",
        plugins : "paste",
        paste_as_text: true,
        menubar: false,
        paste_convert_word_fake_lists: false,
        invalid_elements: "span p div aacute eacute iacute oacute uacute br"
    });
    
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

        //console.log(idOpinante, idPregunta, idAlternativa, justificacion, id);
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
        
         $("#hrm_blockAction").show();

        $.ajax({
            type: "GET",
            url: "/Instrumento/Instrumento/putRespuestaEde",
            contentType: "application/json; charset=utf-8",
            data: obj,
            dataType: "json",   
            success: function (msg) {
                //console.log("OK?23");

                $.toast({
                    text: 'Respuesta guardada correctamente.',
                    position: 'top-right',
                    loaderBg: '#5ba035',
                    icon: 'success',
                    hideAfter: 3000,
                    stack: 1
                });

                $("#hrm_blockAction").hide();
                
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
                
                $("#hrm_blockAction").hide();

                $("#"+idElementoHTML).prop('checked', false);
            },
            timeout: 10000
        });
    };

    
    
    $( "#instrumento_btn_guardar" ).click(function() {
        tinymce.triggerSave();
        
        var obj = {
            idOpinante: $("#idOpinante").val(),
            observacion: $("#observacion").val(),
            finaliza: 0
        };

        $("#hrm_loadingPanel").show();

        $.ajax({
            type: "GET",
            url: "/Instrumento/Instrumento/saveEvaluacionEde",
            contentType: "application/json; charset=utf-8",
            data: obj,
            dataType: "json",   
            success: function (msg) {
                
                swal(
                    'Guardado',
                    'Datos guardados correctamente.',
                    'success'
                );

                $("#hrm_loadingPanel").hide();
            },
            error: function(XMLHttpRequest, textStatus, errorThrown) { 
                
                swal(
                    'Error',
                    'Hubo un problema al guardar sus datos, inténtelo nuevamente. Si el problema persiste, por favor, comuníquese con la mesa de ayuda.',
                    'error'
                  );

                  $("#hrm_loadingPanel").hide();
            },
            timeout: 10000
        });
        
    });

    $( "#instrumento_btn_finalizar" ).click(function() {
        tinymce.triggerSave();

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

        var minChars = 100;

        if($("#observacion").val().length < minChars)
        {
            swal(
                'No has terminado',
                'Debes ingresar un comentario con al menos '+minChars+' caracteres para poder finalizar.',
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
                    idOpinante: $("#idOpinante").val(),
                    observacion: $("#observacion").val(),
                    finaliza: 1
                };

                $("#hrm_loadingPanel").show();

                $.ajax({
                    type: "GET",
                    url: "/Instrumento/Instrumento/saveEvaluacionEde",
                    contentType: "application/json; charset=utf-8",
                    data: obj,
                    dataType: "json",   
                    success: function (msg) {
                        
                        swal(
                            'Guardado',
                            'Evaluación Finalizada Correctamente.',
                            'success'
                        ).then(function(result){
                            $('#frmVolver').submit();
                        });
                        $("#hrm_loadingPanel").hide();
                    },
                    error: function(XMLHttpRequest, textStatus, errorThrown) { 
                        
                        swal(
                            'Error',
                            'Hubo un problema al guardar sus datos, inténtelo nuevamente. Si el problema persiste, por favor, comuníquese con la mesa de ayuda.',
                            'error'
                        );

                        $("#hrm_loadingPanel").hide();
                    },
                    timeout: 10000
                });
            }
          });
    });

    /*$('.table-responsive').DataTable();*/

}); 