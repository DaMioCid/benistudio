$(function() {

    $('li').click(function() {
        $('html, body').animate({
            scrollTop: $($(this).attr('href')).offset().top
        }, 500);
        return false;
    });

    var windowWidth = $(window).width(),
        imgDetection = $('#console-1').css('height'),
        imgBeni = $('#beni-1').css('height');

    $(function() {
        detectWindowSize(imgDetection);
    });

    $(window).resize(function() {
        if (windowWidth != $(window).width()) {
            location.reload();
            return;
        }
        detectWindowSize(imgDetection);
    });


    $('#beni-1').hover(function() {
      $('#beni-1').animate({
      opacity:0,
      height: 0

    }, 1000);

      $('#beni-2').animate({
      height: imgBeni,
      opacity: 1

    }, 1000);
    });

    $('#beni-2').hover(function() {
      $('#beni-2').animate({
        opacity:0,
        height: 0

    }, 1000);

      $('#beni-1').animate({
      height: imgBeni,
      opacity:1

    }, 1000);
    });

});

function detectWindowSize(e) {
    if (e === "730px") {
        images('caption-big', 'shrink-1');
    } else if (e === "520px") {
        images('caption-big-1', 'shrink-2');
    } else if (e === "450px") {
        images('caption-big-1', 'shrink-3');
    } else if (e === "320px") {
        images('caption-mid', 'shrink-4');
    } else if (e === "580px" || e === "440px") {
        xsmImages();
    }
}

function images(x, y) {
    var $imgs = $('.row IMG'),
        $imgId, $caption;
    $imgs.on('mouseenter', showCaption).on('mouseleave', hideCaption);

    function showCaption() {
        $imgId = $(this).attr('id');
        $caption = $('#' + $imgId).closest('.row').find('.' + $imgId);
        $imgShrink = $caption.siblings("IMG").attr('id');
        $caption.addClass(x);

        if ($imgShrink === "parchment-chair" || $imgShrink === "lamp" || $imgShrink === "console-1") {
            $('#' + $imgShrink).addClass(y);
        }
    }
    function hideCaption() {
        $('#' + $imgShrink).removeClass(y);
        $caption.removeClass(x);
    }
}

function xsmImages() {
    var $imgs = $('.row IMG'),
        $img;

  $imgs.on('mouseenter', showCaption).on('mouseleave', hideCaption);

  function showCaption() {
    $img = $(this).attr('id');
    $('#' + $img).siblings('.caption-s').addClass('caption-f6');
  }
  function hideCaption() {
    $('#' + $img).siblings('.caption-s').removeClass('caption-f6');
  }
}
