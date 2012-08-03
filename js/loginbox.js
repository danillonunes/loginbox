
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
 * Add appear and disappear events to Login-box.
 */
Drupal.behaviors.loginbox = function(context) {
  var $loginbox = $('#loginbox', context);

  Drupal.loginBox.beforeAppear = Drupal.loginBox.beforeAppear || {};
  Drupal.loginBox.beforeDisappear = Drupal.loginBox.beforeDisappear || {};

  Drupal.loginBox.afterAppear = Drupal.loginBox.afterAppear || {};
  Drupal.loginBox.afterDisappear = Drupal.loginBox.afterDisappear || {};

  $loginbox
    .bind('appear', function() {
      Drupal.loginBox.invokeAll('beforeAppear');
      $loginbox.show();
      Drupal.loginBox.invokeAll('afterAppear');
    })
    .bind('disappear', function() {
      Drupal.loginBox.invokeAll('beforeDisappear');
      $loginbox.hide();
      Drupal.loginBox.invokeAll('afterDisappear');
    });
};
