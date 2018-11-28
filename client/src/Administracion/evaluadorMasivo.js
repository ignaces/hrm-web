import _ from 'lodash';

var selectedOptionvalue;

$(document).ready(function() {
    
    $( ".r_etapa" ).change(function() {
        selectedOptionvalue = $(this).val();
    });

    $( ".bFinalizarCarga" ).click(function() {
        var id = $(this).attr('idpro');
        carga(id);
    });

});

function carga(id){
    var obj = {
        idProceso:id,
        idEtapa:selectedOptionvalue,
        jsonEvaluados:comCarga.cargaArchivo
    };

    $.ajax({
        type: "GET",
        url: "/Administracion/Administracion/cargaEvaluadorMasivo",
        contentType: "application/json; charset=utf-8",
        data: obj,
        dataType: "json",   
        success: function (msg) {

            alert(msg.mensaje);

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