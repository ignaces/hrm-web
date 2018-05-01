import _ from 'lodash';
$(document).ready(function() {

    $("#spinner").hide();
$("#btnBuscar").on('click',function() {
    $("#spinner").show();
    //clasificaciones filtro 
    var valorTexto = $('.buscarCla option:selected');
            var nombreFiltro = $.map(valorTexto ,function(option) {
               if(option.value!='-1'){
                return option.value;
               }
                
            });

            //cargos filtro 
            var value = $('.buscar option:selected');
            var cargosFiltro = $.map(value ,function(option) {
                return option.value;
            });  

            var valorClasificaciones = $('.buscarCla option:selected');
            var nombreClasificaciones = $.map(valorClasificaciones ,function(option) {
                return option.value;
            });

        var rut = $("#rut").val();
        var nombres = $("#nombres").val();
        var paterno = $("#paterno").val();
        var materno = $("#materno").val();
        //selected disabled hidden
        var validacionCargo = $('#buscarCargo').val();


        
        
    //if (nombreClasificaciones == "," || validacionCargo == null || nombreClasificaciones == "" || rut == "" || nombres == "" || paterno == "" || materno == "" ){
       // alert("Debes seleccionar una opción de filtro");
        
        
        /*
    if (email==""){
        $('input[name=emailNieuwsbrief]').css({'border':'2px solid red'});
        proceed = false;
        }
        */

    //}
    
    var obj = { 
        nombreFiltro:nombreFiltro,  //nombreFiltro   //bb
        cargosFiltro:cargosFiltro,
        rut:rut,
        nombres:nombres,
        paterno:paterno,
        materno:materno
        //arr:arr,
        //idTalentoOpinante:idTalentoOpinante
     };

        
    $.ajax({
        type: "GET",
        url: "/Talento/Talento/filtroDragColaboradoresSinClasificar",
        contentType: "application/json; charset=utf-8",
        data: obj,
        dataType: "json", 
        success: function (total) {
            $("#spinner").hide();
          
            //alert(Object.keys(total).length);
            if(Object.keys(total).length == 0)
            {
                //alert("No Hay Coincidencias");


                swal({ 
                    title: "No hay coincidencias",
                     text: "",
                      type: "error" 
                    }
                );
            }
            else
            {
                $('#upcoming').empty();
                //alert("Hay "+Object.keys(total).length+" Coincidencias");
                
                sweetAlert({
                    title: "Hay "+Object.keys(total).length+" coincidencias",
                    text: "",
                    type: "success"
                }
            );

            $.each(total, function(index) {
                var foto = total[index].foto;
                
                if(foto==''){
                    if(total[index].genero=="M"){
                        foto = "/assets/images/users/maleuser.png";
                    }else{
                        foto = "/assets/images/users/femaleuser.png";
                    }
                }
                var atributos = '<i class="fa fa-plane m-r-5"></i><i class="fa fa-refresh m-r-5"></i><i class="fa fa-warning m-r-5"></i><i class="fa fa-star m-r-5"></i>';
                $("#upcoming").append('<li class="task-warning ui-sortable-handle" style="" id="base" value="'+total[index].procesoOpinante+'">' +
                '<div class="m-t-20"><p class="pull-right">'+atributos+'</p><p class="m-b-0"><a href="" class="text-muted"><img src="'+foto+'" alt="task-user" class="thumb-sm img-circle pull-left"> <H6 class="pull-left">'+total[index].Colaborador+' '+total[index].apellidoPaterno+' '+total[index].apellidoMaterno+'</H6></a> </p></div></li>');
            });
        }//$("."+Color+"").append('<li class="task-warning ui-sortable-handle" style="" id="'+cargo+'" name="'+rut+'"   value="'+idOpinante+'">' +'<input class="" id="clasificaciones" name="clasificaciones" type="hidden" value="'+clasificacionesHidden+'"><p class="m-b-0"><div class="clearfix"></div><div><p class="pull-right">'+atributos+'</p></div><a href="#" class="text-muted"><img src="'+foto+'" alt="task-user" class="thumb-sm img-circle pull-left"> <H6 class="pull-left">'+nombres+' '+apellidoPaterno+' '+apellidoMaterno+'</H6></a> </p></li>');
        },
        error: function(error){
            alert(error.status+"\n "+error.statusText);
        }

        
    });  
            
   
    });

   
});