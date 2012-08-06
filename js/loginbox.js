
/**
 * Initialize global Login-box variable.
 */
Drupal.loginBox = Drupal.loginBox || {};

/**
 * Call Login-box plugins for a given hook.
 *
 * This function is similar to Drupal's module_invoke_all().
 *
 * @param hook
 *   String with the hook name.
 */
Drupal.loginBox.invokeAll = function(hook) {
  var hooks = Drupal.loginBox[hook] || {},
      i;

  for (i in hooks) {
    if (hooks.hasOwnProperty(i) && typeof hooks[i] === 'function') {
      hooks[i]();
    }
  }
};

/**
 * Add open and close events to Login-box.
 */
Drupal.behaviors.loginbox = function(context) {
  var $loginbox = $('#loginbox', context);

  Drupal.loginBox.beforeOpen = Drupal.loginBox.beforeOpen || {};
  Drupal.loginBox.beforeClose = Drupal.loginBox.beforeClose || {};

  Drupal.loginBox.afterOpen = Drupal.loginBox.afterOpen || {};
  Drupal.loginBox.afterClose = Drupal.loginBox.afterClose || {};

  $loginbox
    .bind('open', function() {
      Drupal.loginBox.invokeAll('beforeOpen');
      $loginbox.show();
      Drupal.loginBox.invokeAll('afterOpen');
    })
    .bind('close', function() {
      Drupal.loginBox.invokeAll('beforeClose');
      $loginbox.hide();
      Drupal.loginBox.invokeAll('afterClose');
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
