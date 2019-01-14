$("#btnGrabarFinalizar").click(function(){
    
    var presencial=false;
    if($("#chkPresencial").is(':checked')){
        presencial=true;

        $("#modalAccion").modal("show");
    } else {
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
            }
        }); 
    }   
    
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

            swal({
                title:'Finalizado',
                text:'Feedback finalizado correctamente.',
                type:'success'
            }).then(function(result){
                $("#modalAccion").modal("hide");
            });
        }
    });    
});
