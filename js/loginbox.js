
/**
 * Add appear and disappear events to Login-box.
 */
Drupal.behaviors.loginbox = function(context) {
  var $loginbox = $('#loginbox', context);

  $loginbox
    .bind('appear', function() {
      $loginbox.show();
    })
    .bind('disappear', function() {
      $loginbox.hide();
    });
};
