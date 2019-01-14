$("#btnGrabarFinalizar").click(function(){
    
    var presencial=false;
    if($("#chkPresencial").is(':checked')){
        presencial=true;

        $("#modalAccion").modal("show");
    }
    
}); 

$("#btnsaveFeedback").click(function(){
    $("#modalAccion").modal("hide");
});
