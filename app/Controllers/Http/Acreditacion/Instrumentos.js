'use strict'

const got = use('got')

class Instrumentos {
    * index (request, response) {
        
        var instrumentos = [
                { nombre:"Set de Observaciones En Terreno (SOT)", idEstado:1,
                class:"task-info",
                image:"sot.png",
                descripcion:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed molestie, ipsum et ullamcorper viverra, purus quam aliquam dolor, vel lacinia lectus odio porta risus. Aenean tincidunt pharetra iaculis. Pellentesque id mi magna. Ut commodo nisl in leo rutrum molestie. Nullam sed purus porta, finibus elit id, feugiat ex. Cras interdum porttitor dui vitae convallis. Mauris id magna ut turpis imperdiet auctor eget a diam."},
                { nombre:"Test de Conocimiento (TCO)", idEstado:3,
                class:"task-info",
                image:"tco.png",
                descripcion:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed molestie, ipsum et ullamcorper viverra, purus quam aliquam dolor, vel lacinia lectus odio porta risus. Aenean tincidunt pharetra iaculis. Pellentesque id mi magna. Ut commodo nisl in leo rutrum molestie. Nullam sed purus porta, finibus elit id, feugiat ex. Cras interdum porttitor dui vitae convallis. Mauris id magna ut turpis imperdiet auctor eget a diam."},
                { nombre:"Entrevista de Incidentes Críticos (EIC)", idEstado:2,
                class:"task-info",
                image:"eic.png",
                descripcion:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed molestie, ipsum et ullamcorper viverra, purus quam aliquam dolor, vel lacinia lectus odio porta risus. Aenean tincidunt pharetra iaculis. Pellentesque id mi magna. Ut commodo nisl in leo rutrum molestie. Nullam sed purus porta, finibus elit id, feugiat ex. Cras interdum porttitor dui vitae convallis. Mauris id magna ut turpis imperdiet auctor eget a diam."}
            ];
    
        yield response.sendView('acreditacion/evaluacion/instrumentos',  {instrumentos:instrumentos});
    }
    * competenciasInstrumento (request,response){

       
        var competencias = [
        { id:1,nombre:"Competencia 1",class:"task-success",image:"funcional.png",descripcion:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed molestie, ipsum et ullamcorper viverra, purus quam aliquam dolor, vel lacinia lectus odio porta risus. Aenean tincidunt pharetra iaculis. Pellentesque id mi magna. Ut commodo nisl in leo rutrum molestie. Nullam sed purus porta, finibus elit id, feugiat ex. Cras interdum porttitor dui vitae convallis. Mauris id magna ut turpis imperdiet auctor eget a diam.", tipo:"Funcional",idTipo:1 } ,
        { id:2,nombre:"Competencia 2",class:"task-info",image:"conductual.png",descripcion:"Aenean nec orci aliquet, imperdiet leo nec, ultricies neque. Donec cursus a tellus vitae condimentum. Donec accumsan hendrerit elementum. Nullam placerat ante vel felis lobortis, in commodo lectus luctus. Pellentesque rutrum, est nec varius vulputate, sem nisi efficitur dolor, non porta lorem purus sit amet justo. Praesent non felis suscipit, accumsan mi ut, tempus eros. Duis venenatis volutpat nunc eu elementum. Curabitur tempor sodales leo, a cursus nisl. Suspendisse id ipsum sed nunc fringilla eleifend ac id sapien.", tipo:"Conductual",idTipo:2 } ,
        { id:3,nombre:"Competencia 3" ,class:"task-success",image:"funcional.png",descripcion:"Maecenas vehicula vel dolor nec lobortis. Vestibulum posuere quam quis fermentum posuere. Sed varius orci id massa facilisis, in lobortis enim lacinia. Curabitur fermentum lectus ac quam lacinia rutrum. Ut ut pretium ligula, eu condimentum massa. Nunc vitae massa non nisl accumsan aliquam non eu sapien. Mauris auctor condimentum nibh quis iaculis. Proin rhoncus enim id turpis gravida, in rutrum enim imperdiet. Sed feugiat sapien id nunc vulputate commodo. Suspendisse ornare mi sed odio elementum imperdiet. Phasellus imperdiet vel leo vitae pellentesque.", tipo:"Funcional",idTipo:1} ];
    
        yield response.sendView('acreditacion/evaluacion/competenciasInstrumento',  {competencias:competencias});
    }
}

module.exports = Instrumentos