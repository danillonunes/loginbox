/**
 * Append close button to Login-box element.
 */
Drupal.behaviors.loginboxClose = function(context) {
  var $loginbox = $('#loginbox', context),
      $close = $('<button class="loginbox-close">' + Drupal.t('Close') + '</button>');

  $close
    .appendTo($loginbox)
    .bind('click', function() {
      $loginbox.trigger('close');
    });
};
