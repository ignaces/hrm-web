import _ from 'lodash';

var selectedOptionvalue;

$(document).ready(function() {
    
    $( ".r_etapa" ).change(function() {
        selectedOptionvalue = $(this).val();
    });

    $( ".bFinalizarCarga" ).click(function() {
        var id = $(this).attr('idpro');

        swal({
            title: '¿Esta seguro realizar la Carga?',
            text: "Una vez ejecutada la carga los datos seran modificados",
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, Cargar',
            cancelButtonText: 'Cancelar'
        }).then(function(result)  {
            if (result) {
                carga(id);
            }
        });
    });

});

var carga = function(id){

    var carga = comCarga.cargaArchivo;
    if (id == "" || id == undefined){
        swal(
            'Error',
            'Proceso no Identificado.',
            'error'
        );
    }else{
        if (selectedOptionvalue == "" || selectedOptionvalue == undefined){
            swal(
                'Error',
                'Etapa no Seleccionada.',
                'error'
            );
        } else{
            if(carga.length == 0 || carga.length == undefined){
                swal(
                    'Error',
                    'Archivo no Cargado.',
                    'error'
                );
            } else{
                var obj = {
                    idProceso:id,
                    idEtapa:selectedOptionvalue,
                    jsonEvaluados:carga
                };
            
                $("#hrm_loadingPanel").show();
                $.ajax({
                    type: "GET",
                    url: "/Administracion/Administracion/cargaEvaluadorMasivo",
                    contentType: "application/json; charset=utf-8",
                    data: obj,
                    dataType: "json",   
                    success: function (msg) {
                        var b = [];
            
                        for (var element in msg.mensaje) {
                            var a = msg.mensaje;
            
                            b.push({
                                identificadorEvaluado:a[element].identificadorEvaluado,
                                identificadorEvaluador:a[element].identificadorEvaluador,
                                mensaje:a[element].mensaje
                            }); 
                        }
            
                        comResp.respArchivo=b;
                        comCarga.cargaArchivo=[];
            
                        swal({
                            title:'Finalizado',
                            text:'Carga masiva realizada satisfactoriamente.',
                            type:'success'
                        });
            
                        $("#hrm_loadingPanel").hide();
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
        }
    }    
}