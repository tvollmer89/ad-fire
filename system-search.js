var JSZip = require('jszip'),
  Q = require('q'),
  FileSaver = require('file-saver'),
  ProgressBar = require('progressbar.js');;

var downloadFile = function(url) {
  var defer = Q.defer();
  var xhr = new XMLHttpRequest();
  xhr.open('GET', url, true);
  xhr.responseType = 'arraybuffer';
  xhr.onreadystatechange = function() {
    if (xhr.readyState === 4) {
      if (xhr.status < 400) {
        defer.resolve(xhr.response);
      } else {
        defer.reject(new Error("Failed to load file from server"));
      }
    }
  };
  xhr.send();
  return defer.promise;
};


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
}

function updateFilesArray(rowIds) {
  var allFiles = [];
  var pre = "designs/";
  var ext = ".pdf";
  $.each(rowIds, function(index, value){
    var n = "designs/".concat(value, ".pdf");
    var file = {
      "filename" : value.concat(".pdf"),
      "url" : n
    };
    allFiles.push(file);
  })
  return allFiles;
}

function showProgress(t) {
  var bar = new ProgressBar.Line('#progress', {
    color: '#666666',
    easing: 'easeInOut',
    svgStyle: {
        display: 'block',
        width: '80%'
    }
  });
  bar.animate(1);
}

$(document).ready(function() {
  $('#systems').DataTable({
    "ajax": "json/ULC.json",
    responsive: {
        details: {
            type: 'column',
            target: 'tr',
            renderer: function ( api, rowIdx, columns ) {
              var data = $.map( columns, function ( col, i ) {
                if (col.data === "") {
                  return;
                }
                var liItem;
                if (col.columnIndex >= 13 && col.columnIndex<= 20) {
                  liItem = '<li data-dt-row="'+col.rowIndex+'" data-dt-column="'+col.columnIndex+'" class="col-md-6">';
                } else {
                  liItem = '<li data-dt-row="'+col.rowIndex+'" data-dt-column="'+col.columnIndex+'" class="col-md-12">';
                };
                return col.hidden ?
                  liItem + '<span class="dtr-title">'+col.title+':'+'</span> '+ '<span class="dtr-data">'+col.data+'</span>'+ '</li>' : '';
              } ).join('');
              return data ?
                  $('<ul class="col-md-12"/>').append( data ) :
                  false;
          }
        }
    },
    "columns": [
      { "data": "selected"},
      { "data": "designNumber", className: "design-num" },
      { "data": "testingAuthority" },
      { "data": "systemType" },
      { "data": "jointType"},//4
      { "data": "jointCondition"},//5
      { "data": "maxJointWidth" },//6
      { "data": "penetrationCons" },//7
      { "data": "penetrationType" },//8
      { "data": "maxSizePenetrant" },//9
      { "data": "appMethod" },//10
      { "data": "products", className: "products-col" },//11
      { "data": "moveC" },
      { "data": "fRating" },
      { "data": "ftRating" },
      { "data": "fhRating" },
      { "data": "fthRating" },
      { "data": "minASpace" },
      { "data": "maxASpace" },
      { "data": "sleeve" },
      { "data": "insulationType" },
      { "data": "lRating" },//20
      // { "data": "moldMildew" },
      // { "data": "seismic" },
      // { "data": "wRating" },
      // { "data": "stcRating" },
      // { "data": "trade" },
      { "data": "link", className: "pdf-col"}
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
        'targets':1,
        // 'width': "15%",
        'render': function(data, type, full, meta) {
          return '<i class="fa fa-chevron-down"></i><span>'+ data + '</span>';
        }
      },
      {
        "targets": [2,3,4,5,6,7,8,9,10,12,13,14,15,16,17,18,19,20,21],
        "className": 'none'
      },
      // {
      //   "targets": [6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25],
      //   "visible": false
      // },
      {
        "targets": [2,3,4,5,6,11, -1],
        "orderable": false
      },
      //responsive
      { responsivePriority: 1, targets: 0 },
      { responsivePriority: 2, targets: 1 },
      { responsivePriority: 3, targets: -1 },
      { responsivePriority: 4, targets: 11},
      // Add Download Link
      {
        "targets" : 22,
        "data" : "link",
        render: function ( data, type, full, meta ) {
          return '<a href="designs/'+data+'.pdf" download><i class="fa fa-download" aria-hidden="true"></i></a>';
        }
      }
    ],
    "infoCallback": function( settings, start, end, max, total, pre ) {
      return start +" - "+ end + " of " + total;
    },
    "pageLength": 25,
    "language": {
        paginate: {
            previous: '‹',
            next:     '›'
        },
        aria: {
            paginate: {
                previous: 'Previous',
                next:     'Next'
            }
        }
      },
    "order": [[1, 'asc']],
    //"scrollX": true,
    "sDom": "<'row'<'col-sm-12'l>>" + "<'row'<'col-sm-12'tr>>" + "<'row'<'col-sm-5'i><'col-sm-7'p>>",
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
  var filesArray = [];
  document.getElementById("download-zip").disabled = true;

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

    var $row = $(this).closest('tr');

    // Get row data
    var data = table.api().row($row).data();

    // Get row ID
    var rowId = data.link;
    console.log(rowId);
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

    //update selected files array
    filesArray = updateFilesArray(rows_selected);
    if (filesArray.length > 0) {
      document.getElementById("download-zip").disabled = false;
    } else if (filesArray.length === 0) {
      document.getElementById("download-zip").disabled = true;
    }

    // Prevent click event from propagating to parent
    e.stopPropagation();
  });

  // Handle table draw event
  table.on('draw', function(){
    // Update state of "Select all" control
    updateDataTableSelectAllCtrl(t);
  });


  // Add Download Selected Event Listener
  $('#download-zip').on('click', function() {
    showProgress();
    var zip = new JSZip();
    filesArray.reduce(function(p, o) {
      return p.then(function() {
        return downloadFile(o.url).then(function(arrayBuffer) {
          zip.file(o.filename, arrayBuffer);
        });
      })
    }, Q()).then(function() {
      if (JSZip.support.blob) {
        function downloadWithBlob() {
          zip.generateAsync({type:"blob"}).then(function (blob) {
            FileSaver.saveAs(blob, "firestop-systems.zip");
          }, function (err) {
              blobLink.innerHTML += " " + err;
          });
          return false;
        }
        downloadWithBlob();
      } else {
        blobLink.innerHTML += " (not supported on this browser)";
        function downloadWithDataURI() {
          zip.generateAsync({type:"base64"}).then(function (base64) {
            window.location = "data:application/zip;base64," + base64;
          }, function (err) {
            // shouldn't happen with a base64...
          });
        }
        downloadWithDataURI();
      }
    });
  });



      // Handle click on "Select all" control
   $('thead input[name="select_all"]', t.table().container()).on('click', function(e){
      if(this.checked){
         $('#systems tbody input[type="checkbox"]:not(:checked)').trigger('click');
      } else if (this.indeterminate) {
        $('#systems tbody input[type="checkbox"]:checked').trigger('click');
      } else {
         $('#systems tbody input[type="checkbox"]:checked').trigger('click');
      }
      // Prevent click event from propagating to parent
      e.stopPropagation();
   });

});