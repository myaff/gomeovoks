var Main =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/kenzo/build/js/";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	var DeviceDetection = __webpack_require__(1);
	var Helpers = __webpack_require__(2);
	//let Animation = require("./components/animation");
	var Carousel = __webpack_require__(3);
	var Test = __webpack_require__(4);
	var Share = __webpack_require__(5);

	$(document).ready(function () {

	  DeviceDetection.run();
	  Helpers.init();
	  Carousel.init();
	  Test.init();
	  Share.init();

	  $.afterlag(function () {
	    $('html').addClass('is-loaded');
	  });

	  $('html').addClass('is-animating');

	  $('body').mousemove(function (e) {
	    if ($('.layout--home').length) {

	      parallaxIt(e, ".chm__symbol.chm__ч", -100);
	      parallaxIt(e, ".chm__symbol.chm__м", 100);
	      parallaxIt(e, ".chm__symbol.chm__2", 10);
	      parallaxIt(e, ".chm__symbol.chm__0", -80);
	      parallaxIt(e, ".chm__symbol.chm__1", 65);
	      parallaxIt(e, ".chm__symbol.chm__8", -20);
	    }
	  });

	  function parallaxIt(e, target, movement) {
	    var $this = $(".home-back");
	    var relX = e.pageX - $this.offset().left;
	    var relY = e.pageY - $this.offset().top;

	    TweenMax.to(target, 1, {
	      x: (relX - $this.width() / 2) / $this.width() * movement,
	      y: (relY - $this.height() / 2) / $this.height() * movement
	    });
	  }
	});

	/**
	 * Список экспортируемых модулей, чтобы иметь к ним доступ извне
	 * @example
	 * Main.Form.isFormValid();
	 */
	module.exports = {
	  DeviceDetection: DeviceDetection,
	  Helpers: Helpers,
	  Carousel: Carousel,
	  Test: Test,
	  Share: Share
		};

/***/ }),
/* 1 */
/***/ (function(module, exports) {

	'use strict';

	var breakpoints = {
	  sm: 767,
	  md: 1024,
	  lg: 1280,
	  xl: 1600
	};

	function isMobile() {
	  return $(window).width() <= breakpoints.sm;
	}
	function isTablet() {
	  return $(window).width() > breakpoints.sm && $(window).width() <= breakpoints.md;
	}
	function isDesktopExt() {
	  return $(window).width() >= breakpoints.md;
	}
	function isDesktop() {
	  return $(window).width() > breakpoints.md;
	}
	function isTouch() {
	  return 'ontouchstart' in window || navigator.maxTouchPoints;
	}
	function isMobileVersion() {
	  return !!~window.location.href.indexOf("/mobile/");
	}

	function run() {
	  if (isTouch()) {
	    $('html').removeClass('no-touch').addClass('touch');
	  } else {
	    $('html').removeClass('touch').addClass('no-touch');
	  }
	}

	module.exports = { run: run, isTouch: isTouch, isMobile: isMobile, isTablet: isTablet, isDesktop: isDesktop, isDesktopExt: isDesktopExt, isMobileVersion: isMobileVersion };

/***/ }),
/* 2 */
/***/ (function(module, exports) {

	'use strict';

	/**
	 * Helpers
	 * @module Helpers
	 */

	/**
	 * Calculate scrollbar width in element
	 * - if the width is 0 it means the scrollbar is floated/overlayed
	 * - accepts "container" paremeter because ie & edge can have different
	 *   scrollbar behaviors for different elements using '-ms-overflow-style'
	 */
	function getNativeScrollbarWidth(container) {
	  container = container || document.body;

	  var fullWidth = 0;
	  var barWidth = 0;

	  var wrapper = document.createElement('div');
	  var child = document.createElement('div');

	  wrapper.style.position = 'absolute';
	  wrapper.style.pointerEvents = 'none';
	  wrapper.style.bottom = '0';
	  wrapper.style.right = '0';
	  wrapper.style.width = '100px';
	  wrapper.style.overflow = 'hidden';

	  wrapper.appendChild(child);
	  container.appendChild(wrapper);

	  fullWidth = child.offsetWidth;
	  wrapper.style.overflowY = 'scroll';
	  barWidth = fullWidth - child.offsetWidth;

	  container.removeChild(wrapper);

	  return barWidth;
	}

	/**
	 * Throttle Helper
	 * https://remysharp.com/2010/07/21/throttling-function-calls
	 */
	function throttle(fn, threshhold, scope) {
	  threshhold || (threshhold = 250);
	  var last = void 0,
	      deferTimer = void 0;
	  return function () {
	    var context = scope || this;

	    var now = +new Date(),
	        args = arguments;
	    if (last && now < last + threshhold) {
	      // hold on to it
	      clearTimeout(deferTimer);
	      deferTimer = setTimeout(function () {
	        last = now;
	        fn.apply(context, args);
	      }, threshhold);
	    } else {
	      last = now;
	      fn.apply(context, args);
	    }
	  };
	}

	/** 
	 * Debounce Helper
	 * https://remysharp.com/2010/07/21/throttling-function-calls
	 */
	function debounce(fn, delay) {
	  var timer = null;
	  return function () {
	    var context = this,
	        args = arguments;
	    clearTimeout(timer);
	    timer = setTimeout(function () {
	      fn.apply(context, args);
	    }, delay);
	  };
	};

	var timer = void 0;
	var timeout = false;
	var delta = 200;
	function resizeEnd() {
	  if (new Date() - timer < delta) {
	    setTimeout(resizeEnd, delta);
	  } else {
	    timeout = false;
	    $(window).trigger('resizeend');
	  }
	}

	function toggleClassIf(el, cond, toggledClass) {
	  if (cond) {
	    el.addClass(toggledClass);
	  } else {
	    el.removeClass(toggledClass);
	  }
	}

	/**
	 * Функция добавляет к элементу класс, если страница прокручена больше, чем на указанное значение, 
	 * и убирает класс, если значение меньше
	 * @param {object} el - элемент, с которым взаимодействуем
	 * @param {mixed} [scrollValue=0] - значение прокрутки, на котором меняем css-класс, ожидаемое значение - число или ключевое слово 'this'. Если передано 'this', подставляется положение el.offset().top минус половина высоты экрана
	 * @param {string} [toggledClass=scrolled] - css-класс, который переключаем
	 */
	function toggleElementClassOnScroll(el) {
	  var scrollValue = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
	  var toggledClass = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'scrolled';

	  if (el.length == 0) {
	    //console.error("Необходимо передать объект, с которым вы хотите взаимодействовать");
	    return false;
	  }

	  if (scrollValue == 'this') {
	    scrollValue = el.offset().top - $(window).outerHeight() / 2;
	  }

	  $(window).on('scroll', function (e) {
	    if ($(window).scrollTop() > scrollValue) {
	      el.addClass(toggledClass);
	    } else {
	      el.removeClass(toggledClass);
	    }
	  });
	};

	/**
	 * инициализация событий для переключателей классов
	 * @example
	 * Helpers.init();
	 */
	function init() {

	  toggleElementClassOnScroll($('.header'), 50);

	  $('.js-hide-block').on('click', function () {
	    var block = $(this).data('target') === 'self' ? $(this).parent() : $(this).data('target');
	    block.fadeOut(500);
	  });

	  $(window).on('resize', function () {
	    timer = new Date();
	    if (timeout === false) {
	      timeout = true;
	      setTimeout(resizeEnd, delta);
	    }
	  });

	  $('.btn-menu').on('click', function () {
	    $(this).toggleClass('is-open');
	    $('.header').toggleClass('is-open');
	    $('.main-nav').fadeToggle(500);
	    if (Main.DeviceDetection.isDesktopExt()) {
	      $('.main-nav-opposite').fadeToggle(500);
	    }
	    if (Main.DeviceDetection.isMobile() || Main.DeviceDetection.isTablet()) {
	      if ($('.header').hasClass('is-open')) {
	        $('html, body').css('overflow-y', 'hidden');
	      } else {
	        $('html, body').css('overflow-y', '');
	      }
	    }
	  });

	  $(window).scroll($.debounce(250, true, function () {
	    $('html').addClass('is-scrolling');
	  }));
	  $(window).scroll($.debounce(250, function () {
	    $('html').removeClass('is-scrolling');
	  }));
	}

	module.exports = { init: init, toggleClassIf: toggleClassIf, toggleElementClassOnScroll: toggleElementClassOnScroll };

/***/ }),
/* 3 */
/***/ (function(module, exports) {

	'use strict';

	/**
	 * Карусель
	 * @module Carousel
	 */

	var carousel = void 0;

	/**
	 * Инициализация карусели
	 */
	function init() {
	  carousel = $(".owl-carousel.carousel--default");

	  carousel.owlCarousel({
	    items: 1,
	    nav: true,
	    navText: ['<svg class="icon"><use xlink:href="#arr-prev"/></svg>', '<svg class="icon"><use xlink:href="#arr-next"/></svg>'],
	    dots: true,
	    loop: true,
	    mouseDrag: false,
	    animateOut: 'fadeOut'
	  });
	}

	module.exports = { init: init };

/***/ }),
/* 4 */
/***/ (function(module, exports) {

	"use strict";

	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

	/**
	 * Тест
	 * @module Test
	 */

	var result = {
		"0": 0,
		"30": 0,
		"70": 0,
		"100": 0
	};

	var q = 0;

	var pages = {
		"0": "green",
		"30": "yellow",
		"70": "orange",
		"100": "red"
	};

	var carousel = $(".owl-carousel.carousel--test");
	var testCtrl = $('.js-test-ctrl');
	var test = $('.js-test');
	var testCard = $('.js-test-card');
	var animCtrl = $('.js-test-scale-pin');
	var animCtrlNum = $('.js-test-scale-num');
	var animIndicator = $('.js-test-indicator');
	var counter = { var: 0 };

	function clearResult() {
		result = {
			"0": 0,
			"30": 0,
			"70": 0,
			"100": 0
		};
	}

	function isLastSlide() {
		return carousel.find('.owl-item').filter(':last').hasClass('active');
	}

	function processTest(el) {
		var isLastSlide = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

		var key = $(el).attr('data-key');
		result[key] += 1;
		q += 1;
		ga('send', 'event', 'question', 'click', 'question-' + q);
		if (!isLastSlide) {
			showNext([el]);
			if (Main.DeviceDetection.isMobileVersion()) {
				animTestIndicator(key);
			} else {
				animTest(key);
			}
		} else {
			animTest(key);
			setTimeout(function () {
				showResult(result);
			}, 1000);
		}
	}
	function getTranslateRandom() {
		return Math.floor(Math.random() * 101) - 50;
	};
	function getRotationRandom() {
		return Math.floor(Math.random() * 181) - 90;
	};

	function animTest(key, onCompleteFunc, onCompleteFuncParams) {
		var tl = new TimelineMax();
		var tweensArr = [];
		tl.to(animCtrl, 1, {
			left: key + '%',
			ease: Power1.easeInOut,
			onComplete: onCompleteFunc,
			onCompleteParams: onCompleteFuncParams
		});
		$('.chm__symbol').each(function () {
			var targetEl = $(this);
			tweensArr.push(TweenMax.to(targetEl, 1, {
				xPercent: getTranslateRandom(),
				yPercent: getTranslateRandom(),
				rotation: getRotationRandom(),
				ease: Power1.easeInOut,
				delay: -1
			}));
		});
		tweensArr.push(TweenMax.to(counter, 1, {
			var: key,
			onUpdate: function onUpdate() {
				animCtrlNum.text(Math.ceil(counter.var));
			},
			ease: Linear.easeNone,
			delay: -1
		}));
		tl.add(tweensArr, 1);
	}

	function animTestIndicator(key) {
		var res = pages[key];
		animIndicator.attr("data-key", res);
	}

	function showNext(el) {
		setTimeout(function () {
			carousel.trigger('next.owl.carousel');
		}, 300);
	}

	function extractKeyValue(obj, value) {
		return Object.keys(obj)[Object.values(obj).indexOf(value)];
	}

	function calculateResult(result) {
		var arr = Object.values(result);
		var max = Math.max.apply(Math, _toConsumableArray(arr));
		var maxKey = extractKeyValue(result, max);
		return maxKey;
	}

	function getPage(answer) {
		var page = 'result-' + pages[answer] + '.html';
		var pageUrl = window.location.href.split('/').slice(0, -1).join('/');
		pageUrl += '/' + page;
		return pageUrl;
	}

	function showResult(result) {
		var answer = calculateResult(result);
		var page = getPage(answer);
		ga('send', 'event', 'result', 'click', 'result-' + pages[answer]);
		setTimeout(function () {
			window.location.href = page;
		}, 500);
	}

	/**
	 * Инициализация карусели
	 */
	function init() {

		carousel.owlCarousel({
			items: 1,
			nav: false,
			dots: false,
			loop: false,
			mouseDrag: false,
			touchDrag: false,
			pullDrag: false,
			animateOut: 'fadeOut'
		});

		testCtrl.on('click', function () {
			$(this).addClass('is-active');
			processTest(this, isLastSlide());
		});

		if (Main.DeviceDetection.isTouch()) {
			testCard.on('click', function () {
				$(this).addClass('focused');
			});
		} else {
			testCard.on('mouseover', function () {
				$(this).addClass('focused');
			});
		}
	}

	module.exports = { init: init };

/***/ }),
/* 5 */
/***/ (function(module, exports) {

	'use strict';

	function getIcon(el) {
	  var icon = '';
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
	  $('#share .ya-share2__item').each(function () {
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
	      onready: function onready() {
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
	module.exports = { init: init };

/***/ })
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZXMiOlsid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCA2Yzc5MDZkMTUzODA2YTNmMDZmNiIsIndlYnBhY2s6Ly8vc3JjL2pzL21haW4uanMiLCJ3ZWJwYWNrOi8vL3NyYy9qcy9jb21wb25lbnRzL2RldmljZS1kZXRlY3Rpb24uanMiLCJ3ZWJwYWNrOi8vL3NyYy9qcy9jb21wb25lbnRzL2hlbHBlcnMuanMiLCJ3ZWJwYWNrOi8vL3NyYy9qcy9jb21wb25lbnRzL2Nhcm91c2VsLmpzIiwid2VicGFjazovLy9zcmMvanMvY29tcG9uZW50cy9UZXN0LmpzIiwid2VicGFjazovLy9zcmMvanMvY29tcG9uZW50cy9zaGFyZS5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSlcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcblxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0ZXhwb3J0czoge30sXG4gXHRcdFx0aWQ6IG1vZHVsZUlkLFxuIFx0XHRcdGxvYWRlZDogZmFsc2VcbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubG9hZGVkID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCIva2Vuem8vYnVpbGQvanMvXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oMCk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gd2VicGFjay9ib290c3RyYXAgNmM3OTA2ZDE1MzgwNmEzZjA2ZjYiLCJsZXQgRGV2aWNlRGV0ZWN0aW9uID0gcmVxdWlyZShcIi4vY29tcG9uZW50cy9kZXZpY2UtZGV0ZWN0aW9uXCIpO1xyXG5sZXQgSGVscGVycyA9IHJlcXVpcmUoXCIuL2NvbXBvbmVudHMvaGVscGVyc1wiKTtcclxuLy9sZXQgQW5pbWF0aW9uID0gcmVxdWlyZShcIi4vY29tcG9uZW50cy9hbmltYXRpb25cIik7XHJcbmxldCBDYXJvdXNlbCA9IHJlcXVpcmUoXCIuL2NvbXBvbmVudHMvY2Fyb3VzZWxcIik7XHJcbmxldCBUZXN0ID0gcmVxdWlyZShcIi4vY29tcG9uZW50cy9UZXN0XCIpO1xyXG5sZXQgU2hhcmUgPSByZXF1aXJlKFwiLi9jb21wb25lbnRzL3NoYXJlXCIpO1xyXG5cclxuJChkb2N1bWVudCkucmVhZHkoZnVuY3Rpb24oKXtcclxuICBcclxuICBEZXZpY2VEZXRlY3Rpb24ucnVuKCk7XHJcbiAgSGVscGVycy5pbml0KCk7XHJcbiAgQ2Fyb3VzZWwuaW5pdCgpO1xyXG4gIFRlc3QuaW5pdCgpO1xyXG4gIFNoYXJlLmluaXQoKTtcclxuICBcclxuICAkLmFmdGVybGFnKGZ1bmN0aW9uKCl7XHJcbiAgICAkKCdodG1sJykuYWRkQ2xhc3MoJ2lzLWxvYWRlZCcpO1xyXG4gIH0pO1xyXG4gIFxyXG4gICQoJ2h0bWwnKS5hZGRDbGFzcygnaXMtYW5pbWF0aW5nJyk7XHJcblxyXG4gICQoJ2JvZHknKS5tb3VzZW1vdmUoZnVuY3Rpb24oZSkge1xyXG4gICAgICBpZiAoJCgnLmxheW91dC0taG9tZScpLmxlbmd0aCkge1xyXG5cclxuICAgICAgICAgIHBhcmFsbGF4SXQoZSwgXCIuY2htX19zeW1ib2wuY2htX1/Rh1wiLCAtMTAwKTtcclxuICAgICAgICAgIHBhcmFsbGF4SXQoZSwgXCIuY2htX19zeW1ib2wuY2htX1/QvFwiLCAxMDApO1xyXG4gICAgICAgICAgcGFyYWxsYXhJdChlLCBcIi5jaG1fX3N5bWJvbC5jaG1fXzJcIiwgMTApO1xyXG4gICAgICAgICAgcGFyYWxsYXhJdChlLCBcIi5jaG1fX3N5bWJvbC5jaG1fXzBcIiwgLTgwKTtcclxuICAgICAgICAgIHBhcmFsbGF4SXQoZSwgXCIuY2htX19zeW1ib2wuY2htX18xXCIsIDY1KTtcclxuICAgICAgICAgIHBhcmFsbGF4SXQoZSwgXCIuY2htX19zeW1ib2wuY2htX184XCIsIC0yMCk7XHJcbiAgICAgIH1cclxuICB9KTtcclxuXHJcbiAgZnVuY3Rpb24gcGFyYWxsYXhJdChlLCB0YXJnZXQsIG1vdmVtZW50KSB7XHJcbiAgICAgIGxldCAkdGhpcyA9ICQoXCIuaG9tZS1iYWNrXCIpO1xyXG4gICAgICBsZXQgcmVsWCA9IGUucGFnZVggLSAkdGhpcy5vZmZzZXQoKS5sZWZ0O1xyXG4gICAgICBsZXQgcmVsWSA9IGUucGFnZVkgLSAkdGhpcy5vZmZzZXQoKS50b3A7XHJcblxyXG4gICAgICBUd2Vlbk1heC50byh0YXJnZXQsIDEsIHtcclxuICAgICAgICAgIHg6IChyZWxYIC0gJHRoaXMud2lkdGgoKSAvIDIpIC8gJHRoaXMud2lkdGgoKSAqIG1vdmVtZW50LFxyXG4gICAgICAgICAgeTogKHJlbFkgLSAkdGhpcy5oZWlnaHQoKSAvIDIpIC8gJHRoaXMuaGVpZ2h0KCkgKiBtb3ZlbWVudFxyXG4gICAgICB9KTtcclxuICB9XHJcbiAgXHJcbn0pO1xyXG5cclxuXHJcbi8qKlxyXG4gKiDQodC/0LjRgdC+0Log0Y3QutGB0L/QvtGA0YLQuNGA0YPQtdC80YvRhSDQvNC+0LTRg9C70LXQuSwg0YfRgtC+0LHRiyDQuNC80LXRgtGMINC6INC90LjQvCDQtNC+0YHRgtGD0L8g0LjQt9Cy0L3QtVxyXG4gKiBAZXhhbXBsZVxyXG4gKiBNYWluLkZvcm0uaXNGb3JtVmFsaWQoKTtcclxuICovXHJcbm1vZHVsZS5leHBvcnRzID0ge1xyXG4gIERldmljZURldGVjdGlvbixcclxuICBIZWxwZXJzLFxyXG5cdENhcm91c2VsLFxyXG5cdFRlc3QsXHJcbiAgU2hhcmVcclxufTtcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gc3JjL2pzL21haW4uanMiLCJsZXQgYnJlYWtwb2ludHMgPSB7XHJcbiAgc206IDc2NyxcclxuICBtZDogMTAyNCxcclxuICBsZzogMTI4MCxcclxuICB4bDogMTYwMFxyXG59O1xyXG5cclxuZnVuY3Rpb24gaXNNb2JpbGUoKXtcclxuICByZXR1cm4gKCQod2luZG93KS53aWR0aCgpIDw9IGJyZWFrcG9pbnRzLnNtKTtcclxufVxyXG5mdW5jdGlvbiBpc1RhYmxldCgpe1xyXG4gIHJldHVybiAoJCh3aW5kb3cpLndpZHRoKCkgPiBicmVha3BvaW50cy5zbSAmJiAkKHdpbmRvdykud2lkdGgoKSA8PSBicmVha3BvaW50cy5tZClcclxufVxyXG5mdW5jdGlvbiBpc0Rlc2t0b3BFeHQoKXtcclxuICByZXR1cm4gKCQod2luZG93KS53aWR0aCgpID49IGJyZWFrcG9pbnRzLm1kKVxyXG59XHJcbmZ1bmN0aW9uIGlzRGVza3RvcCgpe1xyXG4gIHJldHVybiAoJCh3aW5kb3cpLndpZHRoKCkgPiBicmVha3BvaW50cy5tZClcclxufVxyXG5mdW5jdGlvbiBpc1RvdWNoKCl7XHJcbiAgcmV0dXJuICdvbnRvdWNoc3RhcnQnIGluIHdpbmRvdyB8fCBuYXZpZ2F0b3IubWF4VG91Y2hQb2ludHM7XHJcbn1cclxuZnVuY3Rpb24gaXNNb2JpbGVWZXJzaW9uKCl7XHJcbiAgcmV0dXJuICEhfndpbmRvdy5sb2NhdGlvbi5ocmVmLmluZGV4T2YoXCIvbW9iaWxlL1wiKTtcclxufVxyXG5cclxuZnVuY3Rpb24gcnVuKCl7XHJcbiAgaWYoaXNUb3VjaCgpKXtcclxuICAgICQoJ2h0bWwnKS5yZW1vdmVDbGFzcygnbm8tdG91Y2gnKS5hZGRDbGFzcygndG91Y2gnKTtcclxuICB9IGVsc2Uge1xyXG4gICAgJCgnaHRtbCcpLnJlbW92ZUNsYXNzKCd0b3VjaCcpLmFkZENsYXNzKCduby10b3VjaCcpO1xyXG4gIH1cclxufVxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSB7cnVuLCBpc1RvdWNoLCBpc01vYmlsZSwgaXNUYWJsZXQsIGlzRGVza3RvcCwgaXNEZXNrdG9wRXh0LCBpc01vYmlsZVZlcnNpb259O1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyBzcmMvanMvY29tcG9uZW50cy9kZXZpY2UtZGV0ZWN0aW9uLmpzIiwiLyoqXHJcbiAqIEhlbHBlcnNcclxuICogQG1vZHVsZSBIZWxwZXJzXHJcbiAqL1xyXG5cclxuLyoqXHJcbiAqIENhbGN1bGF0ZSBzY3JvbGxiYXIgd2lkdGggaW4gZWxlbWVudFxyXG4gKiAtIGlmIHRoZSB3aWR0aCBpcyAwIGl0IG1lYW5zIHRoZSBzY3JvbGxiYXIgaXMgZmxvYXRlZC9vdmVybGF5ZWRcclxuICogLSBhY2NlcHRzIFwiY29udGFpbmVyXCIgcGFyZW1ldGVyIGJlY2F1c2UgaWUgJiBlZGdlIGNhbiBoYXZlIGRpZmZlcmVudFxyXG4gKiAgIHNjcm9sbGJhciBiZWhhdmlvcnMgZm9yIGRpZmZlcmVudCBlbGVtZW50cyB1c2luZyAnLW1zLW92ZXJmbG93LXN0eWxlJ1xyXG4gKi9cclxuZnVuY3Rpb24gZ2V0TmF0aXZlU2Nyb2xsYmFyV2lkdGggKGNvbnRhaW5lcikge1xyXG4gIGNvbnRhaW5lciA9IGNvbnRhaW5lciB8fCBkb2N1bWVudC5ib2R5O1xyXG5cclxuICBsZXQgZnVsbFdpZHRoID0gMDtcclxuICBsZXQgYmFyV2lkdGggPSAwO1xyXG5cclxuICBsZXQgd3JhcHBlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gIGxldCBjaGlsZCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG5cclxuICB3cmFwcGVyLnN0eWxlLnBvc2l0aW9uID0gJ2Fic29sdXRlJztcclxuICB3cmFwcGVyLnN0eWxlLnBvaW50ZXJFdmVudHMgPSAnbm9uZSc7XHJcbiAgd3JhcHBlci5zdHlsZS5ib3R0b20gPSAnMCc7XHJcbiAgd3JhcHBlci5zdHlsZS5yaWdodCA9ICcwJztcclxuICB3cmFwcGVyLnN0eWxlLndpZHRoID0gJzEwMHB4JztcclxuICB3cmFwcGVyLnN0eWxlLm92ZXJmbG93ID0gJ2hpZGRlbic7XHJcblxyXG4gIHdyYXBwZXIuYXBwZW5kQ2hpbGQoY2hpbGQpO1xyXG4gIGNvbnRhaW5lci5hcHBlbmRDaGlsZCh3cmFwcGVyKTtcclxuXHJcbiAgZnVsbFdpZHRoID0gY2hpbGQub2Zmc2V0V2lkdGg7XHJcbiAgd3JhcHBlci5zdHlsZS5vdmVyZmxvd1kgPSAnc2Nyb2xsJztcclxuICBiYXJXaWR0aCA9IGZ1bGxXaWR0aCAtIGNoaWxkLm9mZnNldFdpZHRoO1xyXG5cclxuICBjb250YWluZXIucmVtb3ZlQ2hpbGQod3JhcHBlcik7XHJcblxyXG4gIHJldHVybiBiYXJXaWR0aDtcclxufVxyXG5cclxuLyoqXHJcbiAqIFRocm90dGxlIEhlbHBlclxyXG4gKiBodHRwczovL3JlbXlzaGFycC5jb20vMjAxMC8wNy8yMS90aHJvdHRsaW5nLWZ1bmN0aW9uLWNhbGxzXHJcbiAqL1xyXG5mdW5jdGlvbiB0aHJvdHRsZSAoZm4sIHRocmVzaGhvbGQsIHNjb3BlKSB7XHJcbiAgdGhyZXNoaG9sZCB8fCAodGhyZXNoaG9sZCA9IDI1MCk7XHJcbiAgbGV0IGxhc3QsXHJcbiAgICBkZWZlclRpbWVyO1xyXG4gIHJldHVybiBmdW5jdGlvbiAoKSB7XHJcbiAgICBsZXQgY29udGV4dCA9IHNjb3BlIHx8IHRoaXM7XHJcblxyXG4gICAgbGV0IG5vdyA9ICtuZXcgRGF0ZSgpLFxyXG4gICAgICBhcmdzID0gYXJndW1lbnRzO1xyXG4gICAgaWYgKGxhc3QgJiYgbm93IDwgbGFzdCArIHRocmVzaGhvbGQpIHtcclxuICAgICAgLy8gaG9sZCBvbiB0byBpdFxyXG4gICAgICBjbGVhclRpbWVvdXQoZGVmZXJUaW1lcik7XHJcbiAgICAgIGRlZmVyVGltZXIgPSBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBsYXN0ID0gbm93O1xyXG4gICAgICAgIGZuLmFwcGx5KGNvbnRleHQsIGFyZ3MpO1xyXG4gICAgICB9LCB0aHJlc2hob2xkKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGxhc3QgPSBub3c7XHJcbiAgICAgIGZuLmFwcGx5KGNvbnRleHQsIGFyZ3MpO1xyXG4gICAgfVxyXG4gIH1cclxufVxyXG5cclxuLyoqIFxyXG4gKiBEZWJvdW5jZSBIZWxwZXJcclxuICogaHR0cHM6Ly9yZW15c2hhcnAuY29tLzIwMTAvMDcvMjEvdGhyb3R0bGluZy1mdW5jdGlvbi1jYWxsc1xyXG4gKi9cclxuZnVuY3Rpb24gZGVib3VuY2UgKGZuLCBkZWxheSkge1xyXG4gIGxldCB0aW1lciA9IG51bGw7XHJcbiAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcclxuICAgIGxldCBjb250ZXh0ID0gdGhpcywgYXJncyA9IGFyZ3VtZW50cztcclxuICAgIGNsZWFyVGltZW91dCh0aW1lcik7XHJcbiAgICB0aW1lciA9IHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xyXG4gICAgICBmbi5hcHBseShjb250ZXh0LCBhcmdzKTtcclxuICAgIH0sIGRlbGF5KTtcclxuICB9O1xyXG59O1xyXG5cclxubGV0IHRpbWVyO1xyXG5sZXQgdGltZW91dCA9IGZhbHNlO1xyXG5sZXQgZGVsdGEgPSAyMDA7XHJcbmZ1bmN0aW9uIHJlc2l6ZUVuZCgpIHtcclxuICBpZiAobmV3IERhdGUoKSAtIHRpbWVyIDwgZGVsdGEpIHtcclxuICAgIHNldFRpbWVvdXQocmVzaXplRW5kLCBkZWx0YSk7XHJcbiAgfSBlbHNlIHtcclxuICAgIHRpbWVvdXQgPSBmYWxzZTtcclxuICAgICQod2luZG93KS50cmlnZ2VyKCdyZXNpemVlbmQnKTtcclxuICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHRvZ2dsZUNsYXNzSWYoZWwsIGNvbmQsIHRvZ2dsZWRDbGFzcyl7XHJcblx0aWYoY29uZCl7XHJcblx0XHRlbC5hZGRDbGFzcyh0b2dnbGVkQ2xhc3MpO1xyXG5cdH0gZWxzZSB7XHJcblx0XHRlbC5yZW1vdmVDbGFzcyh0b2dnbGVkQ2xhc3MpO1xyXG5cdH1cclxufVxyXG5cclxuLyoqXHJcbiAqINCk0YPQvdC60YbQuNGPINC00L7QsdCw0LLQu9GP0LXRgiDQuiDRjdC70LXQvNC10L3RgtGDINC60LvQsNGB0YEsINC10YHQu9C4INGB0YLRgNCw0L3QuNGG0LAg0L/RgNC+0LrRgNGD0YfQtdC90LAg0LHQvtC70YzRiNC1LCDRh9C10Lwg0L3QsCDRg9C60LDQt9Cw0L3QvdC+0LUg0LfQvdCw0YfQtdC90LjQtSwgXHJcbiAqINC4INGD0LHQuNGA0LDQtdGCINC60LvQsNGB0YEsINC10YHQu9C4INC30L3QsNGH0LXQvdC40LUg0LzQtdC90YzRiNC1XHJcbiAqIEBwYXJhbSB7b2JqZWN0fSBlbCAtINGN0LvQtdC80LXQvdGCLCDRgSDQutC+0YLQvtGA0YvQvCDQstC30LDQuNC80L7QtNC10LnRgdGC0LLRg9C10LxcclxuICogQHBhcmFtIHttaXhlZH0gW3Njcm9sbFZhbHVlPTBdIC0g0LfQvdCw0YfQtdC90LjQtSDQv9GA0L7QutGA0YPRgtC60LgsINC90LAg0LrQvtGC0L7RgNC+0Lwg0LzQtdC90Y/QtdC8IGNzcy3QutC70LDRgdGBLCDQvtC20LjQtNCw0LXQvNC+0LUg0LfQvdCw0YfQtdC90LjQtSAtINGH0LjRgdC70L4g0LjQu9C4INC60LvRjtGH0LXQstC+0LUg0YHQu9C+0LLQviAndGhpcycuINCV0YHQu9C4INC/0LXRgNC10LTQsNC90L4gJ3RoaXMnLCDQv9C+0LTRgdGC0LDQstC70Y/QtdGC0YHRjyDQv9C+0LvQvtC20LXQvdC40LUgZWwub2Zmc2V0KCkudG9wINC80LjQvdGD0YEg0L/QvtC70L7QstC40L3QsCDQstGL0YHQvtGC0Ysg0Y3QutGA0LDQvdCwXHJcbiAqIEBwYXJhbSB7c3RyaW5nfSBbdG9nZ2xlZENsYXNzPXNjcm9sbGVkXSAtIGNzcy3QutC70LDRgdGBLCDQutC+0YLQvtGA0YvQuSDQv9C10YDQtdC60LvRjtGH0LDQtdC8XHJcbiAqL1xyXG5mdW5jdGlvbiB0b2dnbGVFbGVtZW50Q2xhc3NPblNjcm9sbChlbCwgc2Nyb2xsVmFsdWUgPSAwLCB0b2dnbGVkQ2xhc3MgPSAnc2Nyb2xsZWQnKXtcclxuXHRpZihlbC5sZW5ndGggPT0gMCkge1xyXG5cdFx0Ly9jb25zb2xlLmVycm9yKFwi0J3QtdC+0LHRhdC+0LTQuNC80L4g0L/QtdGA0LXQtNCw0YLRjCDQvtCx0YrQtdC60YIsINGBINC60L7RgtC+0YDRi9C8INCy0Ysg0YXQvtGC0LjRgtC1INCy0LfQsNC40LzQvtC00LXQudGB0YLQstC+0LLQsNGC0YxcIik7XHJcblx0XHRyZXR1cm4gZmFsc2U7XHJcblx0fVxyXG5cdFxyXG5cdGlmKHNjcm9sbFZhbHVlID09ICd0aGlzJykge1xyXG5cdFx0c2Nyb2xsVmFsdWUgPSBlbC5vZmZzZXQoKS50b3AgLSAkKHdpbmRvdykub3V0ZXJIZWlnaHQoKSAvIDI7XHJcblx0fVxyXG5cdFxyXG5cdCQod2luZG93KS5vbignc2Nyb2xsJywgZnVuY3Rpb24oZSl7XHJcblx0XHRpZigkKHdpbmRvdykuc2Nyb2xsVG9wKCkgPiBzY3JvbGxWYWx1ZSl7XHJcblx0XHRcdGVsLmFkZENsYXNzKHRvZ2dsZWRDbGFzcyk7XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHRlbC5yZW1vdmVDbGFzcyh0b2dnbGVkQ2xhc3MpO1xyXG5cdFx0fVxyXG5cdH0pO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqINC40L3QuNGG0LjQsNC70LjQt9Cw0YbQuNGPINGB0L7QsdGL0YLQuNC5INC00LvRjyDQv9C10YDQtdC60LvRjtGH0LDRgtC10LvQtdC5INC60LvQsNGB0YHQvtCyXHJcbiAqIEBleGFtcGxlXHJcbiAqIEhlbHBlcnMuaW5pdCgpO1xyXG4gKi9cclxuZnVuY3Rpb24gaW5pdCgpe1xyXG4gIFxyXG4gIHRvZ2dsZUVsZW1lbnRDbGFzc09uU2Nyb2xsKCQoJy5oZWFkZXInKSwgNTApO1xyXG4gIFxyXG4gICQoJy5qcy1oaWRlLWJsb2NrJykub24oJ2NsaWNrJywgZnVuY3Rpb24oKXtcclxuICAgIGxldCBibG9jayA9ICQodGhpcykuZGF0YSgndGFyZ2V0JykgPT09ICdzZWxmJyA/ICQodGhpcykucGFyZW50KCkgOiAkKHRoaXMpLmRhdGEoJ3RhcmdldCcpO1xyXG4gICAgYmxvY2suZmFkZU91dCg1MDApO1xyXG4gIH0pO1xyXG4gIFxyXG4gICQod2luZG93KS5vbigncmVzaXplJywgZnVuY3Rpb24gKCkge1xyXG4gICAgdGltZXIgPSBuZXcgRGF0ZSgpO1xyXG4gICAgaWYgKHRpbWVvdXQgPT09IGZhbHNlKSB7XHJcbiAgICAgIHRpbWVvdXQgPSB0cnVlO1xyXG4gICAgICBzZXRUaW1lb3V0KHJlc2l6ZUVuZCwgZGVsdGEpO1xyXG4gICAgfVxyXG4gIH0pO1xyXG4gIFxyXG4gICQoJy5idG4tbWVudScpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCl7XHJcbiAgICAkKHRoaXMpLnRvZ2dsZUNsYXNzKCdpcy1vcGVuJyk7XHJcbiAgICAkKCcuaGVhZGVyJykudG9nZ2xlQ2xhc3MoJ2lzLW9wZW4nKTtcclxuICAgICQoJy5tYWluLW5hdicpLmZhZGVUb2dnbGUoNTAwKTtcclxuICAgIGlmIChNYWluLkRldmljZURldGVjdGlvbi5pc0Rlc2t0b3BFeHQoKSkge1xyXG4gICAgICAkKCcubWFpbi1uYXYtb3Bwb3NpdGUnKS5mYWRlVG9nZ2xlKDUwMCk7XHJcbiAgICB9XHJcbiAgICBpZiAoTWFpbi5EZXZpY2VEZXRlY3Rpb24uaXNNb2JpbGUoKSB8fCBNYWluLkRldmljZURldGVjdGlvbi5pc1RhYmxldCgpKSB7XHJcbiAgICAgIGlmICgkKCcuaGVhZGVyJykuaGFzQ2xhc3MoJ2lzLW9wZW4nKSkge1xyXG4gICAgICAgICQoJ2h0bWwsIGJvZHknKS5jc3MoJ292ZXJmbG93LXknLCAnaGlkZGVuJyk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgJCgnaHRtbCwgYm9keScpLmNzcygnb3ZlcmZsb3cteScsICcnKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH0pO1xyXG4gIFxyXG4gICQod2luZG93KS5zY3JvbGwoJC5kZWJvdW5jZSgyNTAsIHRydWUsIGZ1bmN0aW9uKCkge1xyXG4gICAgJCgnaHRtbCcpLmFkZENsYXNzKCdpcy1zY3JvbGxpbmcnKTtcclxuICB9KSk7XHJcbiAgJCh3aW5kb3cpLnNjcm9sbCgkLmRlYm91bmNlKDI1MCwgZnVuY3Rpb24oKSB7XHJcbiAgICAkKCdodG1sJykucmVtb3ZlQ2xhc3MoJ2lzLXNjcm9sbGluZycpO1xyXG4gIH0pKTtcclxuICBcclxufVxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSB7aW5pdCwgdG9nZ2xlQ2xhc3NJZiwgdG9nZ2xlRWxlbWVudENsYXNzT25TY3JvbGx9O1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyBzcmMvanMvY29tcG9uZW50cy9oZWxwZXJzLmpzIiwiLyoqXHJcbiAqINCa0LDRgNGD0YHQtdC70YxcclxuICogQG1vZHVsZSBDYXJvdXNlbFxyXG4gKi9cclxuXHJcbmxldCBjYXJvdXNlbDtcclxuXHJcbi8qKlxyXG4gKiDQmNC90LjRhtC40LDQu9C40LfQsNGG0LjRjyDQutCw0YDRg9GB0LXQu9C4XHJcbiAqL1xyXG5mdW5jdGlvbiBpbml0KCl7XHJcbiAgY2Fyb3VzZWwgPSAkKFwiLm93bC1jYXJvdXNlbC5jYXJvdXNlbC0tZGVmYXVsdFwiKTtcclxuXHJcbiAgY2Fyb3VzZWwub3dsQ2Fyb3VzZWwoe1xyXG4gICAgaXRlbXM6IDEsXHJcbiAgICBuYXY6IHRydWUsXHJcbiAgICBuYXZUZXh0OiBbJzxzdmcgY2xhc3M9XCJpY29uXCI+PHVzZSB4bGluazpocmVmPVwiI2Fyci1wcmV2XCIvPjwvc3ZnPicsICc8c3ZnIGNsYXNzPVwiaWNvblwiPjx1c2UgeGxpbms6aHJlZj1cIiNhcnItbmV4dFwiLz48L3N2Zz4nXSxcclxuICAgIGRvdHM6IHRydWUsXHJcbiAgICBsb29wOiB0cnVlLFxyXG4gICAgbW91c2VEcmFnOiBmYWxzZSxcclxuICAgIGFuaW1hdGVPdXQ6ICdmYWRlT3V0J1xyXG4gIH0pO1xyXG59XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IHtpbml0fTtcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gc3JjL2pzL2NvbXBvbmVudHMvY2Fyb3VzZWwuanMiLCIvKipcclxuICog0KLQtdGB0YJcclxuICogQG1vZHVsZSBUZXN0XHJcbiAqL1xyXG5cclxubGV0IHJlc3VsdCA9IHtcclxuXHRcIjBcIjogMCxcclxuXHRcIjMwXCI6IDAsXHJcblx0XCI3MFwiOiAwLFxyXG5cdFwiMTAwXCI6IDBcclxufTtcclxuXHJcbmxldCBxID0gMDtcclxuXHJcbmxldCBwYWdlcyA9IHtcclxuXHRcIjBcIjogXCJncmVlblwiLFxyXG5cdFwiMzBcIjogXCJ5ZWxsb3dcIixcclxuXHRcIjcwXCI6IFwib3JhbmdlXCIsXHJcblx0XCIxMDBcIjogXCJyZWRcIlxyXG59O1xyXG5cclxubGV0IGNhcm91c2VsID0gJChcIi5vd2wtY2Fyb3VzZWwuY2Fyb3VzZWwtLXRlc3RcIik7XHJcbmxldCB0ZXN0Q3RybCA9ICQoJy5qcy10ZXN0LWN0cmwnKTtcclxubGV0IHRlc3QgPSAkKCcuanMtdGVzdCcpO1xyXG5sZXQgdGVzdENhcmQgPSAkKCcuanMtdGVzdC1jYXJkJyk7XHJcbmxldCBhbmltQ3RybCA9ICQoJy5qcy10ZXN0LXNjYWxlLXBpbicpO1xyXG5sZXQgYW5pbUN0cmxOdW0gPSAkKCcuanMtdGVzdC1zY2FsZS1udW0nKTtcclxubGV0IGFuaW1JbmRpY2F0b3IgPSAkKCcuanMtdGVzdC1pbmRpY2F0b3InKTtcclxubGV0IGNvdW50ZXIgPSB7dmFyOiAwfTtcclxuXHJcbmZ1bmN0aW9uIGNsZWFyUmVzdWx0ICgpIHtcclxuXHRyZXN1bHQgPSB7XHJcblx0XHRcIjBcIjogMCxcclxuXHRcdFwiMzBcIjogMCxcclxuXHRcdFwiNzBcIjogMCxcclxuXHRcdFwiMTAwXCI6IDBcclxuXHR9O1xyXG59XHJcblxyXG5mdW5jdGlvbiBpc0xhc3RTbGlkZSgpIHtcclxuXHRyZXR1cm4gY2Fyb3VzZWwuZmluZCgnLm93bC1pdGVtJykuZmlsdGVyKCc6bGFzdCcpLmhhc0NsYXNzKCdhY3RpdmUnKTtcclxufVxyXG5cclxuZnVuY3Rpb24gcHJvY2Vzc1Rlc3QoZWwsIGlzTGFzdFNsaWRlID0gZmFsc2UpIHtcclxuXHRsZXQga2V5ID0gJChlbCkuYXR0cignZGF0YS1rZXknKTtcclxuXHRyZXN1bHRba2V5XSArPSAxO1xyXG5cdHEgKz0gMTtcclxuXHRnYSgnc2VuZCcsICdldmVudCcsICdxdWVzdGlvbicsICdjbGljaycsICdxdWVzdGlvbi0nICsgcSk7XHJcblx0aWYgKCFpc0xhc3RTbGlkZSkge1xyXG5cdFx0c2hvd05leHQoW2VsXSk7XHJcblx0XHRpZiAoTWFpbi5EZXZpY2VEZXRlY3Rpb24uaXNNb2JpbGVWZXJzaW9uKCkpIHtcclxuXHRcdFx0YW5pbVRlc3RJbmRpY2F0b3Ioa2V5KTtcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdGFuaW1UZXN0KGtleSk7XHJcblx0XHR9XHJcblx0fSBlbHNlIHtcclxuXHRcdGFuaW1UZXN0KGtleSk7XHJcblx0XHRzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcclxuXHRcdFx0c2hvd1Jlc3VsdChyZXN1bHQpO1xyXG5cdFx0fSwgMTAwMCk7XHJcblx0fVxyXG59XHJcbmZ1bmN0aW9uIGdldFRyYW5zbGF0ZVJhbmRvbSgpIHtcclxuXHRyZXR1cm4gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTAxKSAtIDUwO1xyXG59O1xyXG5mdW5jdGlvbiBnZXRSb3RhdGlvblJhbmRvbSgpIHtcclxuXHRyZXR1cm4gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTgxKSAtIDkwO1xyXG59O1xyXG5cclxuZnVuY3Rpb24gYW5pbVRlc3Qoa2V5LCBvbkNvbXBsZXRlRnVuYywgb25Db21wbGV0ZUZ1bmNQYXJhbXMpIHtcclxuXHRsZXQgdGwgPSBuZXcgVGltZWxpbmVNYXgoKTtcclxuXHRsZXQgdHdlZW5zQXJyID0gW107XHJcblx0dGwudG8oYW5pbUN0cmwsIDEsIHtcclxuXHRcdGxlZnQ6IGtleSArICclJywgXHJcblx0XHRlYXNlOiBQb3dlcjEuZWFzZUluT3V0LFxyXG5cdFx0b25Db21wbGV0ZTogb25Db21wbGV0ZUZ1bmMsXHJcblx0XHRvbkNvbXBsZXRlUGFyYW1zOiBvbkNvbXBsZXRlRnVuY1BhcmFtc1xyXG5cdH0pO1xyXG5cdCQoJy5jaG1fX3N5bWJvbCcpLmVhY2goZnVuY3Rpb24oKXtcclxuXHRcdGxldCB0YXJnZXRFbCA9ICQodGhpcyk7XHJcblx0XHR0d2VlbnNBcnIucHVzaChUd2Vlbk1heC50byh0YXJnZXRFbCwgMSwge1xyXG5cdFx0XHR4UGVyY2VudDogZ2V0VHJhbnNsYXRlUmFuZG9tKCksXHJcblx0XHRcdHlQZXJjZW50OiBnZXRUcmFuc2xhdGVSYW5kb20oKSxcclxuXHRcdFx0cm90YXRpb246IGdldFJvdGF0aW9uUmFuZG9tKCksXHJcblx0XHRcdGVhc2U6IFBvd2VyMS5lYXNlSW5PdXQsXHJcblx0XHRcdGRlbGF5OiAtMVxyXG5cdFx0fSkpO1xyXG5cdH0pO1xyXG5cdHR3ZWVuc0Fyci5wdXNoKFR3ZWVuTWF4LnRvKGNvdW50ZXIsIDEsIHtcclxuXHRcdHZhcjoga2V5LFxyXG5cdFx0b25VcGRhdGU6IGZ1bmN0aW9uKCkge1xyXG5cdFx0XHRhbmltQ3RybE51bS50ZXh0KE1hdGguY2VpbChjb3VudGVyLnZhcikpO1xyXG5cdFx0fSxcclxuXHRcdGVhc2U6IExpbmVhci5lYXNlTm9uZSxcclxuXHRcdGRlbGF5OiAtMVxyXG5cdH0pKTtcclxuXHR0bC5hZGQodHdlZW5zQXJyLCAxKTtcclxufVxyXG5cclxuZnVuY3Rpb24gYW5pbVRlc3RJbmRpY2F0b3Ioa2V5KSB7XHJcblx0bGV0IHJlcyA9IHBhZ2VzW2tleV07XHJcblx0YW5pbUluZGljYXRvci5hdHRyKFwiZGF0YS1rZXlcIiwgcmVzKTtcclxufVxyXG5cclxuZnVuY3Rpb24gc2hvd05leHQoZWwpIHtcclxuXHRzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xyXG5cdFx0Y2Fyb3VzZWwudHJpZ2dlcignbmV4dC5vd2wuY2Fyb3VzZWwnKTtcclxuXHR9LCAzMDApO1xyXG59XHJcblxyXG5mdW5jdGlvbiBleHRyYWN0S2V5VmFsdWUob2JqLCB2YWx1ZSkge1xyXG5cdFx0cmV0dXJuIE9iamVjdC5rZXlzKG9iailbT2JqZWN0LnZhbHVlcyhvYmopLmluZGV4T2YodmFsdWUpXTtcclxufVxyXG5cclxuZnVuY3Rpb24gY2FsY3VsYXRlUmVzdWx0KHJlc3VsdCkge1xyXG5cdGxldCBhcnIgPSBPYmplY3QudmFsdWVzKHJlc3VsdCk7XHJcblx0bGV0IG1heCA9IE1hdGgubWF4KC4uLmFycik7XHJcblx0bGV0IG1heEtleSA9IGV4dHJhY3RLZXlWYWx1ZShyZXN1bHQsIG1heCk7XHJcblx0cmV0dXJuIG1heEtleTtcclxufVxyXG5cclxuZnVuY3Rpb24gZ2V0UGFnZShhbnN3ZXIpIHtcclxuXHRsZXQgcGFnZSA9ICdyZXN1bHQtJyArIHBhZ2VzW2Fuc3dlcl0gKyAnLmh0bWwnO1xyXG5cdGxldCBwYWdlVXJsID0gd2luZG93LmxvY2F0aW9uLmhyZWYuc3BsaXQoJy8nKS5zbGljZSgwLC0xKS5qb2luKCcvJyk7XHJcblx0cGFnZVVybCArPSAnLycgKyBwYWdlO1xyXG5cdHJldHVybiBwYWdlVXJsO1xyXG59XHJcblxyXG5mdW5jdGlvbiBzaG93UmVzdWx0KHJlc3VsdCkge1xyXG5cdGxldCBhbnN3ZXIgPSBjYWxjdWxhdGVSZXN1bHQocmVzdWx0KTtcclxuXHRsZXQgcGFnZSA9IGdldFBhZ2UoYW5zd2VyKTtcclxuXHRnYSgnc2VuZCcsICdldmVudCcsICdyZXN1bHQnLCAnY2xpY2snLCAncmVzdWx0LScgKyBwYWdlc1thbnN3ZXJdKTtcclxuXHRzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcclxuXHRcdHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gcGFnZTtcclxuXHR9LCA1MDApO1xyXG59XHJcblxyXG4vKipcclxuICog0JjQvdC40YbQuNCw0LvQuNC30LDRhtC40Y8g0LrQsNGA0YPRgdC10LvQuFxyXG4gKi9cclxuZnVuY3Rpb24gaW5pdCgpe1xyXG5cclxuXHRjYXJvdXNlbC5vd2xDYXJvdXNlbCh7XHJcblx0XHRpdGVtczogMSxcclxuXHRcdG5hdjogZmFsc2UsXHJcblx0XHRkb3RzOiBmYWxzZSxcclxuXHRcdGxvb3A6IGZhbHNlLFxyXG5cdFx0bW91c2VEcmFnOiBmYWxzZSxcclxuXHRcdHRvdWNoRHJhZzogZmFsc2UsXHJcblx0XHRwdWxsRHJhZzogZmFsc2UsXHJcblx0XHRhbmltYXRlT3V0OiAnZmFkZU91dCdcclxuXHR9KTtcclxuXHRcclxuXHR0ZXN0Q3RybC5vbignY2xpY2snLCBmdW5jdGlvbigpIHtcclxuXHRcdCQodGhpcykuYWRkQ2xhc3MoJ2lzLWFjdGl2ZScpO1xyXG5cdFx0cHJvY2Vzc1Rlc3QodGhpcywgaXNMYXN0U2xpZGUoKSk7XHJcblx0fSk7XHJcblx0XHJcblx0aWYgKE1haW4uRGV2aWNlRGV0ZWN0aW9uLmlzVG91Y2goKSl7XHJcblx0XHR0ZXN0Q2FyZC5vbignY2xpY2snLCBmdW5jdGlvbigpIHtcclxuXHRcdFx0JCh0aGlzKS5hZGRDbGFzcygnZm9jdXNlZCcpO1xyXG5cdFx0fSk7XHJcblx0fSBlbHNlIHtcclxuXHRcdHRlc3RDYXJkLm9uKCdtb3VzZW92ZXInLCBmdW5jdGlvbigpIHtcclxuXHRcdFx0JCh0aGlzKS5hZGRDbGFzcygnZm9jdXNlZCcpO1xyXG5cdFx0fSk7XHJcblx0fVxyXG5cdFxyXG59XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IHtpbml0fTtcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gc3JjL2pzL2NvbXBvbmVudHMvVGVzdC5qcyIsImZ1bmN0aW9uIGdldEljb24oZWwpIHtcclxuICBsZXQgaWNvbiA9ICcnO1xyXG4gIGlmIChlbC5oYXNDbGFzcygneWEtc2hhcmUyX19pdGVtX3NlcnZpY2VfdmtvbnRha3RlJykpIHtcclxuICAgIGljb24gPSAndmsnO1xyXG4gIH1cclxuICBpZiAoZWwuaGFzQ2xhc3MoJ3lhLXNoYXJlMl9faXRlbV9zZXJ2aWNlX2ZhY2Vib29rJykpIHtcclxuICAgIGljb24gPSAnZmInO1xyXG4gIH1cclxuICBpZiAoZWwuaGFzQ2xhc3MoJ3lhLXNoYXJlMl9faXRlbV9zZXJ2aWNlX3R3aXR0ZXInKSkge1xyXG4gICAgaWNvbiA9ICd0dyc7XHJcbiAgfVxyXG4gIHJldHVybiAnPHN2ZyBjbGFzcz1cImljb24gc29jaWFsLWljb25cIj48dXNlIHhsaW5rOmhyZWY9XCIjJyArIGljb24gKyAnXCIvPjwvc3ZnPic7XHJcbn1cclxuZnVuY3Rpb24gZmlsbEljb25zKCkge1xyXG4gICQoJyNzaGFyZSAueWEtc2hhcmUyX19pdGVtJykuZWFjaChmdW5jdGlvbigpe1xyXG4gICAgJCh0aGlzKS5maW5kKCcueWEtc2hhcmUyX19pY29uJykuaHRtbChnZXRJY29uKCQodGhpcykpKTtcclxuICB9KTtcclxufVxyXG5mdW5jdGlvbiBpbml0KCkge1xyXG4gIFlhLnNoYXJlMignc2hhcmUnLCB7XHJcbiAgICBjb250ZW50OiB7XHJcbiAgICAgIHVybDogd2luZG93LmxvY2F0aW9uLmhyZWYsXHJcbiAgICAgIHRpdGxlOiAn0KPQt9C90LDQuSwg0LrQsNC6INC90LUg0L/QvtGC0LXRgNGP0YLRjCDQs9C+0LvQvtGBINC/0L7RgdC70LUg0KfQnD8nLFxyXG4gICAgICBkZXNjcmlwdGlvbjogXCJcIixcclxuICAgICAgLy9pbWFnZTogJ2J1aWxkL2ltZy9zaGFyZS5qcGcnXHJcbiAgICAgIGltYWdlOiAnaHR0cDovL2hvbWVvdm94Lm1heGltb25saW5lLnJ1L3NoYXJlLmpwZydcclxuICAgIH0sXHJcbiAgICB0aGVtZToge1xyXG4gICAgICBzZXJ2aWNlczogJ3Zrb250YWt0ZSxmYWNlYm9vayx0d2l0dGVyJyxcclxuICAgICAgYmFyZTogdHJ1ZSxcclxuICAgICAgbGFuZzogJ3J1J1xyXG4gICAgfSxcclxuICAgIGhvb2tzOiB7XHJcbiAgICAgIG9ucmVhZHk6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIGZpbGxJY29ucygpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfSk7XHJcblxyXG4gICAgJCgnLnlhLXNoYXJlMl9faXRlbV9zZXJ2aWNlX3R3aXR0ZXInKS5vbignY2xpY2snLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgZ2EoJ3NlbmQnLCAnZXZlbnQnLCAnc2hhcmUnLCAnY2xpY2snLCAnY2xpY2sgc2hhcmUgdHcnKTtcclxuICAgIH0pO1xyXG5cclxuICAgICQoJy55YS1zaGFyZTJfX2l0ZW1fc2VydmljZV9mYWNlYm9vaycpLm9uKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBnYSgnc2VuZCcsICdldmVudCcsICdzaGFyZScsICdjbGljaycsICdjbGljayBzaGFyZSBmYicpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgJCgnLnlhLXNoYXJlMl9faXRlbV9zZXJ2aWNlX3Zrb250YWt0ZScpLm9uKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBnYSgnc2VuZCcsICdldmVudCcsICdzaGFyZScsICdjbGljaycsICdjbGljayBzaGFyZSB2aycpO1xyXG4gICAgfSk7XHJcbn1cclxubW9kdWxlLmV4cG9ydHMgPSB7aW5pdH07XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHNyYy9qcy9jb21wb25lbnRzL3NoYXJlLmpzIl0sIm1hcHBpbmdzIjoiOztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7O0FDdENBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFGQTtBQUlBO0FBRUE7QUFDQTtBQUVBOzs7OztBQUtBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUxBOzs7Ozs7OztBQ3BEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBSkE7QUFDQTtBQU1BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7O0FDakNBOzs7OztBQUtBOzs7Ozs7QUFNQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7O0FBSUE7QUFDQTtBQUNBO0FBQUE7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7O0FBSUE7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7O0FBT0E7QUFBQTtBQUFBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7QUFLQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBOzs7Ozs7Ozs7QUM3S0E7Ozs7O0FBS0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBUEE7QUFTQTtBQUNBOzs7Ozs7Ozs7OztBQ3ZCQTs7Ozs7QUFLQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBSkE7QUFDQTtBQU1BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBSkE7QUFDQTtBQU1BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUpBO0FBTUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBSkE7QUFNQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBTEE7QUFPQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBTkE7QUFRQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFSQTtBQUNBO0FBVUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7Ozs7Ozs7OztBQ3pLQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBTEE7QUFPQTtBQUNBO0FBQ0E7QUFDQTtBQUhBO0FBS0E7QUFDQTtBQUNBO0FBQ0E7QUFIQTtBQWJBO0FBQ0E7QUFtQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7OyIsInNvdXJjZVJvb3QiOiIifQ==