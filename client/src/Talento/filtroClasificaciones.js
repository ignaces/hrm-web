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
                //data-toggle="modal" data-target=".bs-example-modal-lg"
                //$("#btnBuscar").attr("data-toggle", "modal");
                //$("#btnBuscar").attr("data-target", ".bs-example-modal-lg");
                //$("#texto").html("<h2>No Hay Coincidencias</h2>");
                
                //$("#error").addClass("modal fade bs-example-modal-lg in");
                //$('#error').css('display','block');
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
                //$("#btnBuscar").attr("data-toggle", "modal");
                //$("#btnBuscar").attr("data-target", ".bs-example-modal-lg");
                //$("#texto").html("<h2>Hay Coincidencias</h2>");
            
            //var elem = document.getElementById('base');
              //  elem.parentNode.removeChild(elem);

            $.each(total, function(index) {
                var foto = total[index].foto;
                
                if(foto==''){
                    if(total[index].genero=="M"){
                        foto = "/assets/images/users/maleuser.png";
                    }else{
                        foto = "/assets/images/users/femaleuser.png";
                    }
                }
                $("#upcoming").append('<li class="task-warning ui-sortable-handle" style="" id="base" value="'+total[index].procesoOpinante+'">' 
                +total[index].Cargo +
                '<div class="clearfix"></div><div class="m-t-20"><p class="pull-right m-b-0 m-t-4"><button type="button" class="btn btn-warning waves-effect waves-light"> <i class="fa fa-rocket m-r-5"></i> <span>Ficha</span> </button></p><p class="m-b-0"><a href="" class="text-muted"><img src="'+foto+'" alt="task-user" class="thumb-sm img-circle m-r-10"> <span class="font-bold font-secondary">'+total[index].Colaborador+' '+total[index].apellidoPaterno+' '+total[index].apellidoMaterno+'</span></a> </p></div></li>');
            });
        }
        },
        error: function(error){
            alert(error.status+"\n "+error.statusText);
         }

        
    });  
            
    /*
         var getRut = $("[id=rut]").val();

         var rut = new Array();
         $('li').each(function() {
            rut.push($(this).attr('name'));
       });

       for (var i = 0; i < rut.length; i++) {
            if(rut[i] == getRut){
                alert(rut[i]);

               // $("li").not((document.getElementsByTagName("li").tabIndex = ""+rut[i]+"")).hide(); 
               $("[name='"+rut[i]+"']").show();
               $("li").not(document.getElementsByName(rut[i])).hide();
              
               
            }
       }
            var valorTexto = $('.buscar option:selected');
            var valores = $.map(valorTexto ,function(option) {
                return option.text;
            });



            //clasificaciones
            var sinCuadranteCla = new Array();
            $('#clasificaciones').each(function() {
                sinCuadranteCla.push($(this).attr('value'));
          });

          

              var tabindexVal = new Array();
                $('li').each(function() {
                    tabindexVal.push($(this).attr('id'));
              });
              
              
              var optionVal = new Array();
            $('.buscar option:selected').each(function() {
               optionVal.push($(this).text());
            });
            

           //Clasificaciones
            for (var i = 0; i < sinCuadranteCla.length; i++) {
                
                for (var j = 0; j < optionVal.length; j++) {
                    if (sinCuadranteCla[i] == optionVal[j]){
                        alert(sinCuadranteCla[i]);
                    }
                } 
            }

            //cargos
            var matches = [];

            
            
            for (var i = 0; i < tabindexVal.length; i++) {
                
                for (var j = 0; j < optionVal.length; j++) {
                    if (tabindexVal[i] == optionVal[j]){
                        alert(tabindexVal[i]);
                //$('li:not(.tabindexVal[i])').hide(); 

                //$("li").not("."+tabindexVal[i]+"").css("display", "none");
                //$("li").not(document.getElementById("9599177d-1712-11e8-bf12-bc764e100f2b")).css("display", "none");
                //$('ul:not(.upcoming)').hide(); 
                //$("li").not(document.getElementById(""+tabindexVal[i]+"")).css("display", "none");
                
                //$("#"+tabindexVal[i]+"").show();
                
                $("[id='"+tabindexVal[i]+"']").show();
                $("li").not(document.getElementById(tabindexVal[i])).hide();
                    }
                    else
                    {

                    }
                }
            } 
            */
               
    });

   
});