
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
    $.ajax({
        type: "GET",
        url: "/Talento/Talento/getColaboradoresClasidicados",
        contentType: "application/json; charset=utf-8",
        data: {},
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
                                                <span style="width: 100%;white-space: nowrap;overflow: hidden;text-overflow: ellipsis;display: inline-block;">'+edd+'</span>\
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
            $("#justificaModal").modal('hide');
            
            loadCuadrantes();
        });
        $("#btnJustifica").click(function(){
            setCuadrante(objCuadrante.idOpinante,objCuadrante.idComponente,$("#txtJustificacion").val());
        });
    });


