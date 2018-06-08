
var initTiny = function(){
    /**
     * TODO recibir obj botones y crearlos dinamicamente en seccion setup
     */
   if($("#instruccion").length > 0){
       tinymce.init({
           selector: "textarea#instruccion",
           height: 500,
           theme: "modern",
           plugins: 'print code preview fullpage searchreplace autolink directionality visualblocks visualchars fullscreen image link media template codesample table charmap hr pagebreak nonbreaking anchor insertdatetime advlist lists textcolor wordcount imagetools contextmenu colorpicker textpattern',
           toolbar1: 'formatselect | fontselect | fontsizeselect | bold italic strikethrough forecolor backcolor | link | alignleft aligncenter alignright alignjustify  | numlist bullist outdent indent  | removeformat',
           fontsize_formats: '8pt 10pt 12pt 14pt 18pt 24pt 36pt',
           image_advtab: true,
           images_upload_handler: function (blobInfo, success, failure) {
                   
                       var formData = new FormData();
                       formData.append('file', blobInfo.blob(), blobInfo.filename());
                       $.ajax({
                           type: "POST",
                           url: "http://hrmassets.enovum.cl/Files/File/upload",
                           contentType: "application/json; charset=utf-8",
                           data: formData,
                           processData: false,
                           contentType: false,
                           success: function (msg) {
                              
                               success(msg.location);
                            
                           }
                       }); 
           },
           templates: [
               { title: 'Test template 1', content: 'Test 1' },
               { title: 'Test template 2', content: 'Test 2' }
           ],
           content_css: [
               '//fonts.googleapis.com/css?family=Lato:300,300i,400,400i',
               '//www.tinymce.com/css/codepen.min.css'
           ]
            
            
           });
   }
}



$(document).ready(function () {

    initTiny();

    $("#btnAddProceso").click(function(){

        var nombreProceso = $("#nombreProceso").val();
        var tipoProceso = $("#tipoProceso").val();
        var modeloCompetencias = $("#modeloCompetencias").val();
        var imagen = $("#imagen").val();
        var fechaInicio =$("#fechaInicio").val();
        var fechaTermino = $("#fechaTermino").val();
        var idEstado = $("#idEstado").val();
        var csrf = $('input[name=_csrf]').val();
        var obj = {

            nombreProceso:nombreProceso,
            tipoProceso:tipoProceso,
            modeloCompetencias:modeloCompetencias,
            imagen:imagen,
            fechaInicio:fechaInicio,
            fechaTermino:fechaTermino,
            idEstado:idEstado,
            _csrf:csrf
        };
        
        $.ajax({    
            type: "POST",
            url: "/Administracion/Desempeno/addProceso",
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify(obj),
            dataType: "json", 
            success: function (msg) {
               
                swal({
                    title:'Exito',
                    text:'El Proceso se creó correctamente',
                    type:'success'
                }).then(function(result){
                    window.location = "/Administracion/Desempeno/proceso";
                });
             
            }
        }); 
        
    });

    $("#btnEditarProceso").click(function(){

        var nombreProceso = $("#nombreProceso").val();
        var tipoProceso = $("#tipoProceso").val();
        var modeloCompetencias = $("#modeloCompetencias").val();
        var imagen = $("#imagen").val();
        var fechaInicio =$("#fechaInicio").val();
        var fechaTermino = $("#fechaTermino").val();
        var idEstado = $("#idEstado").val();
        var idProceso = $("#idProceso").val();
        var csrf = $('input[name=_csrf]').val();
        var obj = {

            nombreProceso:nombreProceso,
            tipoProceso:tipoProceso,
            modeloCompetencias:modeloCompetencias,
            imagen:imagen,
            fechaInicio:fechaInicio,
            fechaTermino:fechaTermino,
            idEstado:idEstado,
            idProceso:idProceso,
            _csrf:csrf
        };
        
        $.ajax({    
            type: "POST",
            url: "/Administracion/Desempeno/updProceso",
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify(obj),
            dataType: "json", 
            success: function (msg) {
               
                swal({
                    title:'Exito',
                    text:'El Proceso se editó correctamente',
                    type:'success'
                }).then(function(result){
                    window.location = "/Administracion/Desempeno/fichaproceso?idProceso="+idProceso;
                });
             
            }
        }); 
        
    });

    $("#btnAgregarEtapa").click(function(){

        var idProceso = $("#idProceso").val();
        var nombre = $("#nombre").val();
        var fecha_inicio =$("#fechaInicio").val();
        var fecha_termino = $("#fechaTermino").val();
        var imagen = $("#imagen").val();
        var color = $("#color").val();
        var orden = $("#orden").val();
        var ocultar = $("#ocultar").val();
        var idEstado = $("#idEstado").val();
        var csrf = $('input[name=_csrf]').val();

        var obj = {

            idProceso:idProceso,
            nombre:nombre,
            fecha_inicio:fecha_inicio,
            fecha_termino:fecha_termino,
            imagen:imagen,
            color:color,
            orden:orden,
            ocultar:ocultar,
            idEstado:idEstado,
            _csrf:csrf
        };
        
        $.ajax({    
            type: "POST",
            url: "/Administracion/Desempeno/addEtapa",
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify(obj),
            dataType: "json", 
            success: function (msg) {
               
                swal({
                    title:'Exito',
                    text:'La Etapa se agregó correctamente',
                    type:'success'
                }).then(function(result){
                    window.location = "/Administracion/Desempeno/fichaproceso?idProceso="+idProceso;
                });
             
            }
        }); 
    }); 

    $("#btnEditarEtapa").click(function(){

        var idEtapa = $("#idEtapa").val();
        var idProceso = $("#idProceso").val();
        var nombre = $("#nombre").val();
        var fecha_inicio =$("#fechaInicio").val();
        var fecha_termino = $("#fechaTermino").val();
        var imagen = $("#imagen").val();
        var color = $("#color").val();
        var orden = $("#orden").val();
        var ocultar = $("#ocultar").val();
        var idEstado = $("#idEstado").val();
        var csrf = $('input[name=_csrf]').val();

        var obj = {

            idEtapa:idEtapa,
            idProceso:idProceso,
            nombre:nombre,
            fecha_inicio:fecha_inicio,
            fecha_termino:fecha_termino,
            imagen:imagen,
            color:color,
            orden:orden,
            ocultar:ocultar,
            idEstado:idEstado,
            _csrf:csrf
        };
        
        $.ajax({    
            type: "POST",
            url: "/Administracion/Desempeno/updEtapa",
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify(obj),
            dataType: "json", 
            success: function (msg) {
               
                swal({
                    title:'Exito',
                    text:'La Etapa se editó correctamente',
                    type:'success'
                }).then(function(result){
                    window.location = "/Administracion/Desempeno/fichaetapa?idEtapa="+idEtapa;
                });
             
            }
        }); 
    }); 

    $("#btnAgregarTarea").click(function(){

        var idEtapa = $("#idEtapa").val();
        var idTarea = $("#idTarea").val();
        var nombre = $("#nombre").val();
        var fecha_inicio =$("#fechaInicio").val();
        var fecha_termino = $("#fechaTermino").val();
        var imagen = $("#imagen").val();
        var color = $("#color").val();
        var orden = $("#orden").val();
        var ocultar = $("#ocultar").val();
        var idEstado = $("#idEstado").val();
        var csrf = $('input[name=_csrf]').val();

        var obj = {

            idEtapa:idEtapa,
            idTarea:idTarea,
            nombre:nombre,
            fecha_inicio:fecha_inicio,
            fecha_termino:fecha_termino,
            imagen:imagen,
            color:color,
            orden:orden,
            ocultar:ocultar,
            idEstado:idEstado,
            _csrf:csrf
        };
        
        $.ajax({    
            type: "POST",
            url: "/Administracion/Desempeno/addTarea",
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify(obj),
            dataType: "json", 
            success: function (msg) {
               
                swal({
                    title:'Exito',
                    text:'La Tarea se agregó correctamente',
                    type:'success'
                }).then(function(result){
                    window.location = "/Administracion/Desempeno/fichaetapa?idEtapa="+idEtapa;
                });
             
            }
        }); 
    }); 

    $("#btnEditarTarea").click(function(){

        var idEtapaTarea = $("#idEtapaTarea").val();
        var idEtapa = $("#idEtapa").val();
        var idTarea = $("#idTarea").val();
        var nombre = $("#nombre").val();
        var fecha_inicio =$("#fechaInicio").val();
        var fecha_termino = $("#fechaTermino").val();
        var imagen = $("#imagen").val();
        var color = $("#color").val();
        var orden = $("#orden").val();
        var ocultar = $("#ocultar").val();
        var idEstado = $("#idEstado").val();
        var csrf = $('input[name=_csrf]').val();

        var obj = {

            idEtapaTarea:idEtapaTarea,
            idEtapa:idEtapa,
            idTarea:idTarea,
            nombre:nombre,
            fecha_inicio:fecha_inicio,
            fecha_termino:fecha_termino,
            imagen:imagen,
            color:color,
            orden:orden,
            ocultar:ocultar,
            idEstado:idEstado,
            _csrf:csrf
        };
        
        $.ajax({    
            type: "POST",
            url: "/Administracion/Desempeno/updTarea",
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify(obj),
            dataType: "json", 
            success: function (msg) {
               
                swal({
                    title:'Exito',
                    text:'La Tarea se editó correctamente',
                    type:'success'
                }).then(function(result){
                    window.location = "/Administracion/Desempeno/fichaTarea?idEtapaTarea="+idEtapaTarea;
                });
             
            }
        }); 
    });

    $("#btnAgregarAccion").click(function(){

        var idEtapaTarea = $("#idEtapaTarea").val();
        var idAccion = $("#idAccion").val();
        var idActor = $("#idActor").val();
        var instruccion = $("#instruccion").val();
        var esFin =$("#esFin").val();
        var orden = $("#orden").val();
        var idEstado = $("#idEstado").val();
        var csrf = $('input[name=_csrf]').val();

        var obj = {

            idEtapaTarea:idEtapaTarea,
            idAccion:idAccion,
            idActor:idActor,
            instruccion:instruccion,
            esFin:esFin,
            orden:orden,
            idEstado:idEstado,
            _csrf:csrf
        };
        
        $.ajax({    
            type: "POST",
            url: "/Administracion/Desempeno/addAccionTarea",
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify(obj),
            dataType: "json", 
            success: function (msg) {
               
                swal({
                    title:'Exito',
                    text:'La Acción se agregó correctamente',
                    type:'success'
                }).then(function(result){
                    window.location = "/Administracion/Desempeno/fichaTarea?idEtapaTarea="+idEtapaTarea;
                });
             
            }
        }); 
    }); 

    $("#btnEditarAccion").click(function(){

        var idAccionTarea = $("#idAccionTarea").val();
        var idEtapaTarea = $("#idEtapaTarea").val();
        var idAccion = $("#idAccion").val();
        var idActor = $("#idActor").val();
        var instruccion = tinyMCE.activeEditor.getContent();
        var esFin =$("#esFin").val();
        var orden = $("#orden").val();
        var idEstado = $("#idEstado").val();
        var csrf = $('input[name=_csrf]').val();

        var obj = {

            idAccionTarea:idAccionTarea,
            idEtapaTarea:idEtapaTarea,
            idAccion:idAccion,
            idActor:idActor,
            instruccion:instruccion,
            esFin:esFin,
            orden:orden,
            idEstado:idEstado,
            _csrf:csrf
        };
        
        $.ajax({    
            type: "POST",
            url: "/Administracion/Desempeno/updAccionTarea",
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify(obj),
            dataType: "json", 
            success: function (msg) {
               
                swal({
                    title:'Exito',
                    text:'La Acción se editó correctamente',
                    type:'success'
                }).then(function(result){
                    window.location = "/Administracion/Desempeno/fichaTarea?idEtapaTarea="+idEtapaTarea;
                });
             
            }
        }); 
    }); 


});

