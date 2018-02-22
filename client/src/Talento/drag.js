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
       var idOpinante = (ui.draggable.attr('value'));
       var idComponente = $(this).attr("value");

       

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


    //var linkName = document.querySelector('.sortable-list').value; 
    $(document).ready(function(){
                     $(".aa").each(function(){
                        $(".sortable-list li").each(function(){
                            var idCuadrantes = ($(this).attr('value')); 
                        

                        });

                        var Color = ($(this).attr('accesskey'));
                        var elementoSCargados2 = ($(this).attr('id'));
                        var nombreCargo = ($(this).attr('value'));
                        var idOpinante = ($(this).attr('tabindex'));
                        //var Cargo = ($(this).attr('title'));
                        var arr = nombreCargo.split("_");
                        var nombres = arr[0];
                        var apellidoPaterno =arr[1]; 
                        var apellidoMaterno = arr[2];
                        var cargo = arr[3];

                        //alert("nombres"+nombres+"apellidoPaterno"+apellidoPaterno);
                        


                        //alert(nombres);

                        
                        //$(".ribbon-"+Color+"").append('<li>'+nombres+'</li>');

                        //$("."+Color+"").append('<li class="task-warning ui-sortable-handle" style="" value="'+idOpinante+'">'+nombres+'</li>');
                        $("."+Color+"").append('<li class="task-warning ui-sortable-handle" style="" value="'+idOpinante+'">' +cargo +'<div class="clearfix"></div><div class="m-t-20"><p class="pull-right m-b-0 m-t-4"><button type="button" class="btn btn-warning waves-effect waves-light"> <i class="fa fa-rocket m-r-5"></i> <span>Ficha</span> </button></p><p class="m-b-0"><a href="" class="text-muted"><img src="/assets/images/icons/businessman.svg" alt="task-user" class="thumb-sm img-circle m-r-10"> <span class="font-bold font-secondary">'+nombres+' '+apellidoPaterno+' '+apellidoMaterno+'</span></a> </p></div></li>');

                        
                    });
        });


   // $("#header ul").append('<li></li>');
