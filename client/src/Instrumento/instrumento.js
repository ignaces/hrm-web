import _ from 'lodash';
$(document).ready(function(){
    
    $( ".r_alternativa" ).click(function() {
        
        var id = $( this ).attr('id');
        
        var arr = id.split("_");
        var idPregunta = arr[1];
        var idAlternativa = arr[2];
        var requiereJustificacion = arr[3]*1;
        var idOpinante =arr[4]; 
        var justificacion = "";
        if(requiereJustificacion==1){
            $("#txt_"+idPregunta).show();
        }else{
            $("#txt_"+idPregunta).hide();
        }

        if($("#txt_"+idPregunta).val()){
            justificacion=$("#txt_"+idPregunta).val()
        }
        
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
        
        }
    });
        


    });
    $( ".bInstrumento" ).click(function() {
        var id = $( this ).attr('id');
        var arr = id.split("_");
        var idOpinante = arr[0];
        var codigo = arr[1];
        $("#idOpinante").val(idOpinante)
        $("#codigo").val(codigo)
        
        $('#formInstrumento').submit()
    });
    
    $( "#instrumento_btn_guardar" ).click(function() {

        swal(
            'Guardado',
            'Datos guardados correctamente.',
            'success'
          );
    });

    $( "#instrumento_btn_finalizar" ).click(function() {
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
                swal(
                    'Finalizado',
                    'Evaluación finalizado correctamente.',
                    'success'
                );
            }
          });
    });

    /*$('.table-responsive').DataTable();*/

}); 