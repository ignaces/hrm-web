import _ from 'lodash';
//holi
$(document).ready(function(){
    
    $("#lnkForgot").click(function(){
                
        swal({
            title: '¿Olvido su contraseña?',
            text: "Ingrese su correo para solicitar cambio de clave.",
            type: 'question',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Solicitar cambio de clave',
            cancelButtonText: 'Cancelar',
            input: 'email',
            inputPlaceholder: 'Ingrese su correo'
        }).then(function(result)  {
            if (result) {

                
                var obj = { 
                    correo:result                    
                 };

                $.ajax({
                    type: "GET",
                    url: "/Account/User/forgotPassword",
                    contentType: "application/json; charset=utf-8",
                    data: obj,
                    dataType: "json",   
                    success: function (msg) {
                        
                        swal({
                            title:'Finalizado',
                            text:'Evaluación finalizado correctamente.',
                            type:'success'
                        });


                    },
                    error: function(XMLHttpRequest, textStatus, errorThrown) { 
                        
                    }
                });

            }
        }, function(reason) {
            //Usuario cancela accion
            //console.log(reason); //cancel
        });
    });

}); 