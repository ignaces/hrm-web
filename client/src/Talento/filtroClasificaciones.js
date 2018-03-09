import _ from 'lodash';
$(document).ready(function() {

    $("#spinner").hide();
$("#btnBuscar").on('click',function() {
    $("#spinner").show();
    //clasificaciones filtro 
    var valorTexto = $('.buscarCla option:selected');
            var nombreFiltro = $.map(valorTexto ,function(option) {
                return option.text;
            });

            //cargos filtro 
            var value = $('.buscar option:selected');
            var cargosFiltro = $.map(value ,function(option) {
                return option.text;
            });  

            var valorClasificaciones = $('.buscarCla option:selected');
            var nombreClasificaciones = $.map(valorClasificaciones ,function(option) {
                return option.value;
            });
            //alert(nombreClasificaciones);
            //alert(nombreClasificaciones.length);
            
          
        //datosPersonas 
        var rut = $("#rut").val();
        var nombres = $("#nombres").val();
        var paterno = $("#paterno").val();
        var materno = $("#materno").val();
        //selected disabled hidden
           
var jsonObj = {};
for (var i = 0 ; i < nombreFiltro.length; i++) {
    //jsonObj["nombreFiltro" + (i+1)] = nombreFiltro[i];
    //jsonObj += nombreFiltro[i];
    //jsonObj += nombreFiltro[i];
    //jsonObJ += nombreFiltro[i];
    
}

var validacionCargo = $('#buscarCargo').val();

        //var bb = "'" + nombreFiltro.join("','") + "'";
        //var q = nombreFiltro.join();

        
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
           
            //var valorTrae = total.lenght;
            //alert(total.lenght);
            if(Object.keys(total).length == 0)
            {
                alert("No Hay Coincidencias");
                
                //$("#error").addClass("modal fade bs-example-modal-lg in");
                //$('#error').css('display','block');
            }
            else
            {
                $('#upcoming').empty();
                alert("Hay Coincidencias");
            //var jua = total.arreglo;
                /*
                for(var i=0; i < total.arreglo; i++){
              //html = html + total[i].idPersona
              console.log("valor x "+total.arreglo[i].idPersona)
              console.log("valor y "+total.arreglo[i].Colaborador)
              console.log("valor f "+total.arreglo[i].apellidoPaterno)
              console.log("valor f "+total.arreglo[i].apellidoMaterno)
              console.log("valor g "+total.arreglo[i].Cargo)
              console.log("valor j "+total.arreglo[i].procesoOpinante)

            }
            */
            
            //var elem = document.getElementById('base');
              //  elem.parentNode.removeChild(elem);

                
            
            $.each(total, function(index) {
               // alert(total[index].idPersona);
                //alert(total[index].Colaborador);
                //alert(total[index].apellidoPaterno);
                //alert(total[index].apellidoMaterno);
                //alert(total[index].Cargo);
                //alert(total[index].procesoOpinante);

                

                $("#upcoming").append('<li class="task-warning ui-sortable-handle" style="" id="base" value="'+total[index].procesoOpinante+'">' 
            +total[index].Cargo +
           '<div class="clearfix"></div><div class="m-t-20"><p class="pull-right m-b-0 m-t-4"><button type="button" class="btn btn-warning waves-effect waves-light"> <i class="fa fa-rocket m-r-5"></i> <span>Ficha</span> </button></p><p class="m-b-0"><a href="" class="text-muted"><img src="/assets/images/icons/businessman.svg" alt="task-user" class="thumb-sm img-circle m-r-10"> <span class="font-bold font-secondary">'+total[index].Colaborador+' '+total[index].apellidoPaterno+' '+total[index].apellidoMaterno+'</span></a> </p></div></li>');
            });
        }
            
            
            //for(var i=0 in msg.arreglo){
             // msg.arreglo[i].idPersona;
            //}
            //var obj = jQuery.parseJSON(msg);
           
           //var obj = JSON.parse(msg);
           //alert(obj.idLastInsert);
           //alert(msg.idLastInsert);
           //alert("Se ejecuto bien");

           //$(".task-warning").append('<li class="task-warning ui-sortable-handle" style="" id="'+cargo+'" name="'+rut+'"   value="'+idOpinante+'">' 
           //+'<input class="" id="clasificaciones" name="clasificaciones" type="hidden" value="'+clasificacionesHidden+'">' +cargo +
           //'<div class="clearfix"></div><div class="m-t-20"><p class="pull-right m-b-0 m-t-4"><button type="button" class="btn btn-warning waves-effect waves-light"> <i class="fa fa-rocket m-r-5"></i> <span>Ficha</span> </button></p><p class="m-b-0"><a href="" class="text-muted"><img src="/assets/images/icons/businessman.svg" alt="task-user" class="thumb-sm img-circle m-r-10"> <span class="font-bold font-secondary">'+nombres+' '+apellidoPaterno+' '+apellidoMaterno+'</span></a> </p></div></li>');
        
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