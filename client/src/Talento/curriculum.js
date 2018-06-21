import _ from 'lodash';

  $(document).ready(function(){
    
    //$('form').parsley();

    $(".curriculum_btn_guardar").click(function() {
        var id = $( this ).attr('id');
        
        addCurriculumPersona($("#txtTitulo_"+id).val()
                            ,$("#txtBajada_"+id).val()
                            ,$("#txtFechaDesde_"+id).val()
                            ,$("#txtFechaHasta_"+id).val()
                            ,$("#txtDescripcion_"+id).val()
                            ,id
                            ,$("#idPersonaFicha").val());
        
        $("#txtTitulo_"+id).val("")
        $("#txtBajada_"+id).val("")
        $("#txtFechaDesde_"+id).val("")
        $("#txtFechaHasta_"+id).val("")
        $("#txtDescripcion_"+id).val("")

        $(".modal").modal('hide');

          swal({
            title:'Guardado',
            text:'Datos guardados correctamente.',
            type:'success'
        }).then(function(result){
            window.location.reload();
        });


    });

    
    var addCurriculumPersona = function(titulo, bajada, desde, hasta, descripcion, idPersonaCurriculumCategoria, idPersonaFicha){
        
        console.log("addCurriculumPersona " + "titulo: " + titulo
                        + " bajada: " + bajada
                        + " desde: " + desde
                        + " hasta: " + hasta
                        + " descripcion: " + descripcion
                        + " idPersonaCurriculumCategoria: " + idPersonaCurriculumCategoria
                        + " idPersonaFicha: " + idPersonaFicha);
        var obj = { 
            titulo:titulo,
            bajada:bajada,
            desde:desde,
            hasta:hasta,//"2010-01-01",
            descripcion:descripcion,
            idPersonaFicha:idPersonaFicha,
            idPersonaCurriculumCategoria:idPersonaCurriculumCategoria
         };
        
        $.ajax({
            type: "GET",
            url: "/Talento/Talento/addCurriculumPersona",
            contentType: "application/json; charset=utf-8",
            data: obj,
            dataType: "json", 
            success: function (msg) {
            
            },
            error: function(XMLHttpRequest, textStatus, errorThrown) { 
                //alert("Status: " + textStatus); alert("Error: " + errorThrown); 
            }  
        });
    };
  });