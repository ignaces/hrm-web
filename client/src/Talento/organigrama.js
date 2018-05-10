

var cargaOrganigrama = function (organigrama){

    var source = [];
    var custom = {};
    var peopleElement = document.getElementById("people");
    var badges = "<i class='fa fa-plane fa-2x m-r-5 text-red'></i>\
                    <i class='fa fa-refresh fa-2x m-r-5 text-primary'></i>\
                    <i class='fa fa-warning fa-2x m-r-5 text-warning'></i>\
                    <i class='fa fa-star fa-2x m-r-5 text-success'></i>";
    for(var posicion in organigrama){
        var nodo = {
            id:organigrama[posicion].idPosicion, 
            parentId: organigrama[posicion].idPadre,
            Nombre:organigrama[posicion].nombresPersona + " " +organigrama[posicion].apellidoPaterno + " " +organigrama[posicion].apellidoMaterno,
            Cargo:organigrama[posicion].nombre, 
            Atributos: badges,  
            Imagen: organigrama[posicion].fotoPersona,
            Cuadrante:"6 ffff"
        }
        source.push(nodo);
        if(organigrama[posicion]!=null){
           custom[organigrama[posicion].idPosicion] ={color:organigrama[posicion].colorPosicion}
        }
    }
    
    var orgChart = new getOrgChart(peopleElement, {
        theme: "ula",
        enableGridView: true,
        primaryFields: ["Atributos","Nombre","Cargo"],               
        renderNodeEvent: renderNodeHandler,
        photoFields:["Imagen"],
        enableZoom:false,
        enablePrint: true,
        enableExportToImage: true,
        enableDetailsView: false,
        enableEdit: false,
        dataSource: source,
        clickNodeEvent: clickHandler,  
        boxSizeInPercentage: {
            minBoxSize: {
                width: 5,
                height: 5
            },
            boxSize: {
                width: 20,
                height: 20
            },
            maxBoxSize: {
                width: 100,
                height: 100
            }
        },
        customize: custom 
    });
}
            
function clickHandler(sender, args) {
    alert("clecked node.id " + args.node.id);
  }
            function renderNodeHandler(sender, args) {
                for (i = 0; i < args.content.length; i++) {
                    if (args.content[i].indexOf(args.node.data["Atributos"]) != -1) {
                        args.content[i] = "<foreignObject x='200' y='80' width='80%' height='20px'>" + args.node.data["Atributos"] + "</foreignObject>";
                    }
                }
            }
    
            var getOrganigrama  = function(){
                var obj={idProceso:'6b4071d1-0ff1-11e8-bf12-bc764e100f2b'};
                $.ajax({
                    type: "GET",
                    url: "/Talento/Talento/getOrganigrama",
                    contentType: "application/json; charset=utf-8",
                    data: obj,
                    dataType: "json", 
                    success: function (msg) {
                       
                       cargaOrganigrama(msg)
            
                    }
                });   
            }
            $(document).ready(function(){
                getOrganigrama();
            });
            