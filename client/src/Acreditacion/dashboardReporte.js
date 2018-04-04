$(document).ready(function(){
    $("#btnExcelReporte").click(function(){
        window.location.href="/Acreditacion/Informe/resultadosDownload?proceso="+'a087578b-20a7-11e8-80db-bc764e10787e';
    });
    $('#tblPersonas').DataTable({
      "language": {
        "url": "/assets/plugins/datatables/locales/es_CL.js"
      }
    });
});

/**
* Theme: Adminox Dashboard
* Author: Coderthemes
* Dashboard
*/
!function($) {
    "use strict";
  
    var ChartC3 = function() {};
  
    ChartC3.prototype.init = function () {
  
      //Donut Chart
      c3.generate({
        bindto: '#donut-chart',
        data: {
          columns: [
            ['Male', 46],
            ['Female', 24]
          ],
          type : 'donut'
        },
        donut: {
          title: "Candidates",
          width: 30,
          label: {
            show:false
          }
        },
        color: {
          pattern: ["#64c5b1", "#ddd"]
        }
      });
  
      //Pie Chart
      c3.generate({
        bindto: '#piechart1',
        data: {
          columns: [
            ['No Iniciado', $("#noIniciados").val()*1],
            ['En Proceso', $("#enProgreso").val()*1],
            ['Finalizado', $("#finalizados").val()*1]
          ],
          type : 'pie'
        },
        color: {
          pattern: ["#dddddd", "#64c5b1", "#e68900"]
        },
        pie: {
          label: {
            show: false
          }
        },
        legend: {
          item: {
            onclick: function() { return false; }
          }
        }
      });
      //Pie Chart
      c3.generate({
        bindto: '#piechart2',
        data: {
          columns: [
            ['Acreditados', 1],
            ['No Acreditados', 1]
          ],
          type : 'pie'
        },
        color: {
          pattern: ["#64c5b1", "#e68900"]
        },
        pie: {
          label: {
            show: false
          }
        }
      });
  
    },
        $.ChartC3 = new ChartC3, $.ChartC3.Constructor = ChartC3
  
  }(window.jQuery),
  
  //initializing
      function($) {
        "use strict";
        $.ChartC3.init()
      }(window.jQuery);


      console.log("asdas1");