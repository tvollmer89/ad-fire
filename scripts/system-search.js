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
$('#systems').DataTable({
  "ajax": "json/final-ULC.json",
  "columns": [
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
    { "data": "link"}
  ],
  "columnDefs": [
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
      "targets" : 26,
      "data" : "link",
      render: function ( data, type, full, meta ) {
        return '<a href="'+data+'"><i class="fa fa-download" aria-hidden="true"></i></a>';
      }
    }
  ],
  "scrollX": true,
  "sDom": '<<rt><"paging"lip>>',
});

var t = $('#systems').DataTable();
var table = $('#systems').dataTable();
var searchValues = [];
var min = 0;
var max = NaN;

// input search box
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
    } else if (cBoxes[i].type === 'radio' && cBoxes[i].name === '1') {
      cBoxes[i].onchange = updateSearch;
    }
  }
}
attachCheckboxHandlers();

// use this funciton if error with radio buttons
function updateTable() {
  table.api().draw();
}

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
//add clearall function
$("#clear-all").click(function () {
  // Clear Checkboxes
  $('input[type=checkbox]:checked').each(function() {
    this.click();
  });
  // Reset Radio Selectors
  // testingAuthority
  var tA = document.getElementById('tAuth');
  var tAuths = tA.getElementsByTagName('input');
  for (var t=0, u=tAuths.length; t<u; t++) {
    if(tAuths[t].value === "ULC") {
      tAuths[t].checked = true;
    } else {
      tAuths[t].checked = false;
    }
  }
  // Reset Textbox
  document.getElementById('tableSearch').value = "";
  table.fnFilter("ULC|cUL", 1, true, false, false, true);
  table.api().search("").draw();
});
