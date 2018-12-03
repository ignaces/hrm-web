$(document).ready(function () {
    
    
    var table = $('#tablaNoParticipantes').DataTable({
        
    });

    var table = $('#tablaPersonas').DataTable({
        
    });
    

    $("#botonRegistrar").click(function(){
        var checks = 0;
    
        $(".chkIncluir").each(function(){
            if($(this).prop("checked") == true)
            {
                //console.log($(this).prop("id"));
                checks++;
            }
            
        });
    
        if(checks == 0)
        {
            swal(
                {   title: "Error",
                    html: "Debes seleccionar al menos a una persona para incluir en el proceso.", 
                    type: "error"
                });
        return false;
            return false;
        }

        if($("#idPerfil").val() == 0)
        {
            swal(
                    {   title: "Error",
                        html: "Debes seleccionar un perfil. width='100%'>", 
                        type: "error"
                    });
            return false;
        }

        putPersonaPerfil();
    });

    function putPersonaPerfil()
    {
        var arrPersonas = [];
        var objPersona = {};
        var obj = {};

        swal({
            title: 'Incluir Personas',
            html: "¿Agregar las personas seleccionadas al proceso? ",
            type: "warning",
            showCancelButton: true,
            cancelButtonColor: "#d33",
            cancelButtonText: "Cancelar",
            confirmButtonText: "Aceptar",
        }).then( function(result) {
            
            $(".chkIncluir").each(function(){
                if($(this).prop("checked") == true)
                {
                    //console.log($(this).prop("id"));
                    objPersona = { "idPersona": $(this).prop("id")};
                    arrPersonas.push(objPersona);
                }
                
            });

            //console.log(arrPersonas);
            obj.idProceso = $("#idProceso").val();
            obj.idPerfil = $("#idPerfil").val();
            obj.personas = arrPersonas;

            $.ajax({
                type: "GET",
                url: "/Administracion/Acreditacion/addPersonaProceso",
                contentType: "application/json; charset=utf-8",
                data: obj,
                dataType: "json", 
                success: function (msg) {
                    //console.log(msg);
                    swal({
                        title: 'Incluir Personas',
                        html: "Personas incluidas al proceso. Presione Aceptar para Continuar.",
                        type: "success",
                        confirmButtonText: "Aceptar",
                    }).then( function (result){
                        
                        location.href = "/Administracion/Acreditacion/personas?idProceso="+$("#idProceso").val();
                    })
                }
            });
            
        });
    }
});

