


            var peopleElement = document.getElementById("people");
            var badges = "<i class='fa fa-plane fa-2x m-r-5 text-red'></i>\
                            <i class='fa fa-refresh fa-2x m-r-5 text-primary'></i>\
                            <i class='fa fa-warning fa-2x m-r-5 text-warning'></i>\
                            <i class='fa fa-star fa-2x m-r-5 text-success'></i>";
            var orgChart = new getOrgChart(peopleElement, {
                theme: "ula",
                enableGridView: true,
                primaryFields: ["Atributos","Nombre","Cargo"],               
                renderNodeEvent: renderNodeHandler,
                photoFields:["Imagen"],
                enableZoom:false,
                enableExportToImage: true,
                dataSource: [
			        { id: 1, parentId: null,Nombre:"Andrés Santa María",Cargo:"Lacayo", Atributos: badges,  Imagen: "/assets/images/users/avatar-2.jpg" },
			        { id: 2, parentId: 1, Nombre: "Ava Field", Cargo: "Paper goods machine setter", Atributos: badges,Imagen: "/assets/images/users/avatar-1.jpg" },
			        { id: 3, parentId: 1, Nombre: "Evie Johnson", Cargo: "Employer relations representative",  Atributos: '<p></p>',Imagen: "/assets/images/users/avatar-3.jpg" },
			        { id: 4, parentId: 1, Nombre: "Paul Shetler", Cargo: "Teaching assistant",  Atributos: badges, Imagen: "/assets/images/users/avatar-4.jpg" },
			        { id: 5, parentId: 2, Nombre: "Rebecca Francis", Cargo: "Welding machine setter",  Atributos: badges, Imagen: "/assets/images/users/avatar-5.jpg" },
			        { id: 6, parentId: 2, Nombre: "Rebecca Randall", Cargo: "Optometrist",  Atributos: badges, Imagen: "/assets/images/users/avatar-6.jpg" },
			        { id: 7, parentId: 2, Nombre: "Spencer May", Cargo: "System operator",  Atributos: badges, Imagen: "/assets/images/users/avatar-7.jpg" },
			        { id: 8, parentId: 6, Nombre: "Max Ford", Cargo: "Budget manager",  Atributos: badges, Imagen: "/assets/images/users/avatar-8.jpg" },
			        { id: 9, parentId: 7, Nombre: "Riley Bray", Cargo: "Structural metal fabricator",  Atributos: badges, Imagen: "/assets/images/users/avatar-9.jpg" },
			        { id: 10, parentId: 7, Nombre: "Callum Whitehouse", Cargo: "Radar controller",  Atributos: badges, Imagen: "/assets/images/users/avatar-10.jpg" }
                ],
                boxSizeInPercentage: {
                    minBoxSize: {
                        width: 5,
                        height: 5
                    },
                    boxSize: {
                        width: 20,
                        height: 20
                    },
                    maxBoxSize: {
                        width: 100,
                        height: 100
                    }
                },
                customize: {
                    "2":{color:"green"},
                    "3":{color:"orange"},
                    "4":{color:"yellow"},
                    "5":{color:"darkred"},
                    "6":{color:"lightgreen"},
                    "7":{color:"lightgreen"}
                }
            });

            function renderNodeHandler(sender, args) {
                for (i = 0; i < args.content.length; i++) {
                    if (args.content[i].indexOf(args.node.data["Atributos"]) != -1) {
                        args.content[i] = "<foreignObject x='200' y='80' width='80%' height='20px'>" + args.node.data["Atributos"] + "</foreignObject>";
                    }
                }
            }
    
