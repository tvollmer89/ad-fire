// For Range Serching
// $.fn.dataTable.ext.search.push(
//   function( settings, data, dataIndex ) {
//     var min = 0;
//     var max;
//     var panel = document.getElementById('jWidth');
//     var options = panel.getElementsByTagName('input');
//     for (var i=0, len=options.length; i<len; i++) {
//       if (options[i].checked) {
//         max = (options[i].value === "") ? NaN : parseInt(options[i].value);
//       }
//     }
//     // var max = (selector.value === "") ? NaN : parseInt(selector.value);
//     var colVal = parseFloat( data[5] ); // use data for the age column

//     if ( (isNaN( max ) ) ||
//        ( isNaN( min ) && colVal <= max ) ||
//        ( min <= colVal   && isNaN( max ) ) ||
//        ( min <= colVal   && colVal <= max ) )
//     {
//       return true;
//     }
//     return false;
//   }
// );
//
// Updates "Select all" control in a data table
//
function updateDataTableSelectAllCtrl(table){
   var $table             = table.table().node();
   var $chkbox_all        = $('tbody input[type="checkbox"]', $table);
   var $chkbox_checked    = $('tbody input[type="checkbox"]:checked', $table);
   var chkbox_select_all  = $('thead input[name="select_all"]', table.table().container()).get(0);

   // If none of the checkboxes are checked
   if($chkbox_checked.length === 0){
      chkbox_select_all.checked = false;
      if('indeterminate' in chkbox_select_all){
         chkbox_select_all.indeterminate = false;
      }

   // If all of the checkboxes are checked
   } else if ($chkbox_checked.length === $chkbox_all.length){
      chkbox_select_all.checked = true;
      if('indeterminate' in chkbox_select_all){
         chkbox_select_all.indeterminate = false;
      }

   // If some of the checkboxes are checked
   } else {
      chkbox_select_all.checked = true;
      if('indeterminate' in chkbox_select_all){
         chkbox_select_all.indeterminate = true;
      }
   }
   console.log(chkbox_select_all.checked, chkbox_select_all.indeterminate);
}
$(document).ready(function() {
  zip.workerScriptsPath = '/scripts/';
  $('#systems').DataTable({
    "ajax": "json/final-ULC.json",
    "columns": [
      { "data": "selected"},
      { "data": "designNumber" },
      { "data": "testingAuthority" },
      { "data": "systemType" },
      { "data": "jointType" },
      { "data": "jointCondition"},
      { "data": "maxJointWidth" },
      { "data": "penetrationCons" },
      { "data": "penetrationType" },
      { "data": "maxSizePenetrant" },
      { "data": "appMethod" },
      { "data": "moveC" },
      { "data": "fRating" },
      { "data": "ftRating" },
      { "data": "fhRating" },
      { "data": "fthRating" },
      { "data": "minASpace" },
      { "data": "maxASpace" },
      { "data": "sleeve" },
      { "data": "insulationType" },
      { "data": "lRating" },
      { "data": "moldMildew" },
      { "data": "seismic" },
      { "data": "wRating" },
      { "data": "stcRating" },
      { "data": "trade" },
      { "data": "products" },
      { "data": "designNumber"}
    ],
    "columnDefs": [
      {
        'targets': 0,
        'searchable':false,
        'orderable':false,
        'className': 'dt-body-center',
        'render': function (data, type, full, meta){
          return '<input type="checkbox">';
        }
      },
      {
        "class" : "short",
        "targets": [3,4],
      },
      {
        "targets": [5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25],
        "visible": false
      },
      // Add Download Link
      {
        "targets" : 27,
        "data" : "link",
        render: function ( data, type, full, meta ) {
          return '<a href="designs/'+data+'.pdf" download><i class="fa fa-download" aria-hidden="true"></i></a>';
        }
      }
    ],
    "order": [[1, 'asc']],
    "scrollX": true,
    "sDom": '<<rt><"paging"lip>>',
    'rowCallback': function(row, data, dataIndex){
      // Get row ID
      var rowId = data.designNumber;

      // If row ID is in the list of selected row IDs
      if($.inArray(rowId, rows_selected) !== -1){
        $(row).find('input[type="checkbox"]').prop('checked', true);
        $(row).addClass('selected');
      }
    }
  });

  var t = $('#systems').DataTable();
  var table = $('#systems').dataTable();
  var rows_selected = [];

  // Text Search Box
  $('#tableSearch').on( 'keyup', function () {
      table.api().search( this.value ).draw();
  } );

  function attachCheckboxHandlers() {
    // get reference to element containing toppings checkboxes
    var el = document.getElementById('filters');

    // get reference to input elements in toppings container element
    var cBoxes = el.getElementsByTagName('input');

    // assign updateTotal function to onclick property of each checkbox
    for (var i=0, len=cBoxes.length; i<len; i++) {
      if (cBoxes[i].type === 'checkbox') {
          cBoxes[i].onchange = updateSearch;
      } else if (cBoxes[i].type === 'radio' && cBoxes[i].name === '2') {
        cBoxes[i].onchange = updateSearch;
      }
    }
  }
  attachCheckboxHandlers();

  // use this funciton if error with radio buttons
  function updateTable() {
    table.api().draw();
  }

  // Update table
  function updateSearch() {
    var r = $('input:radio[name="'+this.name+'"]:checked').map(function() {
      if(this.value === "ULC") {
        return "ULC|cUL";
      } else {
        return '^' + this.value + '\$';
      }
    }).get().join('|');
    var c = $('input:checkbox[name="'+this.name+'"]:checked').map(function() {
      return this.value;
    }).get().join('|');
    var s = r + c;
    table.fnFilter(s, this.name, true, false, false, true);
  }

  //Add Clear All Function
  $("#clear-all").click(function () {
    $('#filters input[type=checkbox]:checked').each(function() {
      this.click();
    });
    var tA = document.getElementById('tAuth');
    var tAuths = tA.getElementsByTagName('input');
    for (var t=0, u=tAuths.length; t<u; t++) {
      if(tAuths[t].value === "ULC") {
        tAuths[t].checked = true;
      } else {
        tAuths[t].checked = false;
      }
    }
    document.getElementById('tableSearch').value = "";
    table.fnFilter("ULC|cUL", 2, true, false, false, true);
    table.api().search("").draw();
  });

  // Handle click on checkbox
  $('#systems tbody').on('click', 'input[type="checkbox"]', function(e){
    console.log(table.api().row( 0 ).data());

    var $row = $(this).closest('tr');

    // Get row data
    var data = table.api().row($row).data();

    // Get row ID
    var rowId = data.designNumber;
    console.log(data.designNumber);

    // Determine whether row ID is in the list of selected row IDs
    var index = $.inArray(rowId, rows_selected);

    // If checkbox is checked and row ID is not in list of selected row IDs
    if(this.checked && index === -1){
       rows_selected.push(rowId);

    // Otherwise, if checkbox is not checked and row ID is in list of selected row IDs
    } else if (!this.checked && index !== -1){
       rows_selected.splice(index, 1);
    }

    console.log(rows_selected);
    if(this.checked){
       $row.addClass('selected');
    } else {
       $row.removeClass('selected');
    }

    // Update state of "Select all" control
    updateDataTableSelectAllCtrl(t);

    // Prevent click event from propagating to parent
    e.stopPropagation();
  });

  // Handle click on table cells with checkboxes
   $('#systems').on('click', 'tbody td, thead th:first-child', function(e){
      $(this).parent().find('input[type="checkbox"]').trigger('click');
   });

      // Handle click on "Select all" control
   $('thead input[name="select_all"]', t.table().container()).on('click', function(e){
      if(this.checked){
         $('#systems tbody input[type="checkbox"]:not(:checked)').trigger('click');
      } else if (this.indeterminate) {
        console.log("option 2");
        $('#systems tbody input[type="checkbox"]:checked').trigger('click');
      } else {
         $('#systems tbody input[type="checkbox"]:checked').trigger('click');
      }
      console.log(this.indeterminate);
      // Prevent click event from propagating to parent
      e.stopPropagation();
   });

  // Handle table draw event
  table.on('draw', function(){
    // Update state of "Select all" control
    updateDataTableSelectAllCtrl(t);
  });

  $('#download-zip').on('click', downloadWithBlob());

    // JSZipUtils.getBinaryContent("path/to/picture.png", function (err, data) {
    //    if(err) {
    //       throw err; // or handle the error
    //    }
    //    var zip = new JSZip();
    //    zip.file("picture.png", data, {binary:true});
    // });

});