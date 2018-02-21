$(document).ready(function () {

    $("#upcoming, #inprogress, #completed").sortable({
        connectWith: ".taskList",
        placeholder: 'task-placeholder',
        forcePlaceholderSize: true,
        update: function (event, ui) {

            var todo = $("#todo").sortable("toArray");
            var inprogress = $("#inprogress").sortable("toArray");
            var completed = $("#completed").sortable("toArray");
        }
    }).disableSelection();

});


/*
$("#completed").droppable({
    drop: function( event, ui ) {
     $(this).append($(ui.draggable).find('task1'));
     var resultado =   $(this).append($(ui.draggable).find('task1'));
      alert(resultado);
    }
})
*/

$(".sortable-list").droppable({
    drop: function(event, ui) {
       //var id = ui.draggable.attr('value');
        
       //alert(ui.draggable.attr('value'));
       var idOpinante = (ui.draggable.attr('value'));
       var idComponente = $(this).attr("value");
       //var idComponente = (ui.droppable.attr('value'));
        
        alert("ID del opinante"+ idOpinante+ "ID Componente "+ idComponente);
       //var arr = id.split("_");
       //var idTalentoMatriz = arr[0];
        //var idTalentoOpinante = arr[1];
        

        //var seleccionDragTalento = function(idTalentoMatriz, idTalentoOpinante){
        var obj = { 
            idOpinante:idOpinante,
            idComponente:idComponente
            //arr:arr,
            //idTalentoOpinante:idTalentoOpinante
         };
         
        
        $.ajax({
            type: "GET",
            url: "/Talento/Talento/seleccionDragTalento",
            contentType: "application/json; charset=utf-8",
            data: obj,
            dataType: "json", 
            success: function (msg) {
                //var obj = jQuery.parseJSON(msg);
               //alert(obj);
               //var obj = JSON.parse(msg);
               //alert(obj.idLastInsert);
               //alert(msg.idLastInsert);
               //alert("Se ejecuto bien");
               
            }//,
            //error: function(error){
              //  alert(error.status+"\n "+error.statusText);
             //}
        });
    //};
    }
  });


  $(document).ready(function () {
  var linkName = document.querySelector('#linkName').value; 

});