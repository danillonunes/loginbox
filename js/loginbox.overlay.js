/**
 * Add overlay under Login-box.
 */
Drupal.behaviors.loginboxOverlay = function(context) {
  var $loginbox = $('#loginbox', context),
      $overlay = $('<div id="loginbox-overlay" />').hide();

  $overlay.insertBefore($loginbox);

  Drupal.loginBox.beforeAppear.overlay = function() {
    $overlay.show();
  };

  Drupal.loginBox.beforeDisappear.overlay = function() {
    $overlay.hide();
  };
};
