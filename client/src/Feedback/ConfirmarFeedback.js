import _ from 'lodash';

var selectedOptionvalue;

$(document).ready(function(){

    $("#btnGrabarFinalizar").click(function(){
        
        if($("#chkPresencial").is(':checked')){

            $("#modalAccion").modal("show");

        } else {

            $("#modalConfirmar").modal("show");

        }   
    }); 

    $( ".r_respAlternativa" ).change(function() {
        selectedOptionvalue = $(this).val();
    });

    $("#btnsaveSolicitud").click(function(){
        swal({
            title: '¿Esta seguro de finalizar?',
            text: "No podra volver a editar",
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, finalizar',
            cancelButtonText: 'Cancelar'
        }).then(function(result)  {
            if (result) {
                var presencial=false;

                if($("#chkSolicito").is(':checked')){
                    presencial=true;
                }

                swal({
                    title:'Finalizado',
                    text:'Feedback finalizado correctamente.',
                    type:'success'
                }).then(function(result){

                    $("#modalConfirmar").modal("hide");
                    
                });
            }
        });            
    });

    $("#btnsaveFeedback").click(function(){

        swal({
            title: '¿Esta seguro de finalizar?',
            text: "No podra volver a editar",
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, finalizar',
            cancelButtonText: 'Cancelar'
        }).then(function(result)  {
            if (result) {
                var presencial=false;
                if($("#chkPresencial").is(':checked')){
                    presencial=true;
                }

                var obj = {
                    idPersona:$("#idPersona").val(),
                    idPregunta:$("#idPregunta").val(),
                    idAlternativa:selectedOptionvalue,
                    justificacion:''
                }

                $.ajax({
                    type: "GET",
                    url: "/Feedback/Feedback/putRespuesta",
                    contentType: "application/json; charset=utf-8",
                    data: obj,
                    dataType: "json", 
                    success: function (msg) {
                        swal({
                            title:'Finalizado',
                            text:'Feedback finalizado correctamente.',
                            type:'success'
                        }).then(function(result){
                            $("#modalAccion").modal("hide");
                            location.reload();
                        });
                    },
                });
            }
        });    
    });
});