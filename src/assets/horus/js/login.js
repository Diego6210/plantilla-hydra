$('input[type="submit"]').click(function() {
  $('.login').addClass('test')
  setTimeout(function() {
    $('.login').addClass('testtwo')
  }, 300);
  setTimeout(function() {
    $(".authent").show().animate({
      right: -320
    }, {
      easing: 'easeOutQuint',
      duration: 600,
      queue: false
    });
    $(".authent").animate({
      opacity: 1
    }, {
      duration: 200,
      queue: false
    }).addClass('visible');
  }, 500);
  setTimeout(function() {
    $(".authent").show().animate({
      right: 90
    }, {
      easing: 'easeOutQuint',
      duration: 600,
      queue: false
    });
    $(".authent").animate({
      opacity: 0
    }, {
      duration: 200,
      queue: false
    }).addClass('visible');
    $('.login').removeClass('testtwo');
    $.post(ajaxurl + '/login', {
      user: $('#Username').val(),
      password: $('#Password').val()
    }).then(function(res) {
      if (res.error) {
        setTimeout(function() {
          $('.login').removeClass('test')
          $('.login div').fadeOut(123);
        }, 250);
        setTimeout(function() {
          $('.failed').fadeIn();
          $('.button_try').fadeIn();
        }, 300);
      } else {
        setTimeout(function() {
          $('.login').removeClass('test')
          $('.login div').fadeOut(123);
        }, 250);
        setTimeout(function() {
          $('.success').fadeIn();
        }, 300);
        setTimeout(function() {
          location.href=res.url;
        }, 2000);
      }
    }).fail(function() {
      swal('Error', 'Error al conectarse con el servidor', 'error');
    });
  }, 2500);
});
$('.button_try').click(function() {
  setTimeout(function() {
    $('.failed').fadeOut(123);
  }, 250);
  setTimeout(function() {
    $('.login_title').fadeIn();
    $('.login_fields').fadeIn();
    $('.login_fields div').fadeIn();
    $('.disclaimer').fadeIn();
    $('.authent.visible').fadeOut();

  }, 250);
});

$('input[type="text"],input[type="password"]').focus(function() {
  $(this).prev().animate({
    'opacity': '1'
  }, 200)
});
$('input[type="text"],input[type="password"]').blur(function() {
  $(this).prev().animate({
    'opacity': '.5'
  }, 200)
});

$('input[type="text"],input[type="password"]').keyup(function() {
  if (!$(this).val() == '') {
    $(this).next().animate({
      'opacity': '1',
      'right': '30'
    }, 200)
  } else {
    $(this).next().animate({
      'opacity': '0',
      'right': '20'
    }, 200)
  }
});

var open = 0;
$('.tab').click(function() {
  $(this).fadeOut(200, function() {
    $(this).parent().animate({
      'left': '0'
    })
  });
});
