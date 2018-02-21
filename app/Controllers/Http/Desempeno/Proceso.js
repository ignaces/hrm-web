'use strict'

const data = use('App/Utils/Data')

class Proceso {
    

    async portada ({view,request, response, auth, session}) {
        
        var idPersona = session.get('idPersona', 'fail')
        var idProceso = request.input("proceso")

        session.put('idProceso',idProceso);

        var obj = {
            "idProceso":idProceso,
            "idPersona": idPersona
        };
       // var result = await data.execApi(request.hostname(),'/Acreditacion/Proceso/getPersonasEvaluaciones',obj);
       //  var personas = result.body.data;
        var data={
            user:[
                {
                    id:"1",
                    nombre:"John Doe",
                    cargo:"Gerente de Recursos Humanos",
                    perfil:"Directivo",
                    avatar:"avatar-1.jpg",
                    genero:"M"
                }
            ],
            menu:[
                {
                    id:"1",
                    nombre:"Proceso de Desempeño",
                    link:"#"
                },
                {
                    id:"2",
                    nombre:"Mis Metas",
                    link:"#"
                },
                {
                    id:"3",
                    nombre:"Mi Equipo",
                    link:"#"
                },
                {
                    id:"4",
                    nombre:"Mis Informes",
                    link:"#"
                },
                {
                    id:"5",
                    nombre:"Mis Planes",
                    link:"#"
                },
                {
                    id:"6",
                    nombre:"Ayuda",
                    link:"#"
                },
                {
                    id:"7",
                    nombre:"Volver",
                    link:"http://localhost:3335/"
                },
            ],
            etapas:[
                {
                    id:"1",
                    etapa:"Creación de Metas",
                    imagen:"/assets/images/ede/creacionmetas.png",
                    color:"bg-aqua-active",
                    link:"/Desempeno/MetasCreacion/creacion",
                    estado:"1"   
                },
                {
                    id:"2",
                    etapa:"Midyear",
                    imagen:"/assets/images/ede/midyear.png",
                    color:"bg-gray-active",
                    link:"",
                    estado:"o"   
                },
                {
                    id:"3",
                    etapa:"Selección de Opinantes",
                    imagen:"/assets/images/ede/seleccionopinante.png",
                    color:"bg-blue-active",
                    link:"",
                    estado:"0"   
                },
                {
                    id:"4",
                    etapa:"Evaluación de Desempeño",
                    imagen:"/assets/images/ede/ede.png",
                    color:"bg-gray-active",
                    link:"",
                    estado:"0"   
                },
                {
                    id:"5",
                    etapa:"Calibración",
                    imagen:"/assets/images/ede/calibracion.png",
                    color:"bg-gray-active",
                    link:"",
                    estado:"0"   
                },
                {
                    id:"6",
                    etapa:"Feedback",
                    imagen:"/assets/images/ede/feedback.png",
                    color:"bg-gray-active",
                    link:"",
                    estado:"0"   
                }
            ],
            knobs:[
                {
                    id:"1",
                    titulo:"Resultado Desempeño",
                    subitulo:"Máximo 120",
                    datamin:"-100",
                    color:"#5ae177",
                    valor:"100",
                    datamax:"120"
            
                },
                {
                    id:"2",
                    titulo:"Competencias",
                    subitulo:"Máximo 120",
                    datamin:"-100",
                    color:"#5ae177",
                    valor:"120",
                    datamax:"120"
                },
                {
                    id:"3",
                    titulo:"Metas",
                    subitulo:"Máximo 120",
                    datamin:"-100",
                    color:"#f0d21c",
                    valor:"80",
                    datamax:"120"
                }
            ],
            barrasUC:[
                {
                    id:"1",
                    nombre:"Orientación al Cliente",
                    resultado:"60",
                    total:"120",
                    porce:"50",
                    color:"progress-bar-aqua"
                },
                {
                    id:"2",
                    nombre:"Orientación a Resultados",
                    resultado:"110",
                    total:"120",
                    porce:"92",
                    color:"progress-bar-red"
                },
                {
                    id:"3",
                    nombre:"Trabajo en Equipo",
                    resultado:"120",
                    total:"120",
                    porce:"100",
                    color:"progress-bar-green"
                },
                {
                    id:"4",
                    nombre:"Liderazgo",
                    resultado:"100",
                    total:"120",
                    porce:"83",
                    color:"progress-bar-yellow"
                }
            ],
            barrasMT:[
                {
                    id:"1",
                    nombre:"Sustentabilidad",
                    resultado:"60",
                    total:"120",
                    porce:"50",
                    color:"progress-bar-aqua" 
                },
                {
                    id:"2",
                    nombre:"Financiero",
                    resultado:"100",
                    total:"120",
                    porce:"83",
                    color:"progress-bar-red"                     
                },
                {
                    id:"3",
                    nombre:"Planes Propios",
                    resultado:"80",
                    total:"120",
                    porce:"67",
                    color:"progress-bar-green" 
                }
            ],
            barrasUCE:[
                {
                    id:"1",
                    nombre:"Orientación al Cliente",
                    resultado:"60",
                    total:"120",
                    porce:"50",
                    color:"progress-bar-aqua"
                },
                {
                    id:"2",
                    nombre:"Orientación a Resultados",
                    resultado:"110",
                    total:"120",
                    porce:"92",
                    color:"progress-bar-red"
                },
                {
                    id:"3",
                    nombre:"Trabajo en Equipo",
                    resultado:"120",
                    total:"120",
                    porce:"100",
                    color:"progress-bar-green"
                },
                {
                    id:"4",
                    nombre:"Liderazgo",
                    resultado:"100",
                    total:"120",
                    porce:"83",
                    color:"progress-bar-yellow"
                }
            ],
            barrasMTE:[
                {
                    id:"1",
                    nombre:"Sustentabilidad",
                    resultado:"60",
                    total:"120",
                    porce:"50",
                    color:"progress-bar-aqua" 
                },
                {
                    id:"2",
                    nombre:"Financiero",
                    resultado:"100",
                    total:"120",
                    porce:"83",
                    color:"progress-bar-red"                     
                },
                {
                    id:"3",
                    nombre:"Planes Propios",
                    resultado:"80",
                    total:"120",
                    porce:"67",
                    color:"progress-bar-green" 
                }
            ],
            avanceEQ:[
                {
                    id:"1",
                    titulo:"Avance Proceso",
                    subtitulo:"10 Colaboradores",
                    dato:"80%"
                }
            ]
        }
        return view.render('desempeno/proceso',{data:data});
    }
}

module.exports = Proceso