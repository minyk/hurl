var Hurl = {

  removeEmptyData: function(data) {
    var keepers = [],
        value;

    // remove empty arrays and any default titular data
    for (var key in data) {
      value = data[key].value;
      if (value) {
        if ($('input[name=' + data[key].name +'].defaulted:not(.focused)').val() != value) {
          keepers.push(data[key]);
        }
      }
    }

    data.splice(0, data.length);

    for (var keeper in keepers) {
      data.push(keepers[keeper]);
    }

    return true;
  },

  pony: function() {
    if (!this.ponyLoaded) return this.loadPony();
    if (this.ponying) return;
    this.ponying = true;

    var width = 668;

    var pony = $("<div />").css({
      width:       width,
      height:      422,
      background: 'url(/img/pony.png) top center',
      position:   'fixed',
      bottom:     0,
      right:      0-width,
      "z-index":  1000,
      cursor:     'pointer'
    }).appendTo($("body"));

    pony.show().animate({right: 0}, 1500, function() {
      setTimeout(function() {
        pony.css('background', 'url(/img/pony-hurl.png) top center');
        setTimeout(function() {
          pony.animate({right: 0-width}, 1500, function() {
            Hurl.ponying = false;
          });
        }, 500);
      }, 1000);
    });
  },

  loadPony: function() {
    $(new Image()).load(function() {
      Hurl.loadOtherPony();
    }).attr('src', '/img/pony.png');
  },

  loadOtherPony: function() {
    $(new Image()).load(function() {
      Hurl.ponyLoaded = true;
      Hurl.pony();
    }).attr('src', '/img/pony-hurl.png');
  }
};

(function ($) {

  // select method
  $('#select-method').change(function() {
    $('#select-method option:selected').each(function() {
      var method = $(this).attr('value');
      if (method == 'POST' || method == 'PUT' || method == 'PATCH'){
        $('#post-params').show();
      } else {
        $('#post-params').hide();
      }
    });
  });
  $('#select-method').change();

  // add auth
  $('input[name=auth]').change(function() {
    if ($(this).attr('value') == 'basic') {
      $('#basic-auth-fields').show();
      $('#basic-auth-fields .form-alpha').focus();
    } else {
      $('#basic-auth-fields').hide();
    }
  });
  $('#auth-selection :checked').change();

  // add post param
  $('#add-param').click(function() {
    // toggle if post body is being shown
    if ($('#set-post-body .link-icon').text() == '-') {
      $('#set-post-body').click();
      return false;
    }

    var newField = $('#param-fields').clone();
    newField.toggle().attr('id', '');
    newField.addClass('param-field');
    registerRemoveHandlers(newField, '.param-delete');
    $(this).parent().parent().append(newField);
    return false;
  });

  // set post body
  $('#set-post-body').click(function() {
    var icon = $(this).find('.link-icon');

    if (icon.text() == '+') {
      icon.text('-');
      $('.param-field').hide();
      $('#post-body').show().find('textarea').attr('disabled', false);
    } else {
      icon.text('+');
      $('.param-field').show();
      $('#post-body').hide().find('textarea').attr('disabled', true);
    }

    return false;
  });

  if ($('#post-body').is(':visible')) {
    $('#set-post-body').click();
  }

  /**
   * add header
   *
   * clone hidden div, remove id (to avoid duplicate), add autocomplete
   */
  $('#add-header').click(function() {
    var newField = $('#header-fields-toclone').clone();
    newField.toggle().attr('id', '');

    registerAutoComplete(newField, true);

    registerRemoveHandlers(newField, '.header-delete');
    $(this).parent().parent().append(newField);

    return false;
  });

  $('.header-fields:visible').each(function () {
    var field = $(this);
    field.attr('id', '');
    registerAutoComplete(field, false);
    registerRemoveHandlers(field, '.header-delete', true);
  });

  /**
   * Add auto complete for header
   */
  function registerAutoComplete (e, is_new) {
    var inputACK = e.find('input.header-key');
    inputACK.hurlHeaders(inputACK);

    var inputACV = e.find('input.header-val');

    // remove value (in case of an existing header)
    if (true === is_new) {
      inputACK.attr('value', '');
      inputACV.attr('value', '');
    }
  }

  /**
   * Remove header / param
   *
   * @param  {string} klass   binded class for the delete
   */
  function registerRemoveHandlers(el, klass) {
    $(el).find(klass).click(function() {
      $(el).remove();
      return false;
    });
  }

  registerRemoveHandlers(document, '.header-delete');
  registerRemoveHandlers(document, '.param-delete');

  // hurl it!
  $('#hurl-form').on('submit', function(e) {
    e.preventDefault();
    $('#send-wrap').children().toggle();
    $('.flash-error, .flash-notice').hide();
    $('#request-and-response').hide();

    // trim url
    var submitUrl = $('input[name=url]').val();
    submitUrl = submitUrl.replace(/^\s+|\s+$/g, "");

    // if user forgot the protocol, we add http by default
    var myregexp = /^(ht|f)tps?:\/\//;
    var match = myregexp.exec(submitUrl);
    if (submitUrl.length > 0 && match === null) {
      submitUrl = 'http://'+submitUrl;
    }

    $('input[name=url]').val(submitUrl);

    $(this).ajaxSubmit({
      beforeSubmit: Hurl.removeEmptyData,
      success:      showResponse
    });

    return false;
  });

  function showResponse(data, statusText, xhr, $form) {
    if (data.error) {
      $('#flash-error-msg').html(data.error);
      $('.flash-error').show();
      $('#send-wrap').children().toggle();
    } else if (/hurl/.test(location.pathname) && data.hurl_id && data.view_id) {
      window.location = '/hurls/' + data.hurl_id + '/' + data.view_id;
    } else if (data.header && data.body && data.request) {
      if (/railsrumble/.test($('input[name=url]').val())) Hurl.pony();
      $('.permalink').attr('href', '/hurls/'+data.hurl_id+'/'+data.view_id);
      $('.full-size-link').attr('href', '/views/' + data.view_id);
      $('#requestTab').html(data.request);
      $('#responseTab').html('<pre>' + data.header + '</pre>' + data.body);
      $('.help-blurb').hide();
      $('#request-and-response').show();
      $('#send-wrap').children().toggle();
    } else {
      $('#flash-error-msg').html("Weird response. Sorry.");
      $('.flash-error').show();
      $('#send-wrap').children().toggle();
    }
  }
})(jQuery);
