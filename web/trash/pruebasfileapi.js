      //identifica si el navegador soporta el FILE API
    /*if(window.File && window.FileReader && window.FileList && window.Blob) {
        alert("Great success! All the File APIs are supported.");
    }else{
     alert('The File APIs are not fully supported in this browser.');
   }*/
    alert = function(msg){
    $.jgrid.info_dialog(
        $.jgrid.regional["es"].errors.errcap,
        '<div class="ui-state-error"> '+ msg +'</div>',
        $.jgrid.regional["es"].edit.bClose,
        {buttonalign: 'right', styleUI: 'Bootstrap'}
    );
};

//CARACTERISTICAS DEL ARCHIVO
//    function handleFileSelect1(evt) {
//        var files = evt.target.files;
//        var output = [];
//        for (var i = 0, f; f = files[i]; i++) {
//          output.push('<li><strong>', escape(f.name), '</strong> (', f.type || 'n/a', ') - ',
//                      f.size, ' bytes, last modified: ',
//                      f.lastModifiedDate ? f.lastModifiedDate.toLocaleDateString() : 'n/a',
//                      '</li>');
//        }
//        document.getElementById('list').innerHTML = '<ul>' + output.join('') + '</ul>';
//    }
//    document.getElementById('files').addEventListener('change', handleFileSelect1, false);
//  
////DRAG AND DROP
//    function handleFileSelect2(evt) {
//        evt.stopPropagation();
//        evt.preventDefault();
//
//        var files = evt.dataTransfer.files; // FileList object.
//
//        // files is a FileList of File objects. List some properties.
//        var output = [];
//        for (var i = 0, f; f = files[i]; i++) {
//          output.push('<li><strong>', escape(f.name), '</strong> (', f.type || 'n/a', ') - ',
//                      f.size, ' bytes, last modified: ',
//                      f.lastModifiedDate ? f.lastModifiedDate.toLocaleDateString() : 'n/a',
//                      '</li>');
//        }
//        document.getElementById('list2').innerHTML = '<ul>' + output.join('') + '</ul>';
//    }
//    function handleDragOver(evt) {
//      evt.stopPropagation();
//      evt.preventDefault();
//      evt.dataTransfer.dropEffect = 'copy'; // Explicitly show this is a copy.
//    }
//
//    // Setup the dnd listeners.
//    var dropZone = document.getElementById('drop_zone');
//    dropZone.addEventListener('dragover', handleDragOver, false);
//    dropZone.addEventListener('drop', handleFileSelect2, false);
//    
////LECTURA DE ARCHIVOS (imagenes)
//function handleFileSelect3(evt) {
//    var files = evt.target.files; // FileList object
//
//    // Loop through the FileList and render image files as thumbnails.
//    for (var i = 0, f; f = files[i]; i++) {
//
//      // Only process image files.
//      if (!f.type.match('image.*')) {
//        continue;
//      }
//
//      var reader = new FileReader();
//
//      // Closure to capture the file information.
//      reader.onload = (function(theFile) {
//        return function(e) {
//          // Render thumbnail.
//          var span = document.createElement('span');
//          span.innerHTML = ['<img class="thumb" src="', e.target.result,
//                            '" title="', escape(theFile.name), '"/>'].join('');
//          document.getElementById('list3').insertBefore(span, null);
//        };
//      })(f);
//
//      // Read in the image file as a data URL.
//      reader.readAsDataURL(f);
//    }
//  }
//  document.getElementById('files2').addEventListener('change', handleFileSelect3, false);
//
//  //LECTURA DE CONTENIDO DEL ARCHIVO
//  
//  function readBlob(opt_startByte, opt_stopByte) {
//
//    var files = document.getElementById('files3').files;
//    if (!files.length) {
//      alert('Please select a file!');
//      return;
//    }
//
//    var file = files[0];
//    var start = parseInt(opt_startByte) || 0;
//    var stop = parseInt(opt_stopByte) || file.size - 1;
//
//    var reader = new FileReader();
//
//    reader.onloadend = function(evt) {
//        var res;
//      if (evt.target.readyState == FileReader.DONE) { // DONE == 2
//            if (evt.target.result.indexOf(',') >= 0) {
//                res = evt.target.result.split(",").join("COMMA");
//            }
//        document.getElementById('byte_content').textContent = res;
//        // if (evt.target.result.indexOf(',') > -1) { evt.target.result.split(',') };
//        document.getElementById('byte_range').textContent = 
//        ['Read bytes: ', start + 1, ' - ', stop + 1,' of ', file.size, ' byte file'].join('');
//      }
//    };
//
//    var blob = file.slice(start, stop + 1);
//    reader.readAsBinaryString(blob);
//  }
//  
//  document.querySelector('.readBytesButtons').addEventListener('click', function(evt) {
//     
//    if (evt.target.tagName.toLowerCase() == 'button') {
//        
//      var startByte = evt.target.getAttribute('data-startbyte');
//      var endByte = evt.target.getAttribute('data-endbyte');
//      //alert(startByte+endByte);
//      readBlob(startByte, endByte);
//    }
//  }, false);
//  
//  
//  //PROGRESO DE LA CARGA
//   var reader;
//  var progress = document.querySelector('.percent');
//
//  function abortRead() {
//    reader.abort();
//  }
//
//  function errorHandler(evt) {
//    switch(evt.target.error.code) {
//      case evt.target.error.NOT_FOUND_ERR:
//        alert('File Not Found!');
//        break;
//      case evt.target.error.NOT_READABLE_ERR:
//        alert('File is not readable');
//        break;
//      case evt.target.error.ABORT_ERR:
//        break; // noop
//      default:
//        alert('An error occurred reading this file.');
//    };
//  }
//
//  function updateProgress(evt) {
//    // evt is an ProgressEvent.
//    if (evt.lengthComputable) {
//      var percentLoaded = Math.round((evt.loaded / evt.total) * 100);
//      // Increase the progress bar length.
//      if (percentLoaded < 100) {
//        progress.style.width = percentLoaded + '%';
//        progress.textContent = percentLoaded + '%';
//      }
//    }
//  }
//
//  function handleFileSelect4(evt) {
//    // Reset progress indicator on new file selection.
//    progress.style.width = '0%';
//    progress.textContent = '0%';
//
//    reader = new FileReader();
//    reader.onerror = errorHandler;
//    reader.onprogress = updateProgress;
//    reader.onabort = function(e) {
//      alert('File read cancelled');
//    };
//    reader.onloadstart = function(e) {
//      document.getElementById('progress_bar').className = 'loading';
//    };
//    reader.onload = function(e) {
//      // Ensure that the progress bar displays 100% at the end.
//      progress.style.width = '100%';
//      progress.textContent = '100%';
//      setTimeout("document.getElementById('progress_bar').className='';", 2000);
//    };
//
//    // Read in the image file as a binary string.
//    reader.readAsBinaryString(evt.target.files[0]);
//  }
//
//  document.getElementById('files4').addEventListener('change', handleFileSelect4, false);
//  
  
  function cargadearchivos(evt){
       var files = evt.target.files;
        var output = [];
        for (var i = 0, f; f = files[i]; i++) {
            if(f.name.indexOf('AT') >= 0){//ARCHIVOS DE TRANSACCION
                alert("ok");
            }else{
                alert("not");
            }

          output.push(escape(f.name));
        }
        $('#carga').innerHTML = '<ul>' + output.join('') + '</ul>';
    }
    $('#archivos').addEventListener('change', cargadearchivos, false);
  