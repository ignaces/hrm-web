
var changeCheckbox = document.querySelector('.js-check-change');

changeCheckbox.onchange = function() {
  var checked=changeCheckbox.checked;
  if(checked){
    $("#divPregunta").show();
}else{
    $("#divPregunta").hide();
}

};


$("#btnGrabarFinalizar").click(function(){

    

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
            var acuerdo=false;
            if($("#chkAcuerdo").is(':checked')){
                acuerdo=true;
            }
            var obj = { 
              idOpinante:$("#idOpinante").val(),
              acuerdo:acuerdo,
              presencial:presencial
            };

            $.ajax({
                type: "GET",
                url: "/Feedback/Feedback/saveConfirmacion",
                contentType: "application/json; charset=utf-8",
                data: obj,
                dataType: "json", 
                success: function (msg) {
                    swal({
                        title:'Finalizado',
                        text:'Feedback finalizado correctamente.',
                        type:'success'
                    }).then(function(result){
                        $("#frmfin").submit();
                    });


                }
            });
        }
      });
}); 