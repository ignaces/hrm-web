var getNotificaciones  = function(){
    var obj={};
    $.ajax({
        type: "GET",
        url: "/Mail/Notificaciones/getNotificaciones",
        contentType: "application/json; charset=utf-8",
        data: obj,
        dataType: "json", 
        success: function (msg) {
           
           $('#tbl_notificaciones').dataTable( {
                data : msg.notificaciones,
                fixedColumns: true,
                columnDefs: [
                    { "title": "Cliente", "targets": 0 },
                    { "title": "Notificación", "targets": 1 },
                    { "title": "Asunto", "targets": 2 },
                    { "title": "Mascara", "targets": 3 },
                    { "title": "Tag", "targets": 4 },
                    { "title": "Acciones", "targets": 5 ,"width":"20%"}
                ],
                columns: [
                    {data : "nombre"},
                    {data : "nombreNotificacion"},
                    {data : "subject"}  ,
                    {data : "mask"}  ,
                    {data : "tag"},   
                    {data : "id",
                    render: function ( data, type, full, meta ) {// '<a href="/Mail/Notificaciones/edit?idNotificacion='+data+'">Ver</a>';
                            
                            var ver ='<a href="/Mail/Notificaciones/edit?idNotificacion='+data+'" class="btn btn-icon waves-effect waves-light btn-purple" data-toggle="tooltip" data-placement="top" title data-original-title="Ver"> <i class="fa fa-envelope-o"></i> </a>&nbsp;';
                            var rebotados = '<a href="/Mail/Mailgun/statsDownload?tag='+full.tag+'&event=failed" class="btn btn-icon waves-effect waves-light btn-purple" data-toggle="tooltip" data-placement="top" title data-original-title="Rebotados"> <i class="fa fa-meh-o"></i></a>&nbsp;';
                            var estados = '<a href="/Mail/Mailgun/statsDownload?tag='+full.tag+'" class="btn btn-icon waves-effect waves-light btn-purple" data-toggle="tooltip" data-placement="top" title data-original-title="Todos los estados"> <i class="fa fa-share-alt"></i></a>';
                            
                            return ver +  rebotados +estados;
                        }
                    }     
                    ],
                });
                $.fn.tooltip && $('[data-toggle="tooltip"]').tooltip()

        }
    });   
}
$(document).ready(function(){
    getNotificaciones();
});

