jQuery(function($){"use strict";function e(){$("#result").removeClass().text("")}function n(n){e(),$("#result").addClass("alert alert-success").text(n)}function r(n){e(),$("#result").addClass("alert alert-danger").text(n)}function t(e){$("#progress_bar").removeClass("hide").find(".progress-bar").attr("aria-valuenow",e).css({width:e+"%"})}function i(e){return new o(function(n,r){JSZipUtils.getBinaryContent(e,function(e,t){e?r(e):n(t)})})}var o=window.Promise;if(o||(o=JSZip.external.Promise),!JSZip.support.blob)return void r("This demo works only with a recent browser !");var s=$("#download_form").on("click",function(){e();var o=new JSZip,s="C-AJ-0017.pdf",a="designs/C-AJ-0017.pdf";return o.file(s,i(a),{binary:!0}),o.generateAsync({type:"blob"},function e(r){var i="progression : "+r.percent.toFixed(2)+" %";r.currentFile&&(i+=", current file = "+r.currentFile),n(i),t(0|r.percent)}).then(function e(r){saveAs(r,"example.zip"),n("done !")},function(e){r(e)}),!1})});