
/**
 * Initialize global Login-box object and it's settings variables.
 */
Drupal.loginBox = Drupal.loginBox || {};
Drupal.settings.loginBox = Drupal.settings.loginBox || {};

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

/**
 * Close Login-box whith Esc.
 */
Drupal.behaviors.loginboxCloseKey = function(context) {
  var $document = $(document),
      $loginbox = $('#loginbox', context),
      closeKey = Drupal.settings.loginBox.closeKey || 27;

  $loginbox
    .bind('afterOpen.closeKey', function() {
      $document
        .bind('keyup.loginboxCloseKey', function(event) {
          if (event.keyCode == closeKey) {
            $loginbox.trigger('close');
          }
        });
    })
    .bind('beforeClose.closeKey', function() {
      $document.unbind('keyup.loginboxCloseKey');
    });
};

/**
 * Focus the first input when open Login-box.
 */
Drupal.behaviors.loginboxFocus = function(context) {
  var $loginbox = $('#loginbox', context);

  $loginbox
    .bind('afterOpen.focus', function() {
      $loginbox.find('input:first').trigger('focus');
    });
};
