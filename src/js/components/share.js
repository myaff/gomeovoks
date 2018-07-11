function getIcon(el) {
  let icon = '';
  if (el.hasClass('ya-share2__item_service_vkontakte')) {
    icon = 'vk';
  }
  if (el.hasClass('ya-share2__item_service_facebook')) {
    icon = 'fb';
  }
  if (el.hasClass('ya-share2__item_service_twitter')) {
    icon = 'tw';
  }
  return '<svg class="icon social-icon"><use xlink:href="#' + icon + '"/></svg>';
}
function fillIcons() {
  $('#share .ya-share2__item').each(function(){
    $(this).find('.ya-share2__icon').html(getIcon($(this)));
  });
}
function init() {
  Ya.share2('share', {
    content: {
      url: window.location.href,
      title: 'Узнай, как не потерять голос после ЧМ?',
      description: "",
      //image: 'build/img/share.jpg'
      image: 'http://homeovox.maximonline.ru/share.jpg'
    },
    theme: {
      services: 'vkontakte,facebook,twitter',
      bare: true,
      lang: 'ru'
    },
    hooks: {
      onready: function() {
        fillIcons();
      }
    }
  });

    $('.ya-share2__item_service_twitter').on('click', function () {
        ga('send', 'event', 'share', 'click', 'click share tw');
    });

    $('.ya-share2__item_service_facebook').on('click', function () {
        ga('send', 'event', 'share', 'click', 'click share fb');
    });

    $('.ya-share2__item_service_vkontakte').on('click', function () {
        ga('send', 'event', 'share', 'click', 'click share vk');
    });
}
module.exports = {init};