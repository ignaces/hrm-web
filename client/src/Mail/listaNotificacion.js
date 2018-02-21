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
            columnDefs: [
                { "title": "Cliente", "targets": 0 },
                { "title": "Notificación", "targets": 1 },
                { "title": "Asunto", "targets": 2 },
                { "title": "Mascara", "targets": 3 },
                { "title": "Tag", "targets": 4 }
              ],
            columns: [
                {data : "nombre"},
                {data : "nombreNotificacion"},
                {data : "subject"}  ,
                {data : "mask"}  ,
                {data : "tag"},   
                {data : "id",
                render: function ( data, type, full, meta ) {
                        return '<a href="/Mail/Notificaciones/edit?idNotificacion='+data+'">Ver</a>';
                    }
                }       
            ],
        });
        }
    });   
}
$(document).ready(function(){
    getNotificaciones();
});

