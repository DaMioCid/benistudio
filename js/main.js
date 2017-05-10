var core = (function () {

    var captionArr = ['caption-big', 'caption-big-1', 'caption-big-1', 'caption-mid'],
        shrinkArr = ['shrink-1', 'shrink-2', 'shrink-3', 'shrink-4'],
        $imgId, $caption, $imgShrink;

    function detectSize($imgs, detected) {
        // console.log($imgs);
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
        $imgs
            .on('mouseenter', { size: size, index: index }, showCaption)
            .on('mouseleave', { size: size, index: index }, hideCaption);
    }

    function showCaption(e) {
        $imgId = $(this).attr('id');
        if (e.data.size) {
            $caption = $('#' + $imgId).closest('.row').find('.' + $imgId);
            $imgShrink = $caption.siblings("IMG").attr('id');
            $caption.addClass(captionArr[e.data.index]);

            if ($imgShrink === "parchment-chair" || $imgShrink === "lamp" || $imgShrink === "console-1") {
                $('#' + $imgShrink).addClass(shrinkArr[e.data.index]);
            }
        } else {
            $('#' + $imgId).siblings('.caption-s').addClass('caption-f6');
        }
    }

    function hideCaption(e) {
        if (e.data.size) {
            $('#' + $imgShrink).removeClass(shrinkArr[e.data.index]);
            $caption.removeClass(captionArr[e.data.index]);
        } else {
            $('#' + $imgId).siblings('.caption-s').removeClass('caption-f6');
        }
    }

    function beniPics(x, y) {
        var xId = x.attr('id'),
            xSId = x.next().attr('id');

        $('#' + xId).hover(function () {
            $('#' + xId).animate({
                opacity: 0,
                height: 0
            }, 1000);
            $('#' + xSId).animate({
                height: y,
                opacity: 1
            }, 1000);
        });
        $('#' + xSId).hover(function () {
            $('#' + xSId).animate({
                opacity: 0,
                height: 0
            }, 1000);
            $('#' + xId).animate({
                height: y,
                opacity: 1
            }, 1000);
        });
    }

    var public = {
        gallPics: function (x, y) {
            detectSize(x, y);
        },
        homePics: function (x, y) {
            beniPics(x, y);
        }
    }
    return public;
})();

(function ($, core) {
    var $homeImgs = $('#home IMG');
        $galleryImgs = $('#gallery IMG')
        $windowWidth = $(window).width(),
        $initImgGallerySize = $('#console-1').css('height'),
        $initImgHomeSize = $('#beni-1').css('height');

    $('li').click(function () {
        $('html, body').animate({
            scrollTop: $($(this).attr('href')).offset().top
        }, 500);
        return false;
    });

    core.gallPics($galleryImgs, $initImgGallerySize);
    core.homePics($homeImgs, $initImgHomeSize);

    $(window).resize(function () {
        if ($windowWidth != $(window).width()) {
            location.reload();
            return;
        }
        core.gallPics($galleryImgs, $initImgGallerySize);
    });
})(jQuery, core);