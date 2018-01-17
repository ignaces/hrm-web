'use strict'

const got = use('got')

class Personas {
    * index (request, response) {
        var personas = [{ nombre:"Pierce Caviness" } ,
        { nombre:"Norberta Stagg" } ,
        { nombre:"Wim Bonar" } ,
        { nombre:"Thecla Forte" } ,
        { nombre:"Clem Aiello" } ,
        { nombre:"Lavender Asbury" } ,
        { nombre:"Sparke Scully" } ,
        { nombre:"Cornelian Cantor" } ,
        { nombre:"Akshay Castagna" } ,
        { nombre:"Mukasa Ivers" } ,
        { nombre:"Rafu Redondo" } ,
        { nombre:"Guildenstern Bonar" } ,
        { nombre:"Yuka Burgan" } ,
        { nombre:"Goliath Bonar" } ,
        { nombre:"Hafwen Bonar" } ,
        { nombre:"Wilma Hepburn" } ,
        { nombre:"Frederika Hepburn" } ,
        { nombre:"Gotzone Ivers" } ,
        { nombre:"Wilma Burnell" } ,
        { nombre:"Wahnond Isaac" } ,
        { nombre:"Ciceron Fleischmann" } ,
        { nombre:"Hemlata Isbell" } ,
        { nombre:"Jermayne Devereaux" } ,
        { nombre:"Lysimachus Ritz" } ,
        { nombre:"Hidi Asbury"}];

        
        yield response.sendView('persona/lista',  {personas:personas});
    }
}

module.exports = Personas