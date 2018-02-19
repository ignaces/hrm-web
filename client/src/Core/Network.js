var status = function (){
    var obj={}
    $.ajax({
         type: "GET",
         url: "/Core/Network/getStatus",
         contentType: "application/json; charset=utf-8",
         data: obj,
         dataType: "json", 
         success: function (msg) {
            console.log(msg)
         }
     });   
}
$(document).ready(function(){

    status();
    

    $("#btnConectar").click(function(){
        
        var spinner= '<div class=\"sk-cube-grid\"><div class=\"sk-cube sk-cube1\"></div><div class=\"sk-cube sk-cube2\"></div><div class=\"sk-cube sk-cube3\"></div><div class=\"sk-cube sk-cube4\"></div><div class=\"sk-cube sk-cube5\"></div><div class=\"sk-cube sk-cube6\"></div><div class=\"sk-cube sk-cube7\"></div><div class=\"sk-cube sk-cube8\"></div><div class=\"sk-cube sk-cube9\"></div></div>';
         swal({
                title: 'Conectandose a '+ $("#ssid").val(),
                html:spinner,
                showCloseButton: false,
                showCancelButton: false,
                showConfirmButton:false
                
                
            })
        var obj = {
                ssid:$("#ssid").val(),
                password:$("#password").val()
            }
       $.ajax({
            type: "GET",
            url: "/Core/Network/connect",
            contentType: "application/json; charset=utf-8",
            data: obj,
            dataType: "json", 
            success: function (msg) {
                if(msg=="OK"){
                    swal.close();

                }else{
                    swal(
                {
                    title: 'Error',
                    text: 'No se pudo conectar a la red '+$("#ssid").val(),
                    type: 'error',
                    confirmButtonColor: '#4fa7f3'
                }
            )
                }
            }
        });
    });
     $("#btnScan").click(function(){
        var spinner= '<div class=\"sk-cube-grid\"><div class=\"sk-cube sk-cube1\"></div><div class=\"sk-cube sk-cube2\"></div><div class=\"sk-cube sk-cube3\"></div><div class=\"sk-cube sk-cube4\"></div><div class=\"sk-cube sk-cube5\"></div><div class=\"sk-cube sk-cube6\"></div><div class=\"sk-cube sk-cube7\"></div><div class=\"sk-cube sk-cube8\"></div><div class=\"sk-cube sk-cube9\"></div></div>';
         swal({
                title: 'Refrescando lista de redes WiFi',
                html:spinner,
                showCloseButton: false,
                showCancelButton: false,
                showConfirmButton:false
                
                
            })
        var obj={}
       $.ajax({
            type: "GET",
            url: "/Core/Network/scan",
            contentType: "application/json; charset=utf-8",
            data: obj,
            dataType: "json", 
            success: function (msg) {
                $("#ssid").empty();
                for(var r in msg.redes)
                
                $("#ssid").append( $("<option>")
                    .val(msg.redes[r].ssid)
                    .html(msg.redes[r].ssid)
                );
                swal.close();
            }
        });
    });
});