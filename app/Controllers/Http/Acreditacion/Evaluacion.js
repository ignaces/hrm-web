'use strict'

const got = use('got')

class Evaluacion {

    * index (request, response) {
        const Env = use('Env')
        var server = Env.get('API_SERVER', 'development')
        var personas = [{ nombre:"Pierce Caviness", idEstado:1,Perfil:"MANTENEDOR SENIOR"},
        { nombre:"Norberta Stagg", idEstado:3,Perfil:"OPERADOR TERRENO SX",Perfil:"MANTENEDOR SENIOR"},
        { nombre:"Wim Bonar", idEstado:2,Perfil:"ELÉCTRICO ÁREA HÚMEDA/ELÉCTRICO ÁREA SECA/ELÉCTRICO ÁREA RIPIO"},
        { nombre:"Thecla Forte", idEstado:1,Perfil:"MANTENEDOR SENIOR"},
        { nombre:"Clem Aiello", idEstado:1,Perfil:"MANTENEDOR SENIOR"},
        { nombre:"Lavender Asbury", idEstado:3,Perfil:"OPERADOR TERRENO SX"},
        { nombre:"Sparke Scully", idEstado:2,Perfil:"ELÉCTRICO ÁREA HÚMEDA/ELÉCTRICO ÁREA SECA/ELÉCTRICO ÁREA RIPIO"},
        { nombre:"Cornelian Cantor", idEstado:2,Perfil:"ELÉCTRICO ÁREA HÚMEDA/ELÉCTRICO ÁREA SECA/ELÉCTRICO ÁREA RIPIO"},
        { nombre:"Akshay Castagna", idEstado:3,Perfil:"OPERADOR TERRENO SX"},
        { nombre:"Mukasa Ivers", idEstado:1,Perfil:"MANTENEDOR SENIOR"},
        { nombre:"Rafu Redondo", idEstado:1,Perfil:"MANTENEDOR SENIOR"},
        { nombre:"Guildenstern Bonar", idEstado:3,Perfil:"OPERADOR TERRENO SX"},
        { nombre:"Yuka Burgan", idEstado:1,Perfil:"MANTENEDOR SENIOR"},
        { nombre:"Goliath Bonar", idEstado:1,Perfil:"MANTENEDOR SENIOR"},
        { nombre:"Hafwen Bonar", idEstado:1,Perfil:"MANTENEDOR SENIOR"},
        { nombre:"Wilma Hepburn", idEstado:1,Perfil:"MANTENEDOR SENIOR"},
        { nombre:"Frederika Hepburn", idEstado:1,Perfil:"MANTENEDOR SENIOR"},
        { nombre:"Gotzone Ivers", idEstado:1,Perfil:"MANTENEDOR SENIOR"},
        { nombre:"Wilma Burnell", idEstado:1,Perfil:"MANTENEDOR SENIOR"},
        { nombre:"Wahnond Isaac", idEstado:1,Perfil:"MANTENEDOR SENIOR"},
        { nombre:"Ciceron Fleischmann", idEstado:1,Perfil:"MANTENEDOR SENIOR"},
        { nombre:"Hemlata Isbell", idEstado:1,Perfil:"MANTENEDOR SENIOR"},
        { nombre:"Jermayne Devereaux", idEstado:1,Perfil:"MANTENEDOR SENIOR"},
        { nombre:"Lysimachus Ritz", idEstado:1,Perfil:"MANTENEDOR SENIOR"},
        { nombre:"Hidi Asbury",idEstado:3,Perfil:"OPERADOR TERRENO SX"}];
    
        yield response.sendView('acreditacion/evaluacion/evaluados',  {personas:personas});
    }
    
}

module.exports = Evaluacion