
$("#btnGrabarFinalizar").click(function(){

    var vacios=false;
    var txt="";
    var largo=0;
    $(".inputObservacion").each(function() {
        txt = $(this).prop('value');
        
        if(txt== ""){
            vacios = true;
        }    
        var trimed=txt.replace(/\s+/g, '');

        largo=trimed.length;
    });
    
    if (vacios) {
        swal(
            'No has terminado',
            'Debes ingresar una observación.',
            'warning'
        );
        return false;
    }

    if (largo<100) {
        swal(
            'No has terminado',
            'Debes ingresar una observación de al menos 100 caracteres.',
            'warning'
        );
        return false;
    }

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
              idOpinante:$("#idOpinante").val(),
              observacion:$("#txtObservacion").val(),
              presencial:presencial,
              idOpinado:$("#idOpinado").val()
            };

            $.ajax({
                type: "GET",
                url: "/Feedback/Feedback/saveFeedback",
                contentType: "application/json; charset=utf-8",
                data: obj,
                dataType: "json", 
                success: function (msg) {
                    swal({
                        title:'Finalizado',
                        text:'Feedback finalizado correctamente.',
                        type:'success'
                    }).then(function(result){
                        $('#frmVolver').submit();
                    });


                }
            });
        }
      });
}); 