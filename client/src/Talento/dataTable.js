import _ from 'lodash';
$(document).ready(function() {
    $('#example').DataTable({
        "language":{
            "url":"/assets/plugins/datatables/locales/es_CL.js"
      },
        dom: 'Bfrtip',
        buttons: [
            {
           // 'copyHtml5',
            extend:'excelHtml5',
            text: '<div class="btn waves-effect waves-light btn-primary">Bajar Excel</div>',
            className: "btn waves-effect waves-light btn-primary"
            //<div class="btn waves-effect waves-light btn-primary">Bajar Excel</div>
            // 'csvHtml5',
           // 'pdfHtml5'
            }
        ]
        
    });
});

/*
$('#tblPersonas').DataTable({
    "language":{
          "url":"/assets/plugins/datatables/locales/es_CL.js"
    }
});
*/