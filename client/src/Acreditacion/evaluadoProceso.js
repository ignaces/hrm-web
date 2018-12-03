$(document).ready(function () {
    var table = $('#tablaPersonas').DataTable({
        
    });
    
    $("#btnOpinante").click(function(){
        var idPersona       = $("#idPersona").val();
        var idDndOpinante   = $("#idDndOpinante").val();

        if(idPersona == 0)
        {
            swal({
                title: 'Seleccionar Opinante',
                html: "Debes seleccionar un opinante para la evaluación seleccionada.",
                type: "error",
                confirmButtonText: "Aceptar"
            });

            return false;
        }
        
        var obj = {};

        swal({
            title: 'Seleccionar Opinante',
            html: "¿Seleccionar opinante para la evaluación seleccionada? ",
            type: "warning",
            showCancelButton: true,
            cancelButtonColor: "#d33",
            cancelButtonText: "Cancelar",
            confirmButtonText: "Aceptar",
        }).then( function(result) {
            
            obj.idPersona = idPersona;
            obj.idDndOpinante = idDndOpinante;
            
            $.ajax({
                type: "GET",
                url: "/Administracion/Acreditacion/setOpinanteEvaluado",
                contentType: "application/json; charset=utf-8",
                data: obj,
                dataType: "json", 
                success: function (msg) {
                    //console.log(msg);
                    swal({
                        title: 'Selecciar Opinante',
                        html: "Opinante asignado correctamente.",
                        type: "success",
                        confirmButtonText: "Aceptar",
                    }).then( function (result){
                        
                        //location.href = "/Administracion/acreditacion/personas?idProceso="+$("#idProceso").val();
                        location.reload();
                    })
                }
            });
            
        });
    });

    
});

