/**
 * Configuracion de tinymci para notificaciones y upload de imagenes
 */

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
                    var xhr, formData;
                        xhr = new XMLHttpRequest();
                        xhr.withCredentials = false;
                        xhr.open('POST', 'http://localhost:3333/Files/File/upload');
                        xhr.onload = function() {
                        var json;

                        if (xhr.status != 200) {
                            failure('HTTP Error: ' + xhr.status);
                            return;
                        }
                        json = JSON.parse(xhr.responseText);

                        if (!json || typeof json.location != 'string') {
                            failure('Invalid JSON: ' + xhr.responseText);
                            return;
                        }
                        success(json.location);
                        };
                        formData = new FormData();
                        formData.append('file', blobInfo.blob(), blobInfo.filename());
                        xhr.send(formData);
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
                                    { text: 'RUT', value: '#{RutPersona}' },
                                    { text: 'Nombre', value: '#{Nombres}' },
                                    { text: 'Apellido Paterno', value: '#{ApellidoPaterno}' },
                                    { text: 'Apellido Materno', value: '#{ApellidoMaterno}' }
                                ],
                                onPostRender: function () {
                                    this.value('&nbsp;<em>Some italic text!</em>');
                                }
                });
            }
            });
    }
 }
$(document).ready(function () {

    /**
     * TODO llamar api que entregue lista de campos posibles y ejecutar initTyny(campos)
     * 
     */
    initTiny();

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
               
                alert(msg);
             
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