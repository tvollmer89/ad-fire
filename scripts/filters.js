$(document).ready(function() {
  var sidebar = document.getElementById('accordion');
  var div = "<div>Test</div>";
  $('#accordion').append("<div>Test</div>");

  var panelHeader = '<div class="panel panel-default">';
  var panelFooter = '</div></div></div>';

  $.getJSON( "json/filters.json", function( data ) {
    console.log("success", data);
    $.each(data.filters, function(i, filter) {
      // Panel Header
      var panelID = filter.category.toLowerCase().replace(/\W/g, '');
      var html = panelHeader + '<div class="panel-heading"><a data-toggle="collapse" href="#' + panelID + '" aria-expanded="false"><h4><i class="fa fa-chevron-down"></i><span class="type">' + filter.category + '</span></h4></a></div>';

      // Panel Body
      html += '<div id="' + panelID + '" class="panel-collapse collapse"><div class="panel-body">';

      // Add inputs
      html += buildCheckbox(filter, panelID);

      html += panelFooter;
      $('#accordion').append(html);
    })
  });

  function buildCheckbox(f, i) {
    var p = document.getElementById(i);
    console.log(p);
    var n = f.name;
    var h = '';
    $.each(f.options, function(i, option) {
      h += '<div class="checkbox"><label><input id="filter-box" type="checkbox" name="'+ n +'" value="' + option.value.toLowerCase() + '" onchange="updateSearch()">';
      h += option.text + '</label></div>';
    })
    return h;
  }

  $('#filter-box').each
});