'use strict'

const got = use('got')

class Proceso {
     index  ({ view,request, response }) {
        var texto ="hola";
        var salida=`aqui ${texto} texto`

        console.log(salida)
        var procesos = [{
                    id:1,
                    nombre:"Acreditación 2018",
                    class:"task-info",
                    image:"reevaluacion.png",
                    descripcion:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed molestie, ipsum et ullamcorper viverra, purus quam aliquam dolor, vel lacinia lectus odio porta risus. Aenean tincidunt pharetra iaculis. Pellentesque id mi magna. Ut commodo nisl in leo rutrum molestie. Nullam sed purus porta, finibus elit id, feugiat ex. Cras interdum porttitor dui vitae convallis. Mauris id magna ut turpis imperdiet auctor eget a diam."
                },{
                    id:2,
                    nombre:"Reevaluación 2018",
                    class:"task-info",
                    image:"evaluacion.png",
                    descripcion:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed molestie, ipsum et ullamcorper viverra, purus quam aliquam dolor, vel lacinia lectus odio porta risus. Aenean tincidunt pharetra iaculis. Pellentesque id mi magna. Ut commodo nisl in leo rutrum molestie. Nullam sed purus porta, finibus elit id, feugiat ex. Cras interdum porttitor dui vitae convallis. Mauris id magna ut turpis imperdiet auctor eget a diam."
                }
        ];
        
        return view.render('acreditacion/proceso/list',  {procesos});
    }
}

module.exports = Proceso