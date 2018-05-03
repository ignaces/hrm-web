import _ from 'lodash';

$(document).ready(function() {
    $('form').parsley();
    //alert("baaaaa");
});

$(function () {
    $('#formRegistroPersona').parsley().on('field:validated', function () {
        var ok = $('.parsley-error').length === 0;
        $('.alert-info').toggleClass('hidden', !ok);
        $('.alert-warning').toggleClass('hidden', ok);
    })
    
    .on('form:submit', function (e) {
        //alert("aaaa");
        //return false; // Don't submit form for this demo
        var objEmail = { 
            email:$("#email").val()
        };
       
        //console.log($("#email").val().length);
        
        if($("#creaUsuario").prop("checked") == true && $("#email").val().length == 0)
        {
            swal({
                title: 'Error',
                text: "Debes ingresar un email válido cuando seleccionas la opción 'Habilitar Login'.",
                type: "error",
                confirmButtonText: 'Aceptar'
            });

            return false;
        } 
        
        var existe = 0;

        if($("#creaUsuario").prop("checked") == true)
        {
            $.ajax({
                type: "GET",
                url: "/Administracion/Persona/userExiste",
                contentType: "application/json; charset=utf-8",
                data: objEmail,
                dataType: "json", 
                async: false,
                success: function (msg) {
                    //console.log(msg);
                    
                    if(msg.data[0].existe > 0)
                    {
                        swal({
                                title: 'Error',
                                text: "El email que estás intentando registrar ya existe.",
                                type: "error",
                                confirmButtonText: 'Aceptar',
                        });

                        existe = 1;
                        return false;
                    }
                }
            });
        } 

        if(existe==0)
        {
            var obj = { 
                identificador: $("#identificador").val(),
                email:$("#email").val(),
                nombres:$("#nombres").val(),
                ap_pat:$("#ap_pat").val(),
                ap_mat:$("#ap_mat").val(),
                genero:$("#registroGenero").val(),
                usuario:$("#creaUsuario").prop("checked")
            };

            $.ajax({
                type: "GET",
                url: "/Administracion/Persona/doRegisterPersona",
                contentType: "application/json; charset=utf-8",
                data: obj,
                dataType: "json", 
                success: function (msg) {
                    //console.log(msg);

                    var tipoMensaje = msg[0].tipoMensaje;

                    swal({
                        title: 'Creación de Personas',
                        text: msg[0].texto,
                        type: tipoMensaje,
                        confirmButtonText: 'Aceptar',
                    }).then( function(result) {
                        
                        if(tipoMensaje == "success")
                        {
                            location.href = "/Administracion/Persona/registrarPersona";
                        }
                    });
                }
            });
        }
        
        return false;
        
        //$("#formRegistroPersona").submit();
        
    });
    
});