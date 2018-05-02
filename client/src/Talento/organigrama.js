getOrgChart.themes.myCustomTheme =
        {
            size: [300, 100],
            toolbarHeight: 46,
            textPoints: [
                { x: 130, y: 50, width: 250 },
                { x: 130, y: 90, width: 250 }
            ],
            textPointsNoImage: [
                { x: 130, y: 50, width: 250 },
                { x: 130, y: 90, width: 250 }
            ],
            expandCollapseBtnRadius: 20,
            defs: '<filter id="f1" x="0" y="0" width="200%" height="200%"><feOffset result="offOut" in="SourceAlpha" dx="5" dy="5" /><feGaussianBlur result="blurOut" in="offOut" stdDeviation="5" /><feBlend in="SourceGraphic" in2="blurOut" mode="normal" /></filter>',
            box: '<rect x="0" y="0" height="100" width="300" rx="10" ry="10" class="myCustomTheme-box" filter="url(#f1)"  />',
            text: '<text text-anchor="middle" width="[width]" class="get-text get-text-[index]" x="[x]" y="[y]">[text]</text>',
            image: '<clipPath id="getMonicaClip"><circle cx="135" cy="255" r="85" /></clipPath><image preserveAspectRatio="xMidYMid slice" clip-path="url(#getMonicaClip)" xlink:href="[href]" x="5" y="0" height="90" width="90"/>',
            reporters: '<circle cx="80" cy="190" r="20" class="reporters"></circle><text class="reporters-text" text-anchor="middle" width="100" x="80" y="195">[reporters]</text>'

            //ddddd: '<text x="0" y="0">1</text>'
        };


            var peopleElement = document.getElementById("people");
            var orgChart = new getOrgChart(peopleElement, {
                theme: "ula",
                enableGridView: true,
                primaryFields: ["CustomHtml"],               
                renderNodeEvent: renderNodeHandler,
                dataSource: [
			        { id: 1, parentId: null, CustomHtml: '<i class="fa fa-plane m-r-5"></i><i class="fa fa-refresh m-r-5"></i><i class="fa fa-warning m-r-5"></i><i class="fa fa-star m-r-5"></i>', title: "CEO", phone: "rr", mail: "lemmons@jourrapide.com", adress: "Atlanta, GA 30303", image: "images/f-11.jpg" },
			        { id: 2, parentId: 1, name: "Ava Field", title: "Paper goods machine setter", phone: "937-912-4971", mail: "anderson@jourrapide.com", image: "images/f-10.jpg" },
			        { id: 3, parentId: 1, name: "Evie Johnson", title: "Employer relations representative", phone: "314-722-6164", mail: "thornton@armyspy.com", image: "images/f-9.jpg" },
			        { id: 4, parentId: 1, name: "Paul Shetler", title: "Teaching assistant", phone: "330-263-6439", mail: "shetler@rhyta.com", image: "images/f-5.jpg" },
			        { id: 5, parentId: 2, name: "Rebecca Francis", title: "Welding machine setter", phone: "408-460-0589", image: "images/f-4.jpg" },
			        { id: 6, parentId: 2, name: "Rebecca Randall", title: "Optometrist", phone: "801-920-9842", mail: "JasonWGoodman@armyspy.com", image: "images/f-8.jpg" },
			        { id: 7, parentId: 2, name: "Spencer May", title: "System operator", phone: "Conservation scientist", mail: "hodges@teleworm.us", image: "images/f-7.jpg" },
			        { id: 8, parentId: 6, name: "Max Ford", title: "Budget manager", phone: "989-474-8325", mail: "hunter@teleworm.us", image: "images/f-6.jpg" },
			        { id: 9, parentId: 7, name: "Riley Bray", title: "Structural metal fabricator", phone: "479-359-2159", image: "images/f-3.jpg" },
			        { id: 10, parentId: 7, name: "Callum Whitehouse", title: "Radar controller", phone: "847-474-8775", image: "images/f-2.jpg" }
                ],
                customize: {
                    "2":{color:"green"}
                }
            });

            function renderNodeHandler(sender, args) {
                for (i = 0; i < args.content.length; i++) {
                    if (args.content[i].indexOf(args.node.data["CustomHtml"]) != -1) {
                        args.content[i] = "<foreignObject x='0' y='10' width='90%' height='100%'>" + args.node.data["CustomHtml"] + "</foreignObject>";
                    }
                }
            }
    
