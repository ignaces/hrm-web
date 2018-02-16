import _ from 'lodash';
$(document).ready(function() {
    $('#example').DataTable( {
        dom: 'Bfrtip',
        buttons: [
            'excelFlash',
            'excel'
            //'copyHtml5',
            //'excelHtml5',
            //'csvHtml5',
            //'pdfHtml5'
        ]
    } );
});

/*
$('#tblPersonas').DataTable({
    "language":{
          "url":"/assets/plugins/datatables/locales/es_CL.js"
    }
});
*/