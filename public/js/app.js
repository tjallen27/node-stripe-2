$(function() {
$('a[href*=\\#]:not([href=\\#])').click(function() {
if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
var target = $(this.hash);
target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
if (target.length) {
  $('html,body').animate({
    scrollTop: target.offset().top
  }, 1000);
  return false;
}
}
});
});

jQuery(function ($) {
'use strict';
var supportsAudio = !!document.createElement('audio').canPlayType;
if (supportsAudio) {
  var index = 0,
      playing = false,
      mediaPath = 'https://archive.org/download/mythium/',
      extension = '',
      tracks = [{
          "track": 1,
          "name": "All This Is",
          "duration": "2:46",
          "file": "JLS_ATI"
      }, {
          "track": 2,
          "name": "The Forsaken",
          "duration": "8:30",
          "file": "BS_TF"
      }, {
          "track": 3,
          "name": "All The King's Men",
          "duration": "5:01",
          "file": "BS_ATKM"
      }, {
          "track": 4,
          "name": "The Forsaken",
          "duration": "8:31",
          "file": "BSFM_TF"
      }],
      buildPlaylist = $(tracks).each(function(key, value) {
          var trackNumber = value.track,
              trackName = value.name,
              trackDuration = value.duration;
          if (trackNumber.toString().length === 1) {
              trackNumber = '0' + trackNumber;
          }
          $('#plList').append('<li><div class="plItem">.</span><span class="plTitle">' + trackName + '</span><span class="plLength">' + trackDuration + '</span></div></li>');
      }),
      trackCount = tracks.length,
      npAction = $('#npAction'),
      npTitle = $('#npTitle'),
      audio = $('#audio1').on('play', function () {
          playing = true;
          npAction.text('Now Playing...');
      }).on('pause', function () {
          playing = false;
          npAction.text('Paused...');
      }).on('ended', function () {
          npAction.text('Paused...');
          if ((index + 1) < trackCount) {
              index++;
              loadTrack(index);
              audio.play();
          } else {
              audio.pause();
              index = 0;
              loadTrack(index);
          }
      }).get(0),
      btnPrev = $('#btnPrev').on('click', function () {
          if ((index - 1) > -1) {
              index--;
              loadTrack(index);
              if (playing) {
                  audio.play();
              }
          } else {
              audio.pause();
              index = 0;
              loadTrack(index);
          }
      }),
      btnNext = $('#btnNext').on('click', function () {
          if ((index + 1) < trackCount) {
              index++;
              loadTrack(index);
              if (playing) {
                  audio.play();
              }
          } else {
              audio.pause();
              index = 0;
              loadTrack(index);
          }
      }),
      li = $('#plList li').on('click', function () {
          var id = parseInt($(this).index());
          if (id !== index) {
              playTrack(id);
          }
      }),
      loadTrack = function (id) {
          $('.plSel').removeClass('plSel');
          $('#plList li:eq(' + id + ')').addClass('plSel');
          npTitle.text(tracks[id].name);
          index = id;
          audio.src = mediaPath + tracks[id].file + extension;
      },
      playTrack = function (id) {
          loadTrack(id);
          audio.play();
      };
  extension = audio.canPlayType('audio/mpeg') ? '.mp3' : audio.canPlayType('audio/ogg') ? '.ogg' : '';
  loadTrack(index);
}
});

// initialize plyr
plyr.setup($('#audio1'), {});
