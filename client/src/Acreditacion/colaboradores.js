import _ from 'lodash';
//holi
$(document).ready(function(){
    
    $( ".bInstrumento" ).click(function() {
        var id = $( this ).attr('id');
        var arr = id.split("_");
        var idOpinante = arr[0];
        var codigo = arr[1];
        var idPersona = arr[2];
        var codigoComponente = $(this).attr("codComponente")

        $("#idOpinante").val(idOpinante)
        $("#codigo").val(codigo)
        $("#idPersona").val(idPersona)
        $("#codigoComponente").val(codigoComponente)
        
        $('#formInstrumento').submit()
    });
}); 