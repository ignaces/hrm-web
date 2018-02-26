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
    
    .on('form:submit', function () {
        //alert("aaaa");
        //return false; // Don't submit form for this demo

        
        var obj = { 
            identificador: $("#identificador").val(),
            email:$("#email").val(),
            nombres:$("#nombres").val(),
            ap_pat:$("#ap_pat").val(),
            ap_mat:$("#ap_mat").val(),
            genero:$("#registroGenero").val(),
            usuario:$("#creaUsuario").prop("checked")
         };

        console.log(obj);
        
        $.ajax({
            type: "GET",
            url: "/administracion/persona/doRegisterPersona",
            contentType: "application/json; charset=utf-8",
            data: obj,
            dataType: "json", 
            success: function (msg) {
                //console.log(msg);
                swal(
                    'Creación de Personas',
                    msg[0].texto,
                    msg[0].tipoMensaje
                );
            }
        });
        
        //$("#formRegistroPersona").submit();
        
    });
    
});