/**
 * Add overlay under Login-box.
 */
Drupal.behaviors.loginboxOverlay = function(context) {
  var $loginbox = $('#loginbox', context),
      $overlay = $('<div id="loginbox-overlay" />').hide();

  $overlay.insertBefore($loginbox);

  Drupal.loginBox.beforeOpen.overlay = function() {
    $overlay.show();
  };

  Drupal.loginBox.beforeClose.overlay = function() {
    $overlay.hide();
  };
};
