'use strict'
const got = use('got')

class PerfilCargo {
     index ({view,request, response}) {
        /*const Env = use('Env')
        var server = Env.get('API_SERVER', 'development')*/
        var perfiles = [
            {
              "id": 1,
              "codigo": "ANTU001",
              "nombre": "OPERADOR TERRENO APILADOR"
            },
            {
              "id": 2,
              "codigo": "ANTU002",
              "nombre": "OPERADOR TERRENO AGLOMERADO"
            },
            {
              "id": 3,
              "codigo": "ANTU003",
              "nombre": "OPERADOR CABINA APILADOR"
            },
            {
              "id": 4,
              "codigo": "ANTU004",
              "nombre": "OPERADOR TERRENO CHANCADO"
            },
            {
              "id": 5,
              "codigo": "ANTU005",
              "nombre": "OPERADOR TERRENO ESPARCIDOR"
            },
            {
              "id": 6,
              "codigo": "ANTU006",
              "nombre": "OPERADOR TERRENO ROTOPALA"
            },
            {
              "id": 7,
              "codigo": "ANTU007",
              "nombre": "OPERADOR CABINA ESPARCIDOR"
            },
            {
              "id": 8,
              "codigo": "ANTU008",
              "nombre": "OPERADOR SALA CONTROL ÁREA SECA CHANCADO"
            },
            {
              "id": 9,
              "codigo": "ANTU009",
              "nombre": "OPERADOR CABINA ROTOPALA"
            },
            {
              "id": 10,
              "codigo": "ANTU010",
              "nombre": "OPERADOR SALA CONTROL ÁREA SECA AGLOMERADO"
            },
            {
              "id": 11,
              "codigo": "ANTU011",
              "nombre": "OPERADOR GRÚA HORQUILLA"
            },
            {
              "id": 12,
              "codigo": "ANTU012",
              "nombre": "OPERADOR GRUA EW"
            },
            {
              "id": 13,
              "codigo": "ANTU013",
              "nombre": "OPERADOR NAVE EW"
            },
            {
              "id": 14,
              "codigo": "ANTU014",
              "nombre": "OPERADOR MÁQUINA DESPEGADORA DE CÁTODOS"
            },
            {
              "id": 15,
              "codigo": "ANTU015",
              "nombre": "DESPACHADOR"
            },
            {
              "id": 16,
              "codigo": "ANTU016",
              "nombre": "OPERADOR PATIO ESTANQUE"
            },
            {
              "id": 17,
              "codigo": "ANTU017",
              "nombre": "OPERADOR TERRENO SX"
            },
            {
              "id": 18,
              "codigo": "ANTU018",
              "nombre": "OPERADOR TERRENO LX"
            },
            {
              "id": 19,
              "codigo": "ANTU019",
              "nombre": "OPERADOR SALA CONTROL EXTRACCIÓN POR SOLVENTE Y ELECTROOBTENCIÓN"
            },
            {
              "id": 20,
              "codigo": "ANTU020",
              "nombre": "OPERADOR SALA CONTROL LX"
            },
            {
              "id": 21,
              "codigo": "ANTU021",
              "nombre": "MANTENEDOR MECÁNICO BÁSICO MINA"
            },
            {
              "id": 22,
              "codigo": "ANTU022",
              "nombre": "MANTENEDOR ELÉCTRICO TALLER"
            },
            {
              "id": 23,
              "codigo": "ANTU023",
              "nombre": "MANTENEDOR MECÁNICO TALLER"
            },
            {
              "id": 24,
              "codigo": "ANTU024",
              "nombre": "MANTENEDOR ELÉCTRICO TERRENO"
            },
            {
              "id": 25,
              "codigo": "ANTU025",
              "nombre": "MANTENEDOR MECÁNICO TERRENO"
            },
            {
              "id": 26,
              "codigo": "ANTU026",
              "nombre": "MANTENEDOR ELÉCTRICO AVANZADO EQUIPOS FIJOS (T4)"
            },
            {
              "id": 27,
              "codigo": "ANTU027",
              "nombre": "MANTENEDOR ELÉCTRICO ESPECIALISTA EQUIPOS FIJOS"
            },
            {
              "id": 28,
              "codigo": "ANTU028",
              "nombre": "MANTENEDOR ELÉCTRICO AVANZADO EQUIPOS FIJOS (T5)"
            },
            {
              "id": 29,
              "codigo": "ANTU029",
              "nombre": "MANTENEDOR ELÉCTRICO ESPECIALISTA DE MEDIA Y ALTA TENSIÓN"
            },
            {
              "id": 30,
              "codigo": "ANTU030",
              "nombre": "MANTENEDOR INSTRUMENTISTA AVANZADO (T5)"
            },
            {
              "id": 31,
              "codigo": "ANTU031",
              "nombre": "MANTENEDOR INSTRUMENTISTA ESPECIALISTA"
            },
            {
              "id": 32,
              "codigo": "ANTU032",
              "nombre": "MANTENEDOR INSTRUMENTISTA AVANZADO (T4)"
            },
            {
              "id": 33,
              "codigo": "ANTU033",
              "nombre": "MANTENEDOR MECÁNICO ESPECIALISTA"
            },
            {
              "id": 34,
              "codigo": "ANTU034",
              "nombre": "MANTENEDOR MECÁNICO BASE PLANTA"
            },
            {
              "id": 35,
              "codigo": "ANTU035",
              "nombre": "MANTENEDOR VOLANTE/MECÁNICO ÁREA HÚMEDA/MECÁNICO PLANTA CHANCADO/RIPIOS (T5)"
            },
            {
              "id": 36,
              "codigo": "ANTU036",
              "nombre": "MANTENEDOR ESPECIALISTA CORREAS (T5)"
            },
            {
              "id": 37,
              "codigo": "ANTU037",
              "nombre": "MANTENEDOR VOLANTE/MECÁNICO ÁREA HÚMEDA/MECÁNICO PLANTA CHANCADO/RIPIOS (T4)"
            },
            {
              "id": 38,
              "codigo": "ANTU038",
              "nombre": "MANTENEDOR CORREAS ESPECIALISTA (T6)"
            },
            {
              "id": 39,
              "codigo": "ANTU039",
              "nombre": "MANTENEDOR ELÉCTRICO BÁSICO MINA"
            },
            {
              "id": 40,
              "codigo": "ANTU040",
              "nombre": "MANTENEDOR SENIOR"
            },
            {
              "id": 41,
              "codigo": "ANTU041",
              "nombre": "ELÉCTRICO ÁREA HÚMEDA/ELÉCTRICO ÁREA SECA/ELÉCTRICO ÁREA RIPIO"
            },
            {
              "id": 42,
              "codigo": "ANTU042",
              "nombre": "MANTENEDOR BASE CORREAS TRANSPORTADORAS Y ALIMENTADORAS PLANTA"
            },
            {
              "id": 43,
              "codigo": "ANTU043",
              "nombre": "MANTENEDOR ESPECIALISTA CORREAS (T4)"
            }
          ];
        return view.render('persona/perfilCargo',  {perfiles:perfiles});
    }
    Competencias({view,request, response}) {
        var competencias = [
        { id:1,nombre:"Competencia 1",class:"task-success",image:"funcional.png",descripcion:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed molestie, ipsum et ullamcorper viverra, purus quam aliquam dolor, vel lacinia lectus odio porta risus. Aenean tincidunt pharetra iaculis. Pellentesque id mi magna. Ut commodo nisl in leo rutrum molestie. Nullam sed purus porta, finibus elit id, feugiat ex. Cras interdum porttitor dui vitae convallis. Mauris id magna ut turpis imperdiet auctor eget a diam.", tipo:"Funcional",idTipo:1 } ,
        { id:2,nombre:"Competencia 2",class:"task-info",image:"conductual.png",descripcion:"Aenean nec orci aliquet, imperdiet leo nec, ultricies neque. Donec cursus a tellus vitae condimentum. Donec accumsan hendrerit elementum. Nullam placerat ante vel felis lobortis, in commodo lectus luctus. Pellentesque rutrum, est nec varius vulputate, sem nisi efficitur dolor, non porta lorem purus sit amet justo. Praesent non felis suscipit, accumsan mi ut, tempus eros. Duis venenatis volutpat nunc eu elementum. Curabitur tempor sodales leo, a cursus nisl. Suspendisse id ipsum sed nunc fringilla eleifend ac id sapien.", tipo:"Conductual",idTipo:2 } ,
        { id:3,nombre:"Competencia 3" ,class:"task-success",image:"funcional.png",descripcion:"Maecenas vehicula vel dolor nec lobortis. Vestibulum posuere quam quis fermentum posuere. Sed varius orci id massa facilisis, in lobortis enim lacinia. Curabitur fermentum lectus ac quam lacinia rutrum. Ut ut pretium ligula, eu condimentum massa. Nunc vitae massa non nisl accumsan aliquam non eu sapien. Mauris auctor condimentum nibh quis iaculis. Proin rhoncus enim id turpis gravida, in rutrum enim imperdiet. Sed feugiat sapien id nunc vulputate commodo. Suspendisse ornare mi sed odio elementum imperdiet. Phasellus imperdiet vel leo vitae pellentesque.", tipo:"Funcional",idTipo:1} ];
        return view.render('persona/CompetenciasPerfil',  {competencias:competencias});
    }
}

module.exports = PerfilCargo