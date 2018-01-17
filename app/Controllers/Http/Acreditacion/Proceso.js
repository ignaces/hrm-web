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

    async colaboradores ({view,request, response, auth}) {
        const Env = use('Env')

        var server = Env.get('API_SERVER', 'development')
        
        var obIdPersona = await got(`${server}/Persona/Persona/getIdPersona`,
        {
            json:true,
            query:{
                "hostname":"9d212163-f0e6-11e7-bf12-bc764e100f2b",
                "idUser":auth.user.id
            }
        })



        console.log(obIdPersona.body.data[0].idPersona);
        
        const result = await got(`${server}/Acreditacion/Proceso/getPersonasEvaluaciones`,
        {
            json:true,
            query:{
                "idProceso":"9d212163-f0e6-11e7-bf12-bc764e100f2b",
                "idPersona":"DA4A8847-401A-515A-01DE-A30525BFA4E5"
            }
        })
        
        var personas = result.body.data;
        
        return view.render('acreditacion/proceso/colaboradores',  {tipoOpinante:personas});
    }
}

module.exports = Proceso