
var JSZip = require('jszip'),
  Q = require('q'),
  FileSaver = require('file-saver');

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
//
// var files = [{filename: 'C-AJ-0017.pdf', url: 'designs/C-AJ-0017.pdf'}, {filename: 'C-AJ-0029.pdf', url: 'designs/C-AJ-0029.pdf'}];
// var files = getFilesArray();
// var zip = new JSZip();
var zip, files;

function bindEvent(el, eventName, eventHandler) {
  if (el.addEventListener){
    // standard way
    el.addEventListener(eventName, eventHandler, false);
  } else if (el.attachEvent){
    // old IE
    el.attachEvent('on'+eventName, eventHandler);
  }
}

function updateDownloadButton(f) {
  files = f;
  zip = new JSZip();
  files.reduce(function(p, o) {
    return p.then(function() {
      return downloadFile(o.url).then(function(arrayBuffer) {
        zip.file(o.filename, arrayBuffer);
        console.log(zip);
      });
    })
  }, Q()).then(function() {
    console.log(zip);
    var blobLink = document.getElementById('download-zip');
    // , blob = zip.generate({type:"blob"});
    if (JSZip.support.blob) {
      function downloadWithBlob() {
        zip.generateAsync({type:"blob"}).then(function (blob) {
          FileSaver.saveAs(blob, "firestop-systems.zip");
        }, function (err) {
            blobLink.innerHTML += " " + err;
        });
        return false;
      }
      bindEvent(blobLink, 'click', downloadWithBlob);
    } else {
      blobLink.innerHTML += " (not supported on this browser)";
    }
  });
};
