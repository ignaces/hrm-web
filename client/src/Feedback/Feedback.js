$("#btnGrabarFinalizar").click(function(){

    var vacios=false;
    $(".inputObservacion").each(function() {
        var txt = $(this).prop('value');
        
        if(txt== ""){
            vacios = true;
        }    
        
    });
    
    if (vacios) {
        swal(
            'No has terminado',
            'Debes ingresar una observación.',
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
            
            var obj = { 
              idOpinante:$("#idOpinante").val(),
              observacion:$("#txtObservacion").val()
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