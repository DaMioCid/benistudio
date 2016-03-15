$(document).ready(function () {
  $('li').click(function(){
       console.log(this)
      $('html, body').animate({
        scrollTop: $( $(this).attr('href')).offset().top
      }, 500);
      return false;
  });
});
