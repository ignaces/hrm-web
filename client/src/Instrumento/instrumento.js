import _ from 'lodash';
$(document).ready(function(){

    $( ".r_alternativa" ).click(function() {
        var id = $( this ).attr('id');

        var arr = id.split("_");
        var idPregunta = arr[1];
        var idAlternativa = arr[2];

        
    });
    $( ".bInstrumento" ).click(function() {
        var id = $( this ).attr('id');
        var arr = id.split("_");
        var idPersonaProceso = arr[1];
        var codigo = arr[2];
        
        $('<form id="formInstrumento" action="/Instrumento/Instrumento/index"></form>').appendTo('body')

        $(`<input type="hidden" id="idPersonaProceso" name="idPersonaProceso" value="${idPersonaProceso}" />`)
        $(`<input type="hidden" id="codigo" name="codigo" value="${codigo}" />`)
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

}); 