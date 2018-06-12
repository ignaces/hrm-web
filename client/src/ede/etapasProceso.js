

var loadEtapas = function(idEtapa,idProceso){
    var obj = {
        idEtapa:idEtapa,
        idProceso:idProceso
    }
    $.ajax({
        type: "GET",
        url: "/Desempeno/Proceso/getTareasEtapa",
        contentType: "application/json; charset=utf-8",
        data: obj,
        dataType: "json", 
        success: function (msg) {
           console.log(msg);
           $("#dTareas").show();
        }
    });
}


$(document).ready(function(){
    $( ".btnEtapa" ).click(function() {
        
        var id = $( this ).attr('id');
        
        var arr = id.split("_");
        var idEtapa = arr[0];
        var idProceso = arr[1];

        loadEtapas(idEtapa,idProceso);
    });
});