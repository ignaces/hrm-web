import _ from 'lodash';

  $(document).ready(function(){

    $("#modalMensaje").show();

    var condicion = $("#condicion").val();
  if(condicion == 0)
  {
    $("#condition").hide();
  }
  else
  {
    $("#condition").show();
  }

    
  });   
 