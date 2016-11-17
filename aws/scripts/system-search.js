$(document).ready(function() {

  $('#systems').DataTable({
    "ajax": "json/systems-3-min.json",
    "columns": [
      { "data": "designNumber" },
      { "data": "testingAuthority" },
      { "data": "systemType" },
      { "data": "jointType" },
      { "data": "jointCondition"},
      { "data": "maxJointWidth" },
      { "data": "penetrationType" },
      { "data": "maxSizePenetrant" },
      { "data": "appMethod" },
      { "data": "moveC" },
      { "data": "fRating" },
      { "data": "tRating" },
      { "data": "trade" },
      { "data": "minASpace" },
      { "data": "maxASpace" },
      { "data": "sleeve" },
      { "data": "insulationType" },
      { "data": "lRating" },
      { "data": "moldMildew" },
      { "data": "seismic" },
      { "data": "wRating" },
      { "data": "stcRating" },
      { "data": "products" },
      { "data": "link"}
    ],
    "columnDefs": [
      {
        "class" : "short",
        "targets": [3,4],
      },
      // { "width": "100px", "targets": [0,1,2,3] },
      // { "width": "120px", "targets": 4 },
      // { "width": "70px", "targets": 5 },
      {
        "targets": [6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22],
        "visible": false
      },
      // Add Download Link
      {
        "targets" : 23,
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
      if (cBoxes[i].type === 'radio' && cBoxes[i].name === '5') {
        cBoxes[i].onchange = updateTable;
        console.log(String(cBoxes[i]));
      } else if (cBoxes[i].type === 'checkbox') {
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
    console.log(s);
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
    // maxJointWidth
    var jw = document.getElementById('jWidth');
    var jWidths = jw.getElementsByTagName('input');
    for (var a=0, ln = jWidths.length; a<ln; a++) {
      if(jWidths[a].value === "") {
        jWidths[a].checked = true;
      } else {
        jWidths[a].checked = false;
      }
    }
    // Reset Textbox
    document.getElementById('tableSearch').value = "";
    table.fnFilter("ULC|cUL", 1, true, false, false, true);
    table.api().search("").draw();
  });

});

$.fn.dataTable.ext.search.push(
  function( settings, data, dataIndex ) {
    var min = 0;
    var max;
    var panel = document.getElementById('jWidth');
    var options = panel.getElementsByTagName('input');
    for (var i=0, len=options.length; i<len; i++) {
      if (options[i].checked) {
        max = (options[i].value === "") ? NaN : parseInt(options[i].value);
      }
    }
    // var max = (selector.value === "") ? NaN : parseInt(selector.value);
    var colVal = parseFloat( data[5] ); // use data for the age column
    console.log(max, colVal);

    if ( (isNaN( max ) ) ||
       ( isNaN( min ) && colVal <= max ) ||
       ( min <= colVal   && isNaN( max ) ) ||
       ( min <= colVal   && colVal <= max ) )
    {
      return true;
    }
    return false;
  }
);