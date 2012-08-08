
/**
 * Initialize global Login-box variable.
 */
Drupal.loginBox = Drupal.loginBox || {};

/**
 * Add open and close events to Login-box.
 */
Drupal.behaviors.loginbox = function(context) {
  var $loginbox = $('#loginbox', context);

  $loginbox
    .bind('open', function() {
      $loginbox
        .trigger('beforeOpen')
        .show()
        .trigger('afterOpen');
    })
    .bind('close', function() {
      $loginbox
        .trigger('beforeClose')
        .hide()
        .trigger('afterClose');
    })
    .bind('toggle', function() {
      if ($loginbox.is(':hidden')) {
        $loginbox.trigger('open');
      }
      else {
        $loginbox.trigger('close');
      }
    });
};
