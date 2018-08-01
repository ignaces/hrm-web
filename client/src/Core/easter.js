
function handleKeyDown(e) {
    var ctrlPressed=0;
    var altPressed=0;
    var shiftPressed=0;
   
    var evt = (e==null ? event:e);
   
    shiftPressed=evt.shiftKey;
    altPressed  =evt.altKey;
    ctrlPressed =evt.ctrlKey;
    self.status=""
       +  "shiftKey="+shiftPressed 
       +", altKey="  +altPressed 
       +", ctrlKey=" +ctrlPressed 
   
    if (shiftPressed && altPressed && ctrlPressed && evt.keyCode==80) {
        loadEaster();
    }
    if (shiftPressed && altPressed && ctrlPressed && evt.keyCode==68) {
        loadDoom();
    }
      
      
    return true;
}

function loadEaster(){
    var modal = '<div class="modal fade" tabindex="-1" id="easterModal" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true" style="display: none;">\
        <div class="modal-dialog  modal-full" style="height:100%;">\
            <div class="modal-content">\
            <button type="button" class="close" id="btnCloseEaster" data-dismiss="modal"  aria-hidden="true">×</button>\
                <div class="modal-body modal-easter">\
                </div>\
            </div><!-- /.modal-content -->\
        </div><!-- /.modal-dialog -->\
        </div><!-- /.modal -->';
        
        if($("#easterModal")!=undefined){
            $( "body" ).append(modal);
            $('#easterModal').modal('show').find('.modal-body').load("/assets/plugins/pacman");
        }else{
            $('#easterModal').modal('show');
            resumeGame();
        }
        
        
        $('#btnCloseEaster').click(function(){
            
            pauseGame();
        });

}
function loadDoom(){
    window.open("/assets/plugins/doom",'_blank');
        

}

document.onkeydown = handleKeyDown;

