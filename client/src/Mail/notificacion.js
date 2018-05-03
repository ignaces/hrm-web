/**
 * Configuracion de tinymci para notificaciones y upload de imagenes
 */
// Variable to store your files
var files;
 
// Grab the files and set them to our variable
 var prepareUpload =function(event)
 {
     files = event.target.files;
 }
 var uploadFile = function()
{
  

    //  START A LOADING SPINNER HERE

    // Create a formdata object and add the files
    var data = new FormData();
    $.each(files, function(key, value)
    {
        
        data.append("file", value,value.name);
    });
    data.append("_csrf",$('input[name=_csrf]').val());
    data.append("idNotificacion",$('#idNotificacion').val());
    
    $.ajax({
        url: '/Mail/Notificaciones/loadFile',
        type: 'POST',
        contentType: "application/json; charset=utf-8",
        data: data,
        processData: false,
        contentType: false,
        success: function(data, textStatus, jqXHR)
        {
            
            if(typeof data.error === 'undefined')
            {
                // Success so call function to process the form
                swal({
                    title:'Exito',
                    text:'Notificaciónes enviadas.',
                    type:'success'
                })
            }
            else
            {
                // Handle errors here
                showErrors(data.error);
            }
        },
        error: function(jqXHR, textStatus, errorThrown)
        {
            // Handle errors here
            console.log('ERRORS: ' + textStatus);
            // STOP LOADING SPINNER
        }
    });
}
 var initTiny = function(){
     /**
      * TODO recibir obj botones y crearlos dinamicamente en seccion setup
      */
    if($("#notificacion_body").length > 0){
        tinymce.init({
            selector: "textarea#notificacion_body",
            height: 500,
            theme: "modern",
            plugins: 'print code preview fullpage searchreplace autolink directionality visualblocks visualchars fullscreen image link media template codesample table charmap hr pagebreak nonbreaking anchor insertdatetime advlist lists textcolor wordcount imagetools contextmenu colorpicker textpattern',
            toolbar1: 'formatselect | fontselect | fontsizeselect | bold italic strikethrough forecolor backcolor | link | alignleft aligncenter alignright alignjustify  | numlist bullist outdent indent  | removeformat',
            toolbar2:'listPersona',
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
            ],
             setup: function (editor) {
                editor.addButton('listPersona', {
                                type: 'listbox',
                                text: 'Persona',
                                icon: false,
                                onselect: function (e) {
                                    editor.insertContent(this.value());
                                },
                                values: [
                                    { text: 'Identificador', value: '#{Identificador}' },
                                    { text: 'Nombre', value: '#{Nombres}' },
                                    { text: 'Apellido Paterno', value: '#{ApellidoPaterno}' },
                                    { text: 'Apellido Materno', value: '#{ApellidoMaterno}' },
                                    { text: 'Contraseña', value: '#{Password}' },
                                    { text: 'Usuario', value: '#{UserName}' }
                                ],
                                onPostRender: function () {
                                    this.value('&nbsp;<em>Some italic text!</em>');
                                }
                });
            }
            });
    }
 }
 var showErrors = function(errors){
    var correos="<ul>"; 

    for(var error in errors){
        correos +="<li>'"+errors[error].email+"'</li>";
     }
     correos +="</ul>";
     swal({
        title:'Error',
        text:'Los siguientes correos presentan problemas por favor corrigelos y vuelve a intentar <br>'+ correos,
        type:'error'
    })
 }
$(document).ready(function () {

    /**
     * TODO llamar api que entregue lista de campos posibles y ejecutar initTyny(campos)
     * 
     */
    initTiny();
    $(":file").filestyle({input: false});

    $("#btnUpload").click(function(){
        uploadFile();
    });
    // Add events
    $('#fExcel').on('change', prepareUpload);

   
    $("#btnSend").click(function(){
        var tag = $("#tag").val();
        var to = $("#emailTo").val();
        var subject = $("#subject").val();
        var csrf = $('input[name=_csrf]').val();
        var body= tinyMCE.activeEditor.getContent();
        var obj = {
            tag:tag,
            to:to,
            subject:subject,
            body:body,
            _csrf:csrf
        };
        $.ajax({
            type: "POST",
            url: "/Mail/Mailgun/sendEmail",
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify(obj),
            dataType: "json", 
            success: function (msg) {
               
                swal({
                    title:'Exito',
                    text:'Notificación de prueba enviada correctamente.',
                    type:'success'
                });
             
            }
        }); 
    });

    $("#btnSave").click(function(){
        var tag = $("#tag").val();
        var to = $("#emailTo").val();
        var subject = $("#subject").val();
        var mask = $("#mask").val();
        var idNotificacion = $('#idNotificacion').val();
        var nombre = $("#nombre").val();
        var csrf = $('input[name=_csrf]').val();
        var body= tinyMCE.activeEditor.getContent();
        var cliente = $("#idCliente").val();
        
        var obj = {
            tag:tag,
            to:to,
            subject:subject,
            body:body,
            _csrf:csrf,
            mask:mask,
            idNotificacion:idNotificacion,
            idCliente:cliente,
            nombre:nombre
        };
        
        $.ajax({
            type: "POST",
            url: "/Mail/Notificaciones/saveNotificacion",
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify(obj),
            dataType: "json", 
            success: function (msg) {
               
                swal({
                    title:'Exito',
                    text:'Notificación guardada correctamente.',
                    type:'success'
                });
             
            }
        }); 
    });

    $("#btnCreate").click(function(){
        var tag = $("#tag").val();
        var to = $("#emailTo").val();
        var subject = $("#subject").val();
        var mask = $("#mask").val();
        var cliente = $("#idCliente").val();
        var nombre = $("#nombre").val();
        var csrf = $('input[name=_csrf]').val();
        var body= tinyMCE.activeEditor.getContent();
        var obj = {
            tag:tag,
            to:to,
            subject:subject,
            body:body,
            _csrf:csrf,
            mask:mask,
            idCliente:cliente,
            nombre:nombre
        };
        $.ajax({
            type: "POST",
            url: "/Mail/Notificaciones/addNotificacion",
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify(obj),
            dataType: "json", 
            success: function (msg) {
               
                swal({
                    title:'Exito',
                    text:'Notificación creada correctamente.',
                    type:'success'
                }).then(function(result){
                    window.location = "/Mail/Notificaciones/list";
                });
             
            }
        }); 
    });
    
});