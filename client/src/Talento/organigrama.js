
var cColaboradores = new Vue({
    el: '#cColaboradores',
    data: {
        posicion: {colaboradores:[]}
    }
});
/*var modalPosicion = new Vue({
    el: '#modalPosicion',
    data: {
        posicion: {cargo:""}
    }
});*/
var cargaOrganigrama = function (organigrama){

    var source = [];
    var custom = {};
    var peopleElement = document.getElementById("people");
    
    
    
    for(var posicion in organigrama){
        
        var badges = "";
        var lupa=false;
        if(organigrama[posicion].edd!=organigrama[posicion].valorEdeEq || organigrama[posicion].idCuadrante!=organigrama[posicion].idCuadranteEq){
            lupa=true;
        }
        
        for(var i in organigrama[posicion].atributos){
            badges +="<i class='"+organigrama[posicion].atributos[i].iconoAtributo+" fa-3x m-r-5 "+organigrama[posicion].atributos[i].colorAtributo+"'></i>";
        }
        if(organigrama[posicion].critico==1){
            badges +="<i class='fa fa-star fa-3x m-r-5 text-warning'></i>";
        }
        if(badges==""){

            basges="&nbsp";
        }
        var nodo = {
            id:organigrama[posicion].idPosicion, 
            parentId: organigrama[posicion].idPadre,
            Nombre:organigrama[posicion].nombresPersona + " " +organigrama[posicion].apellidoPaterno + " " +organigrama[posicion].apellidoMaterno,
            Cargo:organigrama[posicion].nombre, 
            Atributos: badges,  
            Imagen: organigrama[posicion].fotoPersona,
            Cuadrante:organigrama[posicion].nombreCuadrante,
            idPersona: organigrama[posicion].idPersona,
            talentReview:organigrama[posicion].valor,
            clima:"98",
            edd:organigrama[posicion].edd,
            lupa:lupa,
            badges:organigrama[posicion].atributos,
            critico:organigrama[posicion].critico
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
    
    $("#modalColaborador").modal('show');
    
    cColaboradores.posicion=args.node.data;
    cColaboradores.posicion.colaboradores=[];
    /*cColaboradores.posicion.colaboradores=[
        {idPersona:"ssss",nombre:"Andrrs sadada adaasd"},
        {idPersona:"ssss",nombre:"Andrrs sadada adaasd"},
        {idPersona:"ssss",nombre:"Andrrs sadada adaasd"},
        {idPersona:"ssss",nombre:"Andrrs sadada adaasd"},
        {idPersona:"ssss",nombre:"Andrrs sadada adaasd"},
        {idPersona:"ssss",nombre:"Andrrs sadada adaasd"},
        {idPersona:"ssss",nombre:"Andrrs sadada adaasd"}];*/

    
    
}

function renderNodeHandler(sender, args) {
    for (i = 0; i < args.content.length; i++) {
        var texto ="";
        if (args.content[i].indexOf(args.node.data["talentReview"]) != -1) {
            if(args.node.data["talentReview"]!=undefined){
                
                texto  = "<foreignObject x='298' y='150' width='30px' height='20px'><h2 align='center' style='background-color: rgba(255,255,255,1); border:1px solid rgba(0,0,0,0.1);'>"+args.node.data["talentReview"]+"</h2></foreignObject>";
            }
        }
        
        if(args.node.data["lupa"]!=false){
            texto  += "<foreignObject x='290' y='150' width='20px' height='20px'><i class='fa fa-search fa-4x m-r-5 text-warning'></i></foreignObject>";
        }

        if(args.node.data["edd"]!=undefined){
            texto  += "<foreignObject x='230' y='150' width='45px' height='20px'><h2 style='background-color: rgba(255,255,255,1); border:1px solid rgba(0,0,0,0.1);'>"+args.node.data["edd"]+"</h2></foreignObject>";
            
        }
       
        
        if (args.content[i].indexOf(args.node.data["Atributos"]) != -1) {
            texto  += "<foreignObject x='200' y='80' width='80%' height='20px'>" + args.node.data["Atributos"] + "</foreignObject>";
            args.content[i]=texto;
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

