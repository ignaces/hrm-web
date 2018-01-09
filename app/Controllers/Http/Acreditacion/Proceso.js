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

    async colaboradores ({view,request, response}) {
        const Env = use('Env')

        var server = Env.get('API_SERVER', 'development')
        
        const result = await got(`${server}/Acreditacion/Proceso/getPersonas`,
        {
            json:true,
            query:{"idProceso":"9d212163-f0e6-11e7-bf12-bc764e100f2b"}
        })
        
        var personas = result.body;
        return view.render('acreditacion/proceso/colaboradores',  {personas:personas});
    }
}

module.exports = Proceso