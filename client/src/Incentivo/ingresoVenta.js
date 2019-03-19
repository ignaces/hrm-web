var submarca = "";
var envase = "";
var idproducto = 0;


$( document ).ready(function() {


$("#btnGuardarVenta").click(function()
{
    if($(".idProducto") && $(".idProducto").length > 0 )
    {
        var obj = {};

        var arr = [];

        $(".idProducto").each(function(){
            idProducto = $(this).attr("id");

            obj = {
                "valor": 0,
                "cantidad": $("#idCantProd_"+idProducto).val(),
                "precioUnitario": $("#idPrecioProdUn_"+idProducto).val(),
                "fotoSku": '',
                "idProducto": idProducto
            };

            arr.push(obj);
        });

        var objForm = {};

        var lat = "";
        var lon = "";
        var idCliente = $("#idCliente").val();
        var identificadorCliente = $("#rutCliente").val();
        var nombreCliente = $("#nombreCliente").val();
        var apellidoCliente = $("#apellidoCliente").val();
        var emailCliente = $("#emailCliente").val();
        var telefonoCliente = $("#telefonoCliente").val();
        var productos = JSON.stringify(arr);

        objForm = {
            "lat": lat,
            "lon": lon,
            "idCliente": idCliente,
            "identificadorCliente": identificadorCliente,
            "nombreCliente": nombreCliente,
            "apellidoCliente": apellidoCliente,
            "emailCliente": emailCliente,
            "telefonoCliente": telefonoCliente,
            "productos": productos
            //"productos": ""
            ,"_csrf": $("#_csrf").val()
        };

        //console.log(productos);


        $.ajax({
                url: '/Incentivo/Proceso/addVenta',
                type: "POST",
                data: objForm,
                dataType: "json",
                success: function (data) {
                    //swal("Venta Finalizada", "Tu venta se ha guardado correctamente", "success");

                    swal({
                        title: 'Venta Finalizada',
                        text: 'Venta guardada correctamente',
                        type: 'success',
                        confirmButtonText: 'Aceptar',
                    }).then( function(result) {
                        location.href = "/Incentivo/Proceso/colaboradores";
                    });

                    //location.reload();
                },
                error: function(e){
                    console.log(e);
                }
        });
        //console.log(arr);
    }
    else
    {
        swal("Advertencia", "Debes ingresar al menos un producto para poder guardar la venta.", "error");
        return false;
    }
});

$("#btnBuscarProducto").click(function(){
    //console.log($("#codigo_producto").val());

    var obj = {
        idProducto:  $("#codigo_producto").val(),
        nombre: $("#txtNombreProducto").val(),
        marca: $("#txtMarcaProducto").val()
    }

    $.ajax({
        url: '/Incentivo/Proceso/getProductoPos',
        type: "GET",
        data: obj,
        dataType: "json",
        success: function (data) {

            if(data.length == 0)
            {

                swal("Advertencia", "Producto no existe", "error");

                submarca = "";
                envase = "";
                idproducto = 0;
            }
            else
            {
                cProductos.productos = data;
                $("#modalProductos").modal("show");
            }



                $("#caja_productos").show();


                if($("#prod_"+idproducto))
                {
                    //  $("#valor_precio").val($("#idPrecioProdUn_"+idproducto).val());
                }

        }
    });
});

$("#agregar_producto").click(function(){

    if($("#valor_cantidad").val()==0 || $("#valor_cantidad").val() == "" || $("#valor_cantidad").val().lengtg == 0)
    {
        swal("Advertencia", "Debes ingresar una cantidad válida.", "error");
        return false;
    }

    if($("#valor_precio").val()==0 || $("#valor_precio").val() == "" || $("#valor_precio").val().lengtg == 0)
    {
        swal("Advertencia", "Debes ingresar un precio válido", "error");
        return false;
    }

    $("#fila_inicial").hide();

    $("#tr_total").remove();

    var cont = "";
    var n_invoice = 1;

    $(".productos_ingresados").each(function(){
        n_invoice++;
    });

    var existeInvoice = 0;

    $(".idProducto").each(function(){
        //console.log($(this).attr("id"));
        if($("#id_producto").val() == $(this).attr("id"))
        {
            existeInvoice = $("#id_producto").val();
        }
    });

    var cuentaProds = 0;
    var sumaPrecios = 0;

    if(existeInvoice == 0)
    {
        cuentaProds = $("#valor_cantidad").val();
        sumaPrecios = $("#valor_precio").val()*$("#valor_cantidad").val();

        var idProdStr = '"'+$("#id_producto").val()+'"';

        cont = "<tr class='productos_ingresados ' id='prod_"+$("#id_producto").val()+"'>";
        cont = cont + "<td><p class='nInvoice'>"+n_invoice+"</p> <input type='hidden' class='idProducto' id='"+$("#id_producto").val()+"' value='"+$("#id_producto").val()+"'> </td>";
        cont = cont + "<td>"+$("#valor_submarca").val()+" "+$("#valor_envase").val()+"</td>";
        cont = cont + "<td align='right'><input type='hidden' class='cantidadProd prod_"+$("#id_producto").val()+"' id='idCantProd_"+$("#id_producto").val()+"' value='"+$("#valor_cantidad").val()+"'><p id='txtCant_"+$("#id_producto").val()+"'>"+$("#valor_cantidad").val()+"</p></td>";
        cont = cont + "<td align='right'><input type='hidden' class='precioProdUn prod_"+$("#id_producto").val()+"' id='idPrecioProdUn_"+$("#id_producto").val()+"' value='"+$("#valor_precio").val()+"'> <input type='hidden' class='precioProd' id='idSumPrecios_"+$("#id_producto").val()+"' value='"+$("#valor_precio").val()*$("#valor_cantidad").val()+"'><p id='txtPrecio_"+$("#id_producto").val()+"'>$"+Math.round(sumaPrecios)+"</p></td>";
        cont = cont + "<td align='center' valign='middle' class='remProd' id='rem_prod_"+$("#id_producto").val()+"' style='cursor: pointer;'><i idProducto='"+idProdStr+"' class='fa fa-trash deleteProducto'></i></td>";

        cont = cont + "</tr>";

    }
    else{
        var cuentaProdsAct = parseInt($("#idCantProd_"+existeInvoice).val())+parseInt($("#valor_cantidad").val());
        var sumaPreciosAct = parseInt($("#idSumPrecios_"+existeInvoice).val())+parseInt(parseInt($("#valor_precio").val())*parseInt($("#valor_cantidad").val()));

        $("#idPrecioProdUn_"+existeInvoice).val($("#valor_precio").val());

        $("#idCantProd_"+existeInvoice).val(cuentaProdsAct);
        $("#idSumPrecios_"+existeInvoice).val(sumaPreciosAct);

        $("#txtCant_"+existeInvoice).html(cuentaProdsAct);
        $("#txtPrecio_"+existeInvoice).html("$"+sumaPreciosAct);

    }

    $(".cantidadProd").each(function(){
        cuentaProds = parseInt(cuentaProds) + parseInt($(this).val());
    });

    $(".precioProd").each(function(){
        sumaPrecios = parseInt(sumaPrecios) + parseInt($(this).val());
    });

    cont = cont + "<tr id='tr_total'>";
    cont = cont + "<td colspan='2' align='right' valign='middle'>Total:</td>";
    cont = cont + "<td align='right' valign='middle'>"+cuentaProds+"</td>";
    cont = cont + "<td align='right' valign='middle'>$"+sumaPrecios+"</td>";
    cont = cont + "<td align='right' valign='middle'></td>";

    cont = cont + "</tr>";

    $("#tabla_invoice").append(cont);
    $("#valor_submarca").val("");
    $("#valor_envase").val("");
    $("#valor_idproducto").val("");
    $("#valor_cantidad").val("");
    $("#valor_precio").val("");
    $("#codigo_producto").val("");
    $("#datos_producto").hide();
});


$("#btn_camara").click(function(){

    startScanner();
    $("#modal-camara").modal("show");


});


$(".deleteProducto").click(function(){
    console.log("remoce");
    var id = $(this).attr("idProducto");
    $("#prod_"+id).remove();
    //alert($(".productos_ingresados").length);
    $("#tr_total").remove();

    var cuentaProds = 0;
    var sumaPrecios = 0;

    if($(".productos_ingresados").length > 0)
    {
        $(".cantidadProd").each(function(){
            cuentaProds = parseInt(cuentaProds) + parseInt($(this).val());
        });

        $(".precioProd").each(function(){
            sumaPrecios = parseInt(sumaPrecios) + parseInt($(this).val());
        });

        var cont =  "<tr id='tr_total'>";
        cont = cont + "<td colspan='2' align='right' valign='middle'>Total:</td>";
        cont = cont + "<td align='right' valign='middle'>"+cuentaProds+"</td>";
        cont = cont + "<td align='right' valign='middle'>$"+sumaPrecios+"</td>";
        cont = cont + "<td align='right' valign='middle'></td>";

        cont = cont + "</tr>";

        $("#tabla_invoice").append(cont);

        var n_invoice = 1;

        $(".nInvoice").each(function(){
            $(this).html(n_invoice);
            n_invoice++;
        });
    }
    else
    {
        $("#fila_inicial").show();
    }
});


});

var startScanner = function(){
    var scanner = new Instascan.Scanner({ video: document.getElementById('scanner-container') });
        scanner.addListener('scan', function (content) {
                $("#modal-camara").modal("hide");
                $("#codigo_producto").val(content);
                $("#buscar_producto").trigger("click");
        });
        Instascan.Camera.getCameras().then(function (cameras) {
            if (cameras.length > 0) {
                if(cameras.length>1){
                        scanner.start(cameras[1]);
                }else{
                    scanner.start(cameras[0]);
                }

            } else {
            console.error('No cameras found.');
            }
        }).catch(function (e) {
            console.error(e);
        });
}





var cProductos = new Vue({
    el: '#app',
    data: {
      productos:[{"nombre":"test"}]
    },
    methods: {
        selectProducto: function(producto){
          cFichaProducto.producto = producto;
               $("#modalProductos").modal("hide");
      }
    }
});

var cFichaProducto = new Vue({
    el: '#fichaProducto',
    data: {
      producto:null
    }
});
