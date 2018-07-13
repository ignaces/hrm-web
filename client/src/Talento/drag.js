$(document).ready(function () {

    $("#upcoming, #inprogress, #completed").sortable({
        connectWith: ".itemCuadrante",
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
      console.log(idComponente)
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
                        var idPersona = arr[7];
                        var edd = ($(this).attr('edd'));
                        if(foto==''){
                            if(genero=="M"){
                                foto="/assets/images/users/maleuser.png"
                            }else{
                                foto="/assets/images/users/femaleuser.png"
                            }
                        }
                        

                        var clasificacionesHidden = new Array();
                        
                        $('.bb').each(function() {
                            clasificacionesHidden.push($(this).attr('name'));
                        });

                        $("."+Color+"").append('<li class="task-warning ui-sortable-handle p-0" style="background-color: rgba(255,255,255,0.4); border:1px solid rgba(0,0,0,0.1);" id="'+cargo+'" name="'+rut+'" value="'+idOpinante+'" edd="'+edd+'"><input class="" id="clasificaciones" name="clasificaciones" type="hidden" value="'+clasificacionesHidden+'"><div class="row"><div class="col-xs-2"><a href="/Talento/Talento/fichaTalento?idPersona='+idPersona+'" class="text-muted"><img src="'+foto+'" alt="task-user" class="thumb-sm img-circle"> </a>    </div><div class="col-xs-6"><h6><a href="/Talento/Talento/fichaTalento?idPersona='+idPersona+'" class=""><span style="width: 100%;white-space: nowrap;overflow: hidden;text-overflow: ellipsis;display: inline-block;">'+nombres+' '+apellidoPaterno+' '+apellidoMaterno+'</span><span style="width: 100%;white-space: nowrap;overflow: hidden;text-overflow: ellipsis;display: inline-block;">'+edd+'</span></a></h6></div></div></li>');

                        
                    });
        });


