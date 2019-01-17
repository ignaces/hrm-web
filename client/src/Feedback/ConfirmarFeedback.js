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
                var estado = 0;
                if($("#chkSolicito").is(':checked')){
                    presencial=true;
                    estado = 2;
                }else{
                    estado = 3;
                }

                var idPersona=$("#idPersona").val();
                var objResp = {
                    idOpinado:idPersona,
                    estado:estado
                }

                $.ajax({
                    type: "GET",
                    url: "/Feedback/Feedback/saveRespColaborador",
                    contentType: "application/json; charset=utf-8",
                    data: objResp,
                    dataType: "json", 
                    success: function (msg) {
                    },
                });

                var obEst = {
                    idPersona:idPersona
                }

                $.ajax({
                    type: "GET",
                    url: "/Feedback/Feedback/setEstadoEncuesta",
                    contentType: "application/json; charset=utf-8",
                    data: obEst,
                    dataType: "json", 
                    success: function (msg) {
                        swal({
                            title:'Finalizado',
                            text:'Feedback finalizado correctamente.',
                            type:'success'
                        }).then(function(result){
        
                            $("#modalConfirmar").modal("hide");
                            location.reload();                            
                        });
                    },
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

                var objResp = {
                    idOpinado:$("#idPersona").val(),
                    estado:1
                }

                $.ajax({
                    type: "GET",
                    url: "/Feedback/Feedback/saveRespColaborador",
                    contentType: "application/json; charset=utf-8",
                    data: objResp,
                    dataType: "json", 
                    success: function (msg) {

                    },
                });

                var idPersona=$("#idPersona").val();

                var obj = {
                    idPersona:idPersona,
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

                            var obEst = {
                                idOpinado:idPersona
                            }

                            $.ajax({
                                type: "GET",
                                url: "/Feedback/Feedback/setEstadoEncuesta",
                                contentType: "application/json; charset=utf-8",
                                data: obEst,
                                dataType: "json", 
                                success: function (msg) {
                                    $("#modalAccion").modal("hide");
                                    location.reload();        
                                },
                            });
                        });
                    },
                });
            }
        });    
    });
});