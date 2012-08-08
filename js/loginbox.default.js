/**
 * Centralize Login-box element.
 */
Drupal.behaviors.loginboxDefaultCentralize = function(context) {
  var $window = $(window),
      $loginbox = $('#loginbox', context),
      blink,
      centralize;

  /**
   * In order to centralize Login-box element in the screen, we must get it
   * width and height, but we can't do that when it's hidden.
   *
   * This function is called at first load to rapidly show the box, centralize
   * and hide it.
   */
  blink = function() {
    var visibility;
    if ($loginbox.is(':hidden')) {
      $loginbox.show();
      visibility = $loginbox.css('visibility');
      $loginbox.css('visibility', 'hidden');

      centralize();

      $loginbox.hide();
      $loginbox.css('visibility', visibility);
    }
  };

  /**
   * Position the Login-box element in center of the window.
   */
  centralize = function() {
    var lh = $loginbox.height(),
        lw = $loginbox.width(),

        ww = $window.width(),
        wh = $window.height(),

        top = (wh / 2) - (lh / 2),
        left = (ww / 2) - (lw / 2);

    $loginbox.css({
      left: left,
      top: top
    });
  }

  $loginbox.bind('afterOpen.defaultCentralize', function() {
    centralize();
  });

  blink();
};
