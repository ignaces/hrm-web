/**
 * 
 *VUE PART 
 */

var cPosiblesVacantes = new Vue({
    el: '#cPosiblesVacantes',
    data: {
        vacantes:[]
    }
});

var cVacantes = new Vue({
    el: '#cVacantes',
    data: {
        vacantes:[]
    }
});

var cTalentos = new Vue({
    el: '#cTalentos',
    data: {
        vacantes:[]
    }
});

/**
 * END VUE
 */
var posiblesVacantes=function(){

    $.ajax({
        type: "GET",
        url: "/Talento/Marketplace/posiblesVacantes",
        contentType: "application/json; charset=utf-8",
        data: {},
        dataType: "json", 
        async:false,
        success: function (msg) {
            var posiciones = [];
            for(var posicion in msg){
        
                var badges = "";
                var lupa=false;
                if(msg[posicion].valorEdeEq!=undefined){
                    if(msg[posicion].valorEdeEq.indexOf(msg[posicion].edd)==-1 || msg[posicion].idCuadrante!=msg[posicion].idCuadranteEq){
                        lupa=true;
                    }
                }
                
                
                for(var i in msg[posicion].atributos){
                    badges +="<i class='"+msg[posicion].atributos[i].iconoAtributo+"  m-r-5 "+msg[posicion].atributos[i].colorAtributo+"' data-toggle='tooltip' data-placement='top' title='' data-original-title='Tooltip on top'></i>";
                }
                if(msg[posicion].critico==1){
                    badges +="<i class='fa fa-star  m-r-5 text-warning'></i>";
                }
                if(badges==""){
                    basges="&nbsp";
                }
                var nodo = {
                    id:msg[posicion].idPosicion,
                    parentId: msg[posicion].idPadre,
                    Nombre:msg[posicion].nombresPersona + " " +msg[posicion].apellidoPaterno + " " +msg[posicion].apellidoMaterno,
                    Cargo:msg[posicion].nombre, 
                    Atributos: badges,  
                    Imagen: msg[posicion].fotoPersona,
                    Cuadrante:msg[posicion].nombreCuadrante,
                    idPersona: msg[posicion].idPersona,
                    talentReview:msg[posicion].valor,
                    clima:"98",
                    edd:msg[posicion].edd,
                    lupa:lupa,
                    badges:msg[posicion].atributos,
                    critico:msg[posicion].critico
                }
                posiciones.push(nodo);
                
            }
            cPosiblesVacantes.vacantes = posiciones;

        }
    });   
}
var talentos=function(){

    $.ajax({
        type: "GET",
        url: "/Talento/Marketplace/talentos",
        contentType: "application/json; charset=utf-8",
        data: {},
        dataType: "json", 
        async:false,
        success: function (msg) {
            var posiciones = [];
            for(var posicion in msg){
        
                var badges = "";
                var lupa=false;
                if(msg[posicion].valorEdeEq!=undefined){
                    if(msg[posicion].valorEdeEq.indexOf(msg[posicion].edd)==-1 || msg[posicion].idCuadrante!=msg[posicion].idCuadranteEq){
                        lupa=true;
                    }
                }
                
                
                for(var i in msg[posicion].atributos){
                    badges +="<i class='"+msg[posicion].atributos[i].iconoAtributo+"  m-r-5 "+msg[posicion].atributos[i].colorAtributo+"' data-toggle='tooltip' data-placement='top' title='' data-original-title='Tooltip on top'></i>";
                }
                if(msg[posicion].critico==1){
                    badges +="<i class='fa fa-star  m-r-5 text-warning'></i>";
                }
                if(badges==""){
                    basges="&nbsp";
                }
                var nodo = {
                    id:msg[posicion].idPosicion,
                    parentId: msg[posicion].idPadre,
                    Nombre:msg[posicion].nombresPersona + " " +msg[posicion].apellidoPaterno + " " +msg[posicion].apellidoMaterno,
                    Cargo:msg[posicion].nombre, 
                    Atributos: badges,  
                    Imagen: msg[posicion].fotoPersona,
                    Cuadrante:msg[posicion].nombreCuadrante,
                    idPersona: msg[posicion].idPersona,
                    talentReview:msg[posicion].valor,
                    clima:"98",
                    edd:msg[posicion].edd,
                    lupa:lupa,
                    badges:msg[posicion].atributos,
                    critico:msg[posicion].critico
                }
                posiciones.push(nodo);
                
            }
            cTalentos.vacantes = posiciones;

        }
    });   
}
var vacantes=function(){

    $.ajax({
        type: "GET",
        url: "/Talento/Marketplace/vacantesActuales",
        contentType: "application/json; charset=utf-8",
        data: {},
        dataType: "json", 
        async:false,
        success: function (msg) {
            var posiciones = [];
            for(var posicion in msg){
        
                var badges = "";
                var lupa=false;
                if(msg[posicion].valorEdeEq!=undefined){
                    if(msg[posicion].valorEdeEq.indexOf(msg[posicion].edd)==-1 || msg[posicion].idCuadrante!=msg[posicion].idCuadranteEq){
                        lupa=true;
                    }
                }
                
                
                for(var i in msg[posicion].atributos){
                    badges +="<i class='"+msg[posicion].atributos[i].iconoAtributo+"  m-r-5 "+msg[posicion].atributos[i].colorAtributo+"' data-toggle='tooltip' data-placement='top' title='' data-original-title='Tooltip on top'></i>";
                }
                if(msg[posicion].critico==1){
                    badges +="<i class='fa fa-star  m-r-5 text-warning'></i>";
                }
                if(badges==""){
                    basges="&nbsp";
                }
                var nodo = {
                    id:msg[posicion].idPosicion,
                    parentId: msg[posicion].idPadre,
                    Nombre:msg[posicion].nombresPersona + " " +msg[posicion].apellidoPaterno + " " +msg[posicion].apellidoMaterno,
                    Cargo:msg[posicion].nombre, 
                    Atributos: badges,  
                    Imagen: msg[posicion].fotoPersona,
                    Cuadrante:msg[posicion].nombreCuadrante,
                    idPersona: msg[posicion].idPersona,
                    talentReview:msg[posicion].valor,
                    clima:"98",
                    edd:msg[posicion].edd,
                    lupa:lupa,
                    badges:msg[posicion].atributos,
                    critico:msg[posicion].critico
                }
                posiciones.push(nodo);
                
            }
            cVacantes.vacantes = posiciones;

        }
    });   
}
 $(document).ready(function(){
    posiblesVacantes();
    talentos();
    vacantes();


    $("#upcoming, #inprogress, #completed").sortable({
        connectWith: ".taskList",
        placeholder: 'task-placeholder',
        forcePlaceholderSize: true,
        update: function (event, ui) {

            var todo = $("#todo").sortable("toArray");
            var inprogress = $("#inprogress").sortable("toArray");
            var completed = $("#completed").sortable("toArray");
        }
    }).disableSelection();
 });

