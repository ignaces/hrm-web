import _ from 'lodash';
//holi
$(document).ready(function(){
            $( ".r_alternativa" ).change(function() {
                
            var id = $(this).attr('id');
            var idNivel= $(this).val();
            
            var arr = id.split("_");
            var idOpinante =arr[0]; 
            var idCompetencia = arr[1];
            
           
            
            var justificacion = "";
            var txtJustificacion = "#txt_"+idCompetencia+"_"+idOpinante;

           

            if($(txtJustificacion).val()){
                justificacion=$(txtJustificacion).val()
            }

            
                putRespuesta(idOpinante, idCompetencia, idNivel, justificacion, id);
            
            
        });

    $( ".txt_justificacion" ).focusout(function() {  
        var id = $( this ).attr('id');
        var idAlternativa = $( this ).attr('idAlternativa');
        
        var arr = id.split("_");
        var idPregunta = arr[1];
        var idOpinante =arr[1]; 
        var justificacion = "";
        
        if($("#OBS_"+idOpinante).val()){
            justificacion=$("#OBS_"+idOpinante).val()
        }
        var obj = {
            idOpinante: idOpinante,
            observacion: justificacion,
            finaliza: 0
        };
        save(obj)
    });
});
var finish = function(obj){
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
var save = function(obj){
    $.ajax({
        type: "GET",
        url: "/Instrumento/Instrumento/saveEvaluacionEde",
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

            $("#hrm_blockAction").hide();
            
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
            $("#C_"+idOpinante).html(msg.data.resultados.competencias.nivel);
            $("#M_"+idOpinante).html(msg.data.resultados.metas.nivel);
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