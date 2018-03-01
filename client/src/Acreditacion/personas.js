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
                    html: "Debes seleccionar al menos a una persona para incluir en el proceso <br><br> <img src='https://78.media.tumblr.com/5f51bee9370341c5b89d63d9f7639ad2/tumblr_inline_osmoae9I7V1so41lp_540.gif' width='100%'>", 
                    type: "error"
                });
        return false;
            return false;
        }

        if($("#idPerfil").val() == 0)
        {
            swal(
                    {   title: "Error",
                        html: "Debes seleccionar un perfil <br><br> <img src='https://78.media.tumblr.com/5f51bee9370341c5b89d63d9f7639ad2/tumblr_inline_osmoae9I7V1so41lp_540.gif' width='100%'>", 
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
            html: "¿Agregar las personas seleccionadas al proceso? <br><br> <img src='https://i.imgur.com/36DVbRG.gif' width='100%'> ",
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
                url: "/administracion/acreditacion/addPersonaProceso",
                contentType: "application/json; charset=utf-8",
                data: obj,
                dataType: "json", 
                success: function (msg) {
                    //console.log(msg);
                    swal({
                        title: 'Incluir Personas',
                        html: "<img src='https://vignette.wikia.nocookie.net/locuras-extremas/images/2/26/Exito.gif/revision/latest?cb=20140217143923&path-prefix=es' width='100%'> ",
                        type: "success",
                        confirmButtonText: "Aceptar",
                    }).then( function (result){
                        
                        location.href = "/Administracion/acreditacion/personas?idProceso="+$("#idProceso").val();
                    })
                }
            });
            
        });
    }
});

