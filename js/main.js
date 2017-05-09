var core = (function () {

    var captionArr = ['caption-big', 'caption-big-1', 'caption-big-1', 'caption-mid'],
            shrinkArr = ['shrink-1', 'shrink-2', 'shrink-3', 'shrink-4'],
            $imgId, $caption;

    function detectSize($imgs, detected) {
        if (detected === "730px") {
            images($imgs, 0, true);
        } else if (detected === "520px") {
            images($imgs, 1, true);
        } else if (detected === "450px") {
            images($imgs, 2, true);
        } else if (detected === "320px") {
            images($imgs, 3, true);
        } else if (detected === "580px" || detected === "440px") {
            images($imgs, 4, false);
        }
    }

    function images($imgs, index, size) {
        

        $imgs.on('mouseenter', {$imgs:$imgs, size:size, index:index}, showCaption).on('mouseleave', hideCaption);
        

        function showCaption() {
            $imgId = $(this).attr('id');
            if (size) {
                $caption = $('#' + $imgId).closest('.row').find('.' + $imgId);
                $imgShrink = $caption.siblings("IMG").attr('id');
                $caption.addClass(captionArr[index]);

                if ($imgShrink === "parchment-chair" || $imgShrink === "lamp" || $imgShrink === "console-1") {
                    $('#' + $imgShrink).addClass(shrinkArr[index]);
                }
            } else {
                $('#' + $imgId).siblings('.caption-s').addClass('caption-f6');
            }
        }

        function hideCaption() {
            if (size) {
                $('#' + $imgShrink).removeClass(shrinkArr[index]);
                $caption.removeClass(captionArr[index]);
            } else {
                $('#' + $imgId).siblings('.caption-s').removeClass('caption-f6');
            }
        }

    }
    
    var public = {
        info: function (x, y) {
            detectSize(x, y);
        }
    }
    return public;
})();

(function ($, core) {
    var $imgs = $('.row IMG');
    

    $('li').click(function () {
        $('html, body').animate({
            scrollTop: $($(this).attr('href')).offset().top
        }, 500);
        return false;
    });

    var windowWidth = $(window).width(),
        imgDetection = $('#console-1').css('height'),
        imgBeni = $('#beni-1').css('height');

    core.info($imgs, imgDetection);

    $(window).resize(function () {
        if (windowWidth != $(window).width()) {
            location.reload();
            return;
        }
        core.info($imgs, imgDetection);
    });

    $('#beni-1').hover(function () {
        console.log($(this).parent().parent());
        $('#beni-1').animate({
            opacity: 0,
            height: 0
        }, 1000);
        $('#beni-2').animate({
            height: imgBeni,
            opacity: 1
        }, 1000);
    });

    $('#beni-2').hover(function () {
        $('#beni-2').animate({
            opacity: 0,
            height: 0
        }, 1000);
        $('#beni-1').animate({
            height: imgBeni,
            opacity: 1
        }, 1000);
    });
})(jQuery, core);