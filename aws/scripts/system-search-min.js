$(document).ready(function(){function a(){for(var a=document.getElementById("filters"),n=a.getElementsByTagName("input"),i=0,c=n.length;i<c;i++)"radio"===n[i].type&&"5"===n[i].name?(n[i].onchange=e,console.log(String(n[i]))):"checkbox"===n[i].type?n[i].onchange=t:"radio"===n[i].type&&"1"===n[i].name&&(n[i].onchange=t)}function e(){i.api().draw()}function t(){var a=$('input:radio[name="'+this.name+'"]:checked').map(function(){return"ULC"===this.value?"ULC|cUL":"^"+this.value+"$"}).get().join("|"),e=$('input:checkbox[name="'+this.name+'"]:checked').map(function(){return this.value}).get().join("|"),t=a+e;console.log(t),i.fnFilter(t,this.name,!0,!1,!1,!0)}$("#systems").DataTable({ajax:"json/systems-3-min.json",columns:[{data:"designNumber"},{data:"testingAuthority"},{data:"systemType"},{data:"jointType"},{data:"jointCondition"},{data:"maxJointWidth"},{data:"penetrationType"},{data:"maxSizePenetrant"},{data:"appMethod"},{data:"moveC"},{data:"fRating"},{data:"tRating"},{data:"trade"},{data:"minASpace"},{data:"maxASpace"},{data:"sleeve"},{data:"insulationType"},{data:"lRating"},{data:"moldMildew"},{data:"seismic"},{data:"wRating"},{data:"stcRating"},{data:"products"},{data:"link"}],columnDefs:[{class:"short",targets:[3,4]},{targets:[6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22],visible:!1},{targets:23,data:"link",render:function(a,e,t,n){return'<a href="'+a+'"><i class="fa fa-download" aria-hidden="true"></i></a>'}}],scrollX:!0,sDom:'<<rt><"paging"lip>>'});var n=$("#systems").DataTable(),i=$("#systems").dataTable(),c=[],d=0,o=NaN;$("#tableSearch").on("keyup",function(){i.api().search(this.value).draw()}),a(),$("#clear-all").click(function(){$("input[type=checkbox]:checked").each(function(){this.click()});for(var a=document.getElementById("tAuth"),e=a.getElementsByTagName("input"),t=0,n=e.length;t<n;t++)"ULC"===e[t].value?e[t].checked=!0:e[t].checked=!1;for(var c=document.getElementById("jWidth"),d=c.getElementsByTagName("input"),o=0,s=d.length;o<s;o++)""===d[o].value?d[o].checked=!0:d[o].checked=!1;document.getElementById("tableSearch").value="",i.fnFilter("ULC|cUL",1,!0,!1,!1,!0),i.api().search("").draw()})}),$.fn.dataTable.ext.search.push(function(a,e,t){for(var n=0,i,c=document.getElementById("jWidth"),d=c.getElementsByTagName("input"),o=0,s=d.length;o<s;o++)d[o].checked&&(i=""===d[o].value?NaN:parseInt(d[o].value));var l=parseFloat(e[5]);return console.log(i,l),!!(isNaN(i)||isNaN(n)&&l<=i||n<=l&&isNaN(i)||n<=l&&l<=i)});