/**
 * Initialize global Login-box Overlay variable.
 */
Drupal.loginBox.overlay = Drupal.loginBox.overlay || {};

/**
 * Add overlay under Login-box.
 */
Drupal.behaviors.loginboxOverlay = function(context) {
  var $loginbox = $('#loginbox', context),
      $overlay = $('<div id="loginbox-overlay" />').hide();

  $overlay.insertBefore($loginbox);

  Drupal.loginBox.beforeOpen.overlay = function() {
    var settings = Drupal.loginBox.overlay.settings();
    if ($.isFunction(settings.open.start)) {
      settings.open.start.call($overlay);
    }
    $overlay.animate(settings.open.animate.properties, settings.open.animate.options);
  };

  Drupal.loginBox.beforeClose.overlay = function() {
    var settings = Drupal.loginBox.overlay.settings();
    if ($.isFunction(settings.close.start)) {
      settings.close.start.call($overlay);
    }
    $overlay.animate(settings.close.animate.properties, settings.close.animate.options);
  };
};

/**
 * Return Login-box Overlay default settings.
 *
 * The overlay is faded in/out by default.
 */
Drupal.loginBox.overlay.defaultSettings = function() {
  var duration = 100,
      settings = {
        open: {

          /**
           * This function is called before the animation starts.
           */
          start: function() {
            $(this)
              .css({
                display: 'block',
                opacity: 0
              });
          },

          /**
           * The animate properties and options.
           *
           * @see http://api.jquery.com/animate
           */
          animate: {
            properties: {
              opacity: 1
            },
            options: {
              duration: duration
            }
          }
        },
        close: {

          /**
           * This function is called before the animation starts.
           */
          start: function() {},

          /**
           * The animate properties and options.
           *
           * @see http://api.jquery.com/animate
           */
          animate: {
            properties: {
              opacity: 0
            },
            options: {
              duration: duration,
              complete: function() {
                $(this).hide()
              }
            }
          }
        }
      };

  return settings;
};

/**
 * Return Login-box Overlay settings.
 */
Drupal.loginBox.overlay.settings = function() {
  var settings = Drupal.settings.loginBox || {},
      settingsOverlay = settings.overlay || {},
      defaultSettings = Drupal.loginBox.overlay.defaultSettings();

  return $.extend(true, {}, defaultSettings, settingsOverlay);
};
