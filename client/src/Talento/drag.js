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




$(".sortable-list").droppable({
    drop: function(event, ui) {
       var idOpinante = (ui.draggable.attr('value'));
       var idComponente = $(this).attr("value");
      
        

        
        var obj = { 
            idOpinante:idOpinante,
            idComponente:idComponente
         };
        $.ajax({
            type: "GET",
            url: "/Talento/Talento/seleccionDragTalento",
            contentType: "application/json; charset=utf-8",
            data: obj,
            dataType: "json", 
            success: function (msg) {
               
               
            }
        });
    //};
    }
  });


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
                        var rut = arr[4];
                        var foto = arr[5];
                        var genero = arr[6];
                        
                        if(foto==''){
                            if(genero=="M"){
                                foto="/assets/images/users/maleuser.png"
                            }else{
                                foto="/assets/images/users/femaleuser.png"
                            }
                        }
                        

                        var clasificacionesHidden = new Array();
                        //$('#cargos').each(function() {
                          $('.bb').each(function() {
                            clasificacionesHidden.push($(this).attr('name'));
                        });
             
                        $("."+Color+"").append('<li class="task-warning ui-sortable-handle" style="" id="'+cargo+'" name="'+rut+'"   value="'+idOpinante+'">' +'<input class="" id="clasificaciones" name="clasificaciones" type="hidden" value="'+clasificacionesHidden+'">' +cargo +'<div class="clearfix"></div><div class="m-t-20"><p class="pull-right m-b-0 m-t-4"><button type="button" class="btn btn-warning waves-effect waves-light"> <i class="fa fa-rocket m-r-5"></i> <span>Ficha</span> </button></p><p class="m-b-0"><a href="#" class="text-muted"><img src="'+foto+'" alt="task-user" class="thumb-sm img-circle m-r-10"> <span class="font-bold font-secondary">'+nombres+' '+apellidoPaterno+' '+apellidoMaterno+'</span></a> </p></div></li>');

                        
                    });
        });


