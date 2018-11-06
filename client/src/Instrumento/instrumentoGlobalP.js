import _ from 'lodash';
$(document).ready(function(){

    $( ".r_alternativa" ).change(function() {
        var id = $(this).attr('id');
        var idNivel= $(this).val();
        
        var arr = id.split("_");
        var idOpinante =arr[0]; 
        var idCompetencia = arr[1];
        var idEncuestaPersona = arr[2];
        
        var justificacion = "";
        
        /*var txtJustificacion = "#txt_"+idCompetencia+"_"+idOpinante;
        if($(txtJustificacion).val()){
            justificacion=$(txtJustificacion).val()
        }*/
        
        putRespuesta(idOpinante, idCompetencia, idNivel, justificacion, id);
    });

    $( ".bFinalizar" ).click(function() {
            
        var id = $(this).attr('id');
        var arr = id.split("_");
        var idOpinante =arr[0]; 
        var idEncuestaPersona = arr[1];

        var obj = {
            idEncuestaPersona:idEncuestaPersona
        };

        $.ajax({
            type: "GET",
            url: "/Encuesta/Instrumento/validaCierre",
            contentType: "application/json; charset=utf-8",
            data: obj,
            dataType: "json",   
            success: function (msg) {

                if (msg.mensaje == '1'){
                    swal({
                        title: '¿Esta seguro de finalizar?',
                        text: "",
                        type: 'warning',
                        showCancelButton: true,
                        confirmButtonColor: '#3085d6',
                        cancelButtonColor: '#d33',
                        confirmButtonText: 'Si, finalizar',
                        cancelButtonText: 'Cancelar'
                        }).then(function(result)  {
                        if (result) {
                            save(id,$("#OBS_"+id).val(),1);
                        }
                    });
                }
                else {
                    swal(
                        'Error',
                        'Debe completar el total de Preguntas.',
                        'error'
                    );
        
                    $("#hrm_loadingPanel").hide();
                }                
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
});

var putRespuesta = function(idOpinante, idPregunta, idAlternativa, justificacion, idElementoHTML){

    var obj = { 
        idOpinante:idOpinante,
        idPregunta:idPregunta,
        idAlternativa:idAlternativa,
        justificacion:justificacion,
        isChecked:true
    };

    $("#hrm_blockAction").show();
    $.ajax({
        type: "GET",
        url: "/Encuesta/Instrumento/putRespuesta",
        contentType: "application/json; charset=utf-8",
        data: obj,
        dataType: "json",   
        success: function (msg) {
            //console.log("OK?23");
            /*$("#C_"+idOpinante).html(msg.data.resultados.competencias.nivel);
            $("#M_"+idOpinante).html(msg.data.resultados.metas.nivel);*/
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

var save = function(idOpinante, observacion, finaliza){

    var obj = {
        idOpinante: idOpinante,
        observacion: '',
        finaliza: finaliza
    };

    $("#hrm_loadingPanel").show();
    $.ajax({
        type: "GET",
        url: "/Instrumento/Instrumento/saveEvaluacionEde",
        contentType: "application/json; charset=utf-8",
        data: obj,
        dataType: "json",   
        success: function (msg) {
            
            $.ajax({
                type: "GET",
                url: "/Encuesta/Instrumento/cerrarInstrumento",
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
};