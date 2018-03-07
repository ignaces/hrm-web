$(document).ready(function(){
   $("#btnSiguiente").click(function(){
    var activa;
    
   
    
    $(".paginaActiva").each(function(i,obj){
        activa=obj;
    });
    checked = false;
    $(".paginaActiva").find(".pr_pregunta").each(function (index) {
        
        console.log("ss")
        var idPregunta = $(this).prop('id');
        checked=false;
        $("input[name='rd_"+idPregunta+"']").each(function () {
            
            if ($(this).prop('checked')) {
               
                checked = true;
                
            }
           
        });
        
        
    });
    if (!checked) {
        
        swal(
            'No has terminado',
            'Debes responder todas las preguntas antes de poder continuar.',
            'warning'
        );
        return false;
    }
    $("#btnAnterior").show();
    var hActivo = $(".headerActivo").eq(0);
    var dimension = hActivo.attr('id').split("_")[1];
    
   // $(".paginaActiva").transition({ y: '-40000px' },10000,'ease');
   
       $(".pagina").each(function(i,obj){
            if(obj==activa){
                var domElement = $(".pagina").eq(i+1);
                $(".paginaActiva").hide();
                $(".paginaActiva").removeClass('paginaActiva');
               var dimensionNew = domElement.attr('id').split("_")[1];
               if(dimension!=dimensionNew){
                   hActivo.hide();
                   hActivo.removeClass('headerActivo');
                   $("#H_"+dimensionNew).addClass('headerActivo');
                   $("#H_"+dimensionNew).show();
               }
               domElement.show();
               domElement.addClass('paginaActiva');
              // domElement.transition({ y: '0px' },10000,'ease');
              if($(".pagina").length-1==i+1){
                $("#btnSiguiente").hide();
                $("#instrumento_btn_finalizar").show();
              }
               return;
            }
       });
       window.scrollTo(0, 0);
   });

$("#btnAnterior").click(function(){
    $("#btnSiguiente").show();
    var activa;
    $(".paginaActiva").each(function(i,obj){
        activa=obj;
   });
   var hActivo = $(".headerActivo").eq(0);
    var dimension = hActivo.attr('id').split("_")[1];
   // $(".paginaActiva").transition({ y: '-40000px' });
       $(".pagina").each(function(i,obj){
            if(obj==activa){
                var domElement = $(".pagina").eq(i-1);
                $(".paginaActiva").hide();
                 $(".paginaActiva").removeClass('paginaActiva');
                 var dimensionNew = domElement.attr('id').split("_")[1];
                    if(dimension!=dimensionNew){
                        hActivo.hide();
                        hActivo.removeClass('headerActivo');
                        $("#H_"+dimensionNew).addClass('headerActivo');
                        $("#H_"+dimensionNew).show();
                    }
                 domElement.addClass('paginaActiva');
                 domElement.show();
                 if(i-1<1){
                    $("#btnAnterior").hide();
                 }
       
     //          domElement.transition({ y: '0px' });
               return;
            }
       });
       window.scrollTo(0, 0);
   });
});