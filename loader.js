let progressWidth = 0;

let loaded;

console.time('load');

function loadFiles(file, callback) {

  loadFile(file, () => {});
};

function loadFile(file, callback) {
  var progressBar = $('#progressBar'),
    loadingPanel = $('#loadingPanel');

  // file.url += '?' + REVISION; // тут мы добавляем номер ревизии, чтобы при каждом билде файл перезакачивался заново

  $.ajax({
    xhr: function () {
      var xhr = new window.XMLHttpRequest();

      if ('onprogress' in xhr) {
        progressBar.parent().show();
        loadingPanel.hide();

        var last = 0, max = 100 / 1;
        xhr.addEventListener("progress", function (evt) {
          if (evt.lengthComputable) {
            var percentComplete = Math.min((evt.loaded / evt.total) * max, max);

            if (last < percentComplete) {
              progressWidth += percentComplete - last;
              last = percentComplete;

              const rect_animate = document.getElementById('rect_animate');
              if (rect_animate) {
                rect_animate.style.height = progressWidth + '%';
              }

              if (Math.round(progressWidth * 100) >= 10000) {
                if (!loaded) {
                  const source = document.createElement('source');
                  source.type = "video/mp4";
                  source.src = file.url;

                  $('#video_bg').append(source);
                  loaded = true;
                  console.timeEnd('load');
                }
              }
            }
          }
        }, false);
      }

      return xhr;
    },

    type: 'GET',
    url: file.url,
    success: function (data) {
      if (file.type == 'style') {
        $('head').append('<link rel="stylesheet" type="text/css" href="' + file.url + '" media="screen" />');
      } else if (file.type == 'script') {}

      callback();
    },
    cache: true
  });
}

function evalJS(text) {
  try {

    // eval.call(window, text);
  } catch (error) {
    window.console && console.error(error);
  }
}

window.file = {url: '/assets/video/video.h264.mp4', type: 'video'};

loadFiles(window.file);


