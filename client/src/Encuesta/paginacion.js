$(document).ready(function(){
   $("#btnSiguiente").click(function(){
    var activa;
    $("#btnAnterior").show();
    $(".paginaActiva").each(function(i,obj){
        activa=obj;
   });
   // $(".paginaActiva").transition({ y: '-40000px' },10000,'ease');
   
       $(".pagina").each(function(i,obj){
            if(obj==activa){
                var domElement = $(".pagina").eq(i+1);
                $(".paginaActiva").hide();
                $(".paginaActiva").removeClass('paginaActiva');
               domElement.show();
               domElement.addClass('paginaActiva');
              // domElement.transition({ y: '0px' },10000,'ease');
              if($(".pagina").length-1==i+1){
                $("#btnSiguiente").hide();
              }
               return;
            }
       });
   });

   $("#btnAnterior").click(function(){
    $("#btnSiguiente").show();
    var activa;
    $(".paginaActiva").each(function(i,obj){
        activa=obj;
   });
   // $(".paginaActiva").transition({ y: '-40000px' });
       $(".pagina").each(function(i,obj){
            if(obj==activa){
                var domElement = $(".pagina").eq(i-1);
                $(".paginaActiva").hide();
                 $(".paginaActiva").removeClass('paginaActiva');
                 domElement.addClass('paginaActiva');
                 domElement.show();
                 if(i-1<1){
                    $("#btnAnterior").hide();
                 }
       
     //          domElement.transition({ y: '0px' });
               return;
            }
       });
   });
});