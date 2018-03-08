'use strict'

const api = use('App/Utils/Data')

class Proceso {
    

    async portada ({view,request, response, auth, session}) {
        
        var idPersona = session.get('idPersona', 'fail')
        var idProceso = request.input("idProceso")
        //console.log(request.all());
        session.put('idProceso',idProceso);

        //Datos Proceso
        var objDatosProceso = {
            "idProceso":idProceso,
            idEstado:""
        };
        var resultProceso =await api.execApi(request.hostname(),'/Desempeno/Proceso/getProcesos',objDatosProceso);
        var datosProceso =resultProceso.body.data[0];

        session.put('dataProceso',datosProceso)
        //console.log(datosProceso);

        //Etapas Proceso
        var objEtapasProceso = {
            "idProceso":idProceso,
            "idProcesoEtapa":""
        };
        var resultEtapasProceso=await api.execApi(request.hostname(),'/Desempeno/Proceso/getEtapasProceso',objEtapasProceso);
        var etapasProceso =resultEtapasProceso.body.data;

        //Menu Contextual
        var objMenuContextual = {
            "idProceso":idProceso,
            idEstado:"1"
        };
        var resultMenu =await api.execApi(request.hostname(),'/Desempeno/Proceso/getMenuUsuario',objMenuContextual);
        var datosMenu =resultMenu.body.data;

        //Datos Persona
        var user={usuario:auth.user}
        var persona = session.get('personaLogueada')

        var objdatosPersona = {
            "idProceso":idProceso,
            "idPersona":idPersona
        };

        var resultPersonaEde =await api.execApi(request.hostname(),'/Desempeno/Proceso/getProcesoPersona',objdatosPersona);
        var PersonaEde =resultPersonaEde.body.data;
        //console.log(PersonaEde)

        //GRAFICOS DUMMIES
        var data={
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
        return view.render('desempeno/proceso',{data:data,etapasProceso,datosMenu,persona,PersonaEde,datosProceso});
    }
}

module.exports = Proceso