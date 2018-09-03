$(document).ready(function() {
    $(".sortable-list").droppable({
    
        drop: function(event, ui) {
            
           var idOpinante = (ui.draggable.attr('value'));
           var idComponente = $(this).attr("value");
          setCuadrante(idOpinante,idComponente,"")
        }
      });
      $("#upcoming").sortable({
        connectWith: ".itemCuadrante",
        placeholder: 'task-placeholder',
        forcePlaceholderSize: true,
        update: function (event, ui) {

        }
    }).disableSelection();
});


var objCuadrante ={}

var setCuadrante = function(idOpinante,idCuadrante,justificacion){
    objCuadrante = { 
        idOpinante:idOpinante,
        idComponente:idCuadrante,
        justificacion:justificacion
     };
    $.ajax({
        type: "GET",
        url: "/Talento/Talento/seleccionDragTalento",
        contentType: "application/json; charset=utf-8",
        data: objCuadrante,
        dataType: "json", 
        success: function (msg) {
           if(msg.valido==0 && justificacion==""){
               
                /*var mensaje = 'El cuadrante seleccionado debe ser utilizado por la(s) siguientes calificaciones de desempeño: <br>' + msg.valorEde + ' <br> \
               Si desea continuar debe ingresar una justificación.'
               */

              var mensaje = 'Según el siguiente cuadro, existe una inconsistencia entre la Evaluación de Desempeño y la ubicación en la Matriz de Talent Review. <br> \
              <img src=""  \
              Si aún así desea continuar, ingrese la justificación abajo'
               
               //$("#explicacion").html(mensaje)
               
               $("#justificaModal").modal('show');
           }else{
               $("#justificaModal").modal('hide');
           }
        }
    });
}


var loadCuadrantes=function(){
    clearCuadrantes();
    var clasificaciones =[];


        var rut = $("#rut").val();
        var nombres = $("#nombres").val();
        var paterno = $("#paterno").val();
        var materno = $("#materno").val();
        //selected disabled hidden
        var cargos = $('#cmbCargo').val();
        var tr = $('#cmbCuadrante').val();
        var jefatura = $('#cmbJefatura').val();

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
        jefatura:jefatura,
        identificador:rut,
        nombres:nombres,
        paterno:paterno,
        materno:materno
        //arr:arr,
        //idTalentoOpinante:idTalentoOpinante
    };
    $.ajax({
        async: false,
        type: "GET",
        url: "/Talento/Talento/getColaboradoresClasificados",
        contentType: "application/json; charset=utf-8",
        data: obj,
        dataType: "json", 
        success: function (colaboradores) {
            
           for(var i in colaboradores){
                var Color = colaboradores[i].idTalentoCuadrante;
                
                var idOpinante = colaboradores[i].idOpinante;
                
                
                var nombre = colaboradores[i].nombres+ " " +colaboradores[i].apellidoPaterno+ " " +colaboradores[i].apellidoMaterno;
                var cargo = colaboradores[i].Cargo;
                var rut = colaboradores[i].identificador;
                var foto = colaboradores[i].foto;
                var genero = colaboradores[i].genero;
                var idPersona = colaboradores[i].idPersona;

                var edd = colaboradores[i].edd;

                var trAnterior = colaboradores[i].trAnterior;
                
                if(foto==''){
                    if(genero=="M"){
                        foto="/assets/images/users/maleuser.png"
                    }else{
                        foto="/assets/images/users/femaleuser.png"
                    }
                }
            
                var body = '<li class="task-warning ui-sortable-handle p-0" style="background-color: rgba(255,255,255,0.4); border:1px solid rgba(0,0,0,0.1);" \
                            id="'+cargo+'" name="'+rut+'" value="'+idOpinante+'" edd="'+edd+'">\
                                <div class="row">\
                                    <div class="col-xs-2">\
                                        <a href="/Talento/Talento/fichaTalento?idPersona='+idPersona+'" class="text-muted">\
                                            <img src="'+foto+'" alt="task-user" class="thumb-sm img-circle"> \
                                        </a>    \
                                    </div>\
                                    <div class="col-xs-10">\
                                        <h6>\
                                            <a href="/Talento/Talento/fichaTalento?idPersona='+idPersona+'" class="">\
                                                <span style="width: 100%;white-space: nowrap;overflow: hidden;text-overflow: ellipsis;display: inline-block;">'+nombre+'</span>\
                                                <span style="width: 100%;white-space: nowrap;overflow: hidden;text-overflow: ellipsis;display: inline-block;">'+edd+' - TR Anterior '+trAnterior+'</span>\
                                            </a>\
                                        </h6>\
                                    </div>\
                                </div>\
                            </li>'
                $("."+Color+"").append(body);
           }
        }
    });
}
var clearCuadrantes = function(){
    for(var i in cuadrantes){

        $("#"+cuadrantes[i].idCuadrante).html("");
    }
}
    $(document).ready(function(){
        var cuadrantesId = ""
        for(var i in cuadrantes){
            var end = ", ";
            if(i == cuadrantes.length-1){
                end="";
            }
            cuadrantesId +="#"+cuadrantes[i].idCuadrante+end;
        }
        $(cuadrantesId).sortable({
            connectWith: ".itemCuadrante",
            placeholder: 'task-placeholder',
            forcePlaceholderSize: true,
            update: function (event, ui) {
    
                /*var todo = $("#todo").sortable("toArray"); 
                var inprogress = $("#inprogress").sortable("toArray");
                var completed = $("#completed").sortable("toArray");*/
            }
        }).disableSelection();

        loadCuadrantes();
        $("#btnCancelaJustificacion").click(function(){
            
            loadCuadrantes();
            actualizar();
            $("#justificaModal").modal('hide');
        });
        $("#btnJustifica").click(function(){
            setCuadrante(objCuadrante.idOpinante,objCuadrante.idComponente,$("#txtJustificacion").val());
        });
    });


















$(document).ready(function() {
    $(".select2").select2();
    $("#spinner").hide();
    
    $("#btnBuscar").on('click',function() {
        loadCuadrantes();
        buscar();

        
    });

   
});


function buscar(){

    
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
        var jefatura = $('#cmbJefatura').val();

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
        jefatura:jefatura,
        identificador:rut,
        nombres:nombres,
        paterno:paterno,
        materno:materno
        //arr:arr,
        //idTalentoOpinante:idTalentoOpinante
    };

        
    $.ajax({
        async: false,
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
            
                $("#upcoming").append('<li class="task-warning ui-sortable-handle p-0" style="background-color: rgba(255,255,255,0.4); border:1px solid rgba(0,0,0,0.1);" \
                                        id="'+total[index].cargo+'" name="'+total[index].rut+'" value="'+total[index].procesoOpinante+'">\
                                        <div class="row">\
                                            <div class="col-xs-2"><a href="/Talento/Talento/fichaTalento?idPersona='+total[index].idPersona+'" class="text-muted">\
                                                <img src="'+foto+'" alt="task-user" class="thumb-sm img-circle"> </a>    \
                                            </div>\
                                            <div class="col-xs-10">\
                                                <h6>\
                                            <a href="/Talento/Talento/fichaTalento?idPersona='+total[index].idPersona+'" class="">\
                                                <span style="width: 100%;white-space: nowrap;overflow: hidden;text-overflow: ellipsis;display: inline-block;">'+total[index].Colaborador+' '+total[index].apellidoPaterno+' '+total[index].apellidoMaterno+'</span>\
                                                <span style="width: 100%;white-space: nowrap;overflow: hidden;text-overflow: ellipsis;display: inline-block;">\
                                                '+total[index].edd+' - TR Anterior ' +total[index].trAnterior +'\
                                                </span>\
                                            </a></h6>\
                                            </div>\
                                        </div></li>');
            });
        }//$("."+Color+"").append('<li class="task-warning ui-sortable-handle" style="" id="'+cargo+'" name="'+rut+'"   value="'+idOpinante+'">' +'<input class="" id="clasificaciones" name="clasificaciones" type="hidden" value="'+clasificacionesHidden+'"><p class="m-b-0"><div class="clearfix"></div><div><p class="pull-right">'+atributos+'</p></div><a href="#" class="text-muted"><img src="'+foto+'" alt="task-user" class="thumb-sm img-circle pull-left"> <H6 class="pull-left">'+nombres+' '+apellidoPaterno+' '+apellidoMaterno+'</H6></a> </p></li>');
        },
        error: function(error){
            alert(error.status+"\n "+error.statusText);
        }
    
    });  

}










function actualizar(){

    
    //clasificaciones filtro 
    
    var clasificaciones =[];


        var rut = $("#rut").val();
        var nombres = $("#nombres").val();
        var paterno = $("#paterno").val();
        var materno = $("#materno").val();
        //selected disabled hidden
        var cargos = $('#cmbCargo').val();
        var tr = $('#cmbCuadrante').val();
        var jefatura = $('#cmbJefatura').val();

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
        jefatura:jefatura,
        identificador:rut,
        nombres:nombres,
        paterno:paterno,
        materno:materno
        //arr:arr,
        //idTalentoOpinante:idTalentoOpinante
    };

        
    $.ajax({
        async: false,
        type: "GET",
        url: "/Talento/Talento/filtroDragColaboradoresSinClasificar",
        contentType: "application/json; charset=utf-8",
        data: obj,
        dataType: "json", 
        success: function (total) {

            $('#upcoming').empty();
            
            $.each(total, function(index) {
                var foto = total[index].foto;
                
                if(foto==''){
                    if(total[index].genero=="M"){
                        foto = "/assets/images/users/maleuser.png";
                    }else{
                        foto = "/assets/images/users/femaleuser.png";
                    }
                }
            
                $("#upcoming").append('<li class="task-warning ui-sortable-handle p-0" style="background-color: rgba(255,255,255,0.4); border:1px solid rgba(0,0,0,0.1);" \
                                        id="'+total[index].cargo+'" name="'+total[index].rut+'" value="'+total[index].procesoOpinante+'">\
                                        <div class="row">\
                                            <div class="col-xs-2"><a href="/Talento/Talento/fichaTalento?idPersona='+total[index].idPersona+'" class="text-muted">\
                                                <img src="'+foto+'" alt="task-user" class="thumb-sm img-circle"> </a>    \
                                            </div>\
                                            <div class="col-xs-10">\
                                                <h6>\
                                            <a href="/Talento/Talento/fichaTalento?idPersona='+total[index].idPersona+'" class="">\
                                                <span style="width: 100%;white-space: nowrap;overflow: hidden;text-overflow: ellipsis;display: inline-block;">'+total[index].Colaborador+' '+total[index].apellidoPaterno+' '+total[index].apellidoMaterno+'</span>\
                                                <span style="width: 100%;white-space: nowrap;overflow: hidden;text-overflow: ellipsis;display: inline-block;">\
                                                '+total[index].edd+' - TR Anterior ' +total[index].trAnterior +'\
                                                </span>\
                                            </a></h6>\
                                            </div>\
                                        </div></li>');
            });
        //$("."+Color+"").append('<li class="task-warning ui-sortable-handle" style="" id="'+cargo+'" name="'+rut+'"   value="'+idOpinante+'">' +'<input class="" id="clasificaciones" name="clasificaciones" type="hidden" value="'+clasificacionesHidden+'"><p class="m-b-0"><div class="clearfix"></div><div><p class="pull-right">'+atributos+'</p></div><a href="#" class="text-muted"><img src="'+foto+'" alt="task-user" class="thumb-sm img-circle pull-left"> <H6 class="pull-left">'+nombres+' '+apellidoPaterno+' '+apellidoMaterno+'</H6></a> </p></li>');
        },
        error: function(error){
            alert(error.status+"\n "+error.statusText);
        }
    
    });  

}