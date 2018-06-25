import _ from 'lodash';
$(document).ready(function() {
    $(".select2").select2();
    $("#spinner").hide();

$("#btnBuscar").on('click',function() {
    $("#spinner").show();
    //clasificaciones filtro 
    
    var clasificaciones =[];


        var rut = $("#rut").val();
        var nombres = $("#nombres").val();
        var paterno = $("#paterno").val();
        var materno = $("#materno").val();
        //selected disabled hidden
        var cargos = $('#cmbCargo').val();
        var tr = $('#cmbCuadrante').val();

        $('.buscarCla').each(function(i, obj) {
            clasificaciones= $.merge(clasificaciones,$(this).val());
        });
        /*console.log(clasificaciones)
        console.log(cargos)
        console.log(idTr)*/

    
    var obj = { 
        clasificaciones:clasificaciones,  //nombreFiltro   //bb
        cargos:cargos,
        tr:tr,
        identificador:rut,
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
               
                $("#upcoming").append('<li class="task-warning ui-sortable-handle p-0" style="background-color: rgba(255,255,255,0.4); border:1px solid rgba(0,0,0,0.1);" id="'+total[index].cargo+'" name="'+total[index].rut+'" value="'+total[index].procesoOpinante+'"><div class="row"><div class="col-xs-2"><a href="/Talento/Talento/fichaTalento?idPersona='+total[index].idPersona+'" class="text-muted"><img src="'+foto+'" alt="task-user" class="thumb-sm img-circle"> </a>    </div><div class="col-xs-6"><h6><a href="/Talento/Talento/fichaTalento?idPersona='+total[index].idPersona+'" class=""><span style="width: 100%;white-space: nowrap;overflow: hidden;text-overflow: ellipsis;display: inline-block;">'+total[index].Colaborador+' '+total[index].apellidoPaterno+' '+total[index].apellidoMaterno+'</span></a></h6></div></div></li>');
            });
        }//$("."+Color+"").append('<li class="task-warning ui-sortable-handle" style="" id="'+cargo+'" name="'+rut+'"   value="'+idOpinante+'">' +'<input class="" id="clasificaciones" name="clasificaciones" type="hidden" value="'+clasificacionesHidden+'"><p class="m-b-0"><div class="clearfix"></div><div><p class="pull-right">'+atributos+'</p></div><a href="#" class="text-muted"><img src="'+foto+'" alt="task-user" class="thumb-sm img-circle pull-left"> <H6 class="pull-left">'+nombres+' '+apellidoPaterno+' '+apellidoMaterno+'</H6></a> </p></li>');
        },
        error: function(error){
            alert(error.status+"\n "+error.statusText);
        }

        
    });  
            
   
    });

   
});