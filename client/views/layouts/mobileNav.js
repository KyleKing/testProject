Template.menu.rendered = function() {
  $(document).ready(function(){
    $('.js-menu-trigger').on('click touchstart', function(e){
      $('.content').toggleClass('is-hidden');
      $('.js-menu').toggleClass('is-visible');
      $('.js-menu-screen').toggleClass('is-visible');
      e.preventDefault();
    });

    $('.js-menu-screen').on('click touchstart', function(e){
      $('.content').toggleClass('is-hidden');
      $('.js-menu').toggleClass('is-visible');
      $('.js-menu-screen').toggleClass('is-visible');
      e.preventDefault();
    });
  });
}