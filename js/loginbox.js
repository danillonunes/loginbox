
/**
 * Initialize global Login-box object and it's settings variables.
 */
var loginBox = loginBox || {};
Drupal.loginBox = Drupal.loginBox || {};
Drupal.settings.loginBox = Drupal.settings.loginBox || {};

/**
 * Add open and close events to Login-box.
 */
Drupal.behaviors.loginbox = function(context) {
  var $loginbox = $('#loginbox', context);

  $loginbox
    .bind('open', function() {
      var animate = new loginBox.open.animate(),
          properties = animate.properties(),
          options = animate.options(),
          complete = options.complete;

      /**
       * Extends complete function to run default afterOpen event.
       */
      options.complete = function() {
        if ($.isFunction(complete)) {
          complete.call(this);
        }
        $loginbox
          .show()
          .trigger('afterOpen');
      };

      $loginbox
        .trigger('beforeOpen')
        .animate(properties, options);
    })
    .bind('close', function() {
      var animate = new loginBox.close.animate(),
          properties = animate.properties(),
          options = animate.options(),
          complete = options.complete;

      /**
       * Extends complete function to run default afterClose event.
       */
      options.complete = function() {
        if ($.isFunction(complete)) {
          complete.call(this);
        }
        $loginbox
          .hide()
          .trigger('afterClose');
      };

      $loginbox
        .trigger('beforeClose')
        .animate(properties, options);
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
 * The default open implementation.
 */
loginBox.open = {
  animate: function() {
    return this;
  }
};

/**
 * Provides properties to animate Login-box on open.
 *
 * You can override the animated properties by writing your own
 * loginBox.open.animate.prototype.properties() method.
 */
loginBox.open.animate.prototype.properties = function() {
  return {
    opacity: 1
  };
};

/**
 * Provides options to animate Login-box on open.
 *
 * You can override the animate options by writing your own
 * loginBox.open.animate.prototype.options() method.
 */
loginBox.open.animate.prototype.options = function() {
  return {
    duration: 0
  };
};

/**
 * The default close implementation.
 */
loginBox.close = {
  animate: function() {
    return this;
  }
};

/**
 * Provides properties to animate Login-box on close.
 *
 * You can override the animated properties by writing your own
 * loginBox.close.animate.prototype.properties() method.
 */
loginBox.close.animate.prototype.properties = function() {
  return {
    opacity: 0
  };
};

/**
 * Provides options to animate Login-box on close.
 *
 * You can override the animate options by writing your own
 * loginBox.close.animate.prototype.options() method.
 */
loginBox.close.animate.prototype.options = function() {
  return {
    duration: 0
  };
};

/**
 * Submit Login-box with ajax.
 */
Drupal.behaviors.loginboxAjaxSubmit = function(context) {
  var $loginbox = $('#loginbox', context),
      $form = $loginbox.find('form:first'),
      $messages = $form.find('.messages-wrapper'),
      $loading = $form.find('.loading');

  if (!$messages.length) {
    $messages = $('<div class="messages-wrapper" />');
    $messages.prependTo($form);
  }

  if (!$loading.length) {
    $loading = $('<div class="loading" />');
    $loading.hide().appendTo($form);
  }

  $loginbox.bind('submit', function(event) {
    $loading.text(Drupal.t('Loading')).show();
    $messages.empty();

    $form.ajaxSubmit({
      dataType: 'json',
      success: function(data, textStatus, jqXHR) {
        if (data.errors) {
          $.each(data.errors, function(name, message) {
            var $message = $('<div class="messages error">' + Drupal.t(message) + '</div>');
            $message.appendTo($messages);
            setTimeout(function() {
              $message.fadeOut('normal', function() {
                $message.remove();
              })
            }, 10 * 1000);
          });
        }

        if (data.destination) {
          window.location = Drupal.settings.basePath + data.destination;
        }

        $loading.empty().hide();
      }
    });

    event.preventDefault();
    event.stopPropagation();
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
