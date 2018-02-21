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
            toolbar2:'mybutton',
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
    
});