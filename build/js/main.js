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

		var start = newDate();

		$(window).unload(function () {
			var end = newDate();
			var res = Math.round((end - start) / 1000);
			ga('send', 'event', 'time', 'click', 'time is ' + res);
		});
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZXMiOlsid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCBlNDc3ZTY5OGU2MzVjOTkwODg2NiIsIndlYnBhY2s6Ly8vc3JjL2pzL21haW4uanMiLCJ3ZWJwYWNrOi8vL3NyYy9qcy9jb21wb25lbnRzL2RldmljZS1kZXRlY3Rpb24uanMiLCJ3ZWJwYWNrOi8vL3NyYy9qcy9jb21wb25lbnRzL2hlbHBlcnMuanMiLCJ3ZWJwYWNrOi8vL3NyYy9qcy9jb21wb25lbnRzL2Nhcm91c2VsLmpzIiwid2VicGFjazovLy9zcmMvanMvY29tcG9uZW50cy9UZXN0LmpzIiwid2VicGFjazovLy9zcmMvanMvY29tcG9uZW50cy9zaGFyZS5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSlcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcblxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0ZXhwb3J0czoge30sXG4gXHRcdFx0aWQ6IG1vZHVsZUlkLFxuIFx0XHRcdGxvYWRlZDogZmFsc2VcbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubG9hZGVkID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCIva2Vuem8vYnVpbGQvanMvXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oMCk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gd2VicGFjay9ib290c3RyYXAgZTQ3N2U2OThlNjM1Yzk5MDg4NjYiLCJsZXQgRGV2aWNlRGV0ZWN0aW9uID0gcmVxdWlyZShcIi4vY29tcG9uZW50cy9kZXZpY2UtZGV0ZWN0aW9uXCIpO1xyXG5sZXQgSGVscGVycyA9IHJlcXVpcmUoXCIuL2NvbXBvbmVudHMvaGVscGVyc1wiKTtcclxuLy9sZXQgQW5pbWF0aW9uID0gcmVxdWlyZShcIi4vY29tcG9uZW50cy9hbmltYXRpb25cIik7XHJcbmxldCBDYXJvdXNlbCA9IHJlcXVpcmUoXCIuL2NvbXBvbmVudHMvY2Fyb3VzZWxcIik7XHJcbmxldCBUZXN0ID0gcmVxdWlyZShcIi4vY29tcG9uZW50cy9UZXN0XCIpO1xyXG5sZXQgU2hhcmUgPSByZXF1aXJlKFwiLi9jb21wb25lbnRzL3NoYXJlXCIpO1xyXG5cclxuJChkb2N1bWVudCkucmVhZHkoZnVuY3Rpb24oKXtcclxuXHRcclxuXHREZXZpY2VEZXRlY3Rpb24ucnVuKCk7XHJcblx0SGVscGVycy5pbml0KCk7XHJcblx0Q2Fyb3VzZWwuaW5pdCgpO1xyXG5cdFRlc3QuaW5pdCgpO1xyXG5cdFNoYXJlLmluaXQoKTtcclxuXHRcclxuXHQkLmFmdGVybGFnKGZ1bmN0aW9uKCl7XHJcblx0XHQkKCdodG1sJykuYWRkQ2xhc3MoJ2lzLWxvYWRlZCcpO1xyXG5cdH0pO1xyXG5cdFxyXG5cdCQoJ2h0bWwnKS5hZGRDbGFzcygnaXMtYW5pbWF0aW5nJyk7XHJcblxyXG5cdCQoJ2JvZHknKS5tb3VzZW1vdmUoZnVuY3Rpb24oZSkge1xyXG5cdFx0XHRpZiAoJCgnLmxheW91dC0taG9tZScpLmxlbmd0aCkge1xyXG5cclxuXHRcdFx0XHRcdHBhcmFsbGF4SXQoZSwgXCIuY2htX19zeW1ib2wuY2htX1/Rh1wiLCAtMTAwKTtcclxuXHRcdFx0XHRcdHBhcmFsbGF4SXQoZSwgXCIuY2htX19zeW1ib2wuY2htX1/QvFwiLCAxMDApO1xyXG5cdFx0XHRcdFx0cGFyYWxsYXhJdChlLCBcIi5jaG1fX3N5bWJvbC5jaG1fXzJcIiwgMTApO1xyXG5cdFx0XHRcdFx0cGFyYWxsYXhJdChlLCBcIi5jaG1fX3N5bWJvbC5jaG1fXzBcIiwgLTgwKTtcclxuXHRcdFx0XHRcdHBhcmFsbGF4SXQoZSwgXCIuY2htX19zeW1ib2wuY2htX18xXCIsIDY1KTtcclxuXHRcdFx0XHRcdHBhcmFsbGF4SXQoZSwgXCIuY2htX19zeW1ib2wuY2htX184XCIsIC0yMCk7XHJcblx0XHRcdH1cclxuXHR9KTtcclxuXHJcblx0ZnVuY3Rpb24gcGFyYWxsYXhJdChlLCB0YXJnZXQsIG1vdmVtZW50KSB7XHJcblx0XHRcdGxldCAkdGhpcyA9ICQoXCIuaG9tZS1iYWNrXCIpO1xyXG5cdFx0XHRsZXQgcmVsWCA9IGUucGFnZVggLSAkdGhpcy5vZmZzZXQoKS5sZWZ0O1xyXG5cdFx0XHRsZXQgcmVsWSA9IGUucGFnZVkgLSAkdGhpcy5vZmZzZXQoKS50b3A7XHJcblxyXG5cdFx0XHRUd2Vlbk1heC50byh0YXJnZXQsIDEsIHtcclxuXHRcdFx0XHRcdHg6IChyZWxYIC0gJHRoaXMud2lkdGgoKSAvIDIpIC8gJHRoaXMud2lkdGgoKSAqIG1vdmVtZW50LFxyXG5cdFx0XHRcdFx0eTogKHJlbFkgLSAkdGhpcy5oZWlnaHQoKSAvIDIpIC8gJHRoaXMuaGVpZ2h0KCkgKiBtb3ZlbWVudFxyXG5cdFx0XHR9KTtcclxuXHR9XHJcblx0XHJcblx0bGV0IHN0YXJ0ID0gbmV3RGF0ZSgpO1xyXG5cdFxyXG5cdCQod2luZG93KS51bmxvYWQoZnVuY3Rpb24oKSB7XHJcblx0XHRsZXQgZW5kID0gbmV3RGF0ZSgpO1xyXG5cdFx0bGV0IHJlcyA9IE1hdGgucm91bmQoKGVuZCAtIHN0YXJ0KSAvIDEwMDApO1xyXG5cdFx0Z2EoJ3NlbmQnLCAnZXZlbnQnLCAndGltZScsICdjbGljaycsICd0aW1lIGlzICcgKyByZXMpO1xyXG5cdH0pO1xyXG5cdFxyXG59KTtcclxuXHJcblxyXG4vKipcclxuICog0KHQv9C40YHQvtC6INGN0LrRgdC/0L7RgNGC0LjRgNGD0LXQvNGL0YUg0LzQvtC00YPQu9C10LksINGH0YLQvtCx0Ysg0LjQvNC10YLRjCDQuiDQvdC40Lwg0LTQvtGB0YLRg9C/INC40LfQstC90LVcclxuICogQGV4YW1wbGVcclxuICogTWFpbi5Gb3JtLmlzRm9ybVZhbGlkKCk7XHJcbiAqL1xyXG5tb2R1bGUuZXhwb3J0cyA9IHtcclxuXHREZXZpY2VEZXRlY3Rpb24sXHJcblx0SGVscGVycyxcclxuXHRDYXJvdXNlbCxcclxuXHRUZXN0LFxyXG5cdFNoYXJlXHJcbn07XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHNyYy9qcy9tYWluLmpzIiwibGV0IGJyZWFrcG9pbnRzID0ge1xyXG4gIHNtOiA3NjcsXHJcbiAgbWQ6IDEwMjQsXHJcbiAgbGc6IDEyODAsXHJcbiAgeGw6IDE2MDBcclxufTtcclxuXHJcbmZ1bmN0aW9uIGlzTW9iaWxlKCl7XHJcbiAgcmV0dXJuICgkKHdpbmRvdykud2lkdGgoKSA8PSBicmVha3BvaW50cy5zbSk7XHJcbn1cclxuZnVuY3Rpb24gaXNUYWJsZXQoKXtcclxuICByZXR1cm4gKCQod2luZG93KS53aWR0aCgpID4gYnJlYWtwb2ludHMuc20gJiYgJCh3aW5kb3cpLndpZHRoKCkgPD0gYnJlYWtwb2ludHMubWQpXHJcbn1cclxuZnVuY3Rpb24gaXNEZXNrdG9wRXh0KCl7XHJcbiAgcmV0dXJuICgkKHdpbmRvdykud2lkdGgoKSA+PSBicmVha3BvaW50cy5tZClcclxufVxyXG5mdW5jdGlvbiBpc0Rlc2t0b3AoKXtcclxuICByZXR1cm4gKCQod2luZG93KS53aWR0aCgpID4gYnJlYWtwb2ludHMubWQpXHJcbn1cclxuZnVuY3Rpb24gaXNUb3VjaCgpe1xyXG4gIHJldHVybiAnb250b3VjaHN0YXJ0JyBpbiB3aW5kb3cgfHwgbmF2aWdhdG9yLm1heFRvdWNoUG9pbnRzO1xyXG59XHJcbmZ1bmN0aW9uIGlzTW9iaWxlVmVyc2lvbigpe1xyXG4gIHJldHVybiAhIX53aW5kb3cubG9jYXRpb24uaHJlZi5pbmRleE9mKFwiL21vYmlsZS9cIik7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHJ1bigpe1xyXG4gIGlmKGlzVG91Y2goKSl7XHJcbiAgICAkKCdodG1sJykucmVtb3ZlQ2xhc3MoJ25vLXRvdWNoJykuYWRkQ2xhc3MoJ3RvdWNoJyk7XHJcbiAgfSBlbHNlIHtcclxuICAgICQoJ2h0bWwnKS5yZW1vdmVDbGFzcygndG91Y2gnKS5hZGRDbGFzcygnbm8tdG91Y2gnKTtcclxuICB9XHJcbn1cclxuXHJcbm1vZHVsZS5leHBvcnRzID0ge3J1biwgaXNUb3VjaCwgaXNNb2JpbGUsIGlzVGFibGV0LCBpc0Rlc2t0b3AsIGlzRGVza3RvcEV4dCwgaXNNb2JpbGVWZXJzaW9ufTtcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gc3JjL2pzL2NvbXBvbmVudHMvZGV2aWNlLWRldGVjdGlvbi5qcyIsIi8qKlxyXG4gKiBIZWxwZXJzXHJcbiAqIEBtb2R1bGUgSGVscGVyc1xyXG4gKi9cclxuXHJcbi8qKlxyXG4gKiBDYWxjdWxhdGUgc2Nyb2xsYmFyIHdpZHRoIGluIGVsZW1lbnRcclxuICogLSBpZiB0aGUgd2lkdGggaXMgMCBpdCBtZWFucyB0aGUgc2Nyb2xsYmFyIGlzIGZsb2F0ZWQvb3ZlcmxheWVkXHJcbiAqIC0gYWNjZXB0cyBcImNvbnRhaW5lclwiIHBhcmVtZXRlciBiZWNhdXNlIGllICYgZWRnZSBjYW4gaGF2ZSBkaWZmZXJlbnRcclxuICogICBzY3JvbGxiYXIgYmVoYXZpb3JzIGZvciBkaWZmZXJlbnQgZWxlbWVudHMgdXNpbmcgJy1tcy1vdmVyZmxvdy1zdHlsZSdcclxuICovXHJcbmZ1bmN0aW9uIGdldE5hdGl2ZVNjcm9sbGJhcldpZHRoIChjb250YWluZXIpIHtcclxuICBjb250YWluZXIgPSBjb250YWluZXIgfHwgZG9jdW1lbnQuYm9keTtcclxuXHJcbiAgbGV0IGZ1bGxXaWR0aCA9IDA7XHJcbiAgbGV0IGJhcldpZHRoID0gMDtcclxuXHJcbiAgbGV0IHdyYXBwZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICBsZXQgY2hpbGQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuXHJcbiAgd3JhcHBlci5zdHlsZS5wb3NpdGlvbiA9ICdhYnNvbHV0ZSc7XHJcbiAgd3JhcHBlci5zdHlsZS5wb2ludGVyRXZlbnRzID0gJ25vbmUnO1xyXG4gIHdyYXBwZXIuc3R5bGUuYm90dG9tID0gJzAnO1xyXG4gIHdyYXBwZXIuc3R5bGUucmlnaHQgPSAnMCc7XHJcbiAgd3JhcHBlci5zdHlsZS53aWR0aCA9ICcxMDBweCc7XHJcbiAgd3JhcHBlci5zdHlsZS5vdmVyZmxvdyA9ICdoaWRkZW4nO1xyXG5cclxuICB3cmFwcGVyLmFwcGVuZENoaWxkKGNoaWxkKTtcclxuICBjb250YWluZXIuYXBwZW5kQ2hpbGQod3JhcHBlcik7XHJcblxyXG4gIGZ1bGxXaWR0aCA9IGNoaWxkLm9mZnNldFdpZHRoO1xyXG4gIHdyYXBwZXIuc3R5bGUub3ZlcmZsb3dZID0gJ3Njcm9sbCc7XHJcbiAgYmFyV2lkdGggPSBmdWxsV2lkdGggLSBjaGlsZC5vZmZzZXRXaWR0aDtcclxuXHJcbiAgY29udGFpbmVyLnJlbW92ZUNoaWxkKHdyYXBwZXIpO1xyXG5cclxuICByZXR1cm4gYmFyV2lkdGg7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBUaHJvdHRsZSBIZWxwZXJcclxuICogaHR0cHM6Ly9yZW15c2hhcnAuY29tLzIwMTAvMDcvMjEvdGhyb3R0bGluZy1mdW5jdGlvbi1jYWxsc1xyXG4gKi9cclxuZnVuY3Rpb24gdGhyb3R0bGUgKGZuLCB0aHJlc2hob2xkLCBzY29wZSkge1xyXG4gIHRocmVzaGhvbGQgfHwgKHRocmVzaGhvbGQgPSAyNTApO1xyXG4gIGxldCBsYXN0LFxyXG4gICAgZGVmZXJUaW1lcjtcclxuICByZXR1cm4gZnVuY3Rpb24gKCkge1xyXG4gICAgbGV0IGNvbnRleHQgPSBzY29wZSB8fCB0aGlzO1xyXG5cclxuICAgIGxldCBub3cgPSArbmV3IERhdGUoKSxcclxuICAgICAgYXJncyA9IGFyZ3VtZW50cztcclxuICAgIGlmIChsYXN0ICYmIG5vdyA8IGxhc3QgKyB0aHJlc2hob2xkKSB7XHJcbiAgICAgIC8vIGhvbGQgb24gdG8gaXRcclxuICAgICAgY2xlYXJUaW1lb3V0KGRlZmVyVGltZXIpO1xyXG4gICAgICBkZWZlclRpbWVyID0gc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgbGFzdCA9IG5vdztcclxuICAgICAgICBmbi5hcHBseShjb250ZXh0LCBhcmdzKTtcclxuICAgICAgfSwgdGhyZXNoaG9sZCk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBsYXN0ID0gbm93O1xyXG4gICAgICBmbi5hcHBseShjb250ZXh0LCBhcmdzKTtcclxuICAgIH1cclxuICB9XHJcbn1cclxuXHJcbi8qKiBcclxuICogRGVib3VuY2UgSGVscGVyXHJcbiAqIGh0dHBzOi8vcmVteXNoYXJwLmNvbS8yMDEwLzA3LzIxL3Rocm90dGxpbmctZnVuY3Rpb24tY2FsbHNcclxuICovXHJcbmZ1bmN0aW9uIGRlYm91bmNlIChmbiwgZGVsYXkpIHtcclxuICBsZXQgdGltZXIgPSBudWxsO1xyXG4gIHJldHVybiBmdW5jdGlvbiAoKSB7XHJcbiAgICBsZXQgY29udGV4dCA9IHRoaXMsIGFyZ3MgPSBhcmd1bWVudHM7XHJcbiAgICBjbGVhclRpbWVvdXQodGltZXIpO1xyXG4gICAgdGltZXIgPSBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcclxuICAgICAgZm4uYXBwbHkoY29udGV4dCwgYXJncyk7XHJcbiAgICB9LCBkZWxheSk7XHJcbiAgfTtcclxufTtcclxuXHJcbmxldCB0aW1lcjtcclxubGV0IHRpbWVvdXQgPSBmYWxzZTtcclxubGV0IGRlbHRhID0gMjAwO1xyXG5mdW5jdGlvbiByZXNpemVFbmQoKSB7XHJcbiAgaWYgKG5ldyBEYXRlKCkgLSB0aW1lciA8IGRlbHRhKSB7XHJcbiAgICBzZXRUaW1lb3V0KHJlc2l6ZUVuZCwgZGVsdGEpO1xyXG4gIH0gZWxzZSB7XHJcbiAgICB0aW1lb3V0ID0gZmFsc2U7XHJcbiAgICAkKHdpbmRvdykudHJpZ2dlcigncmVzaXplZW5kJyk7XHJcbiAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiB0b2dnbGVDbGFzc0lmKGVsLCBjb25kLCB0b2dnbGVkQ2xhc3Mpe1xyXG5cdGlmKGNvbmQpe1xyXG5cdFx0ZWwuYWRkQ2xhc3ModG9nZ2xlZENsYXNzKTtcclxuXHR9IGVsc2Uge1xyXG5cdFx0ZWwucmVtb3ZlQ2xhc3ModG9nZ2xlZENsYXNzKTtcclxuXHR9XHJcbn1cclxuXHJcbi8qKlxyXG4gKiDQpNGD0L3QutGG0LjRjyDQtNC+0LHQsNCy0LvRj9C10YIg0Log0Y3Qu9C10LzQtdC90YLRgyDQutC70LDRgdGBLCDQtdGB0LvQuCDRgdGC0YDQsNC90LjRhtCwINC/0YDQvtC60YDRg9GH0LXQvdCwINCx0L7Qu9GM0YjQtSwg0YfQtdC8INC90LAg0YPQutCw0LfQsNC90L3QvtC1INC30L3QsNGH0LXQvdC40LUsIFxyXG4gKiDQuCDRg9Cx0LjRgNCw0LXRgiDQutC70LDRgdGBLCDQtdGB0LvQuCDQt9C90LDRh9C10L3QuNC1INC80LXQvdGM0YjQtVxyXG4gKiBAcGFyYW0ge29iamVjdH0gZWwgLSDRjdC70LXQvNC10L3Rgiwg0YEg0LrQvtGC0L7RgNGL0Lwg0LLQt9Cw0LjQvNC+0LTQtdC50YHRgtCy0YPQtdC8XHJcbiAqIEBwYXJhbSB7bWl4ZWR9IFtzY3JvbGxWYWx1ZT0wXSAtINC30L3QsNGH0LXQvdC40LUg0L/RgNC+0LrRgNGD0YLQutC4LCDQvdCwINC60L7RgtC+0YDQvtC8INC80LXQvdGP0LXQvCBjc3Mt0LrQu9Cw0YHRgSwg0L7QttC40LTQsNC10LzQvtC1INC30L3QsNGH0LXQvdC40LUgLSDRh9C40YHQu9C+INC40LvQuCDQutC70Y7Rh9C10LLQvtC1INGB0LvQvtCy0L4gJ3RoaXMnLiDQldGB0LvQuCDQv9C10YDQtdC00LDQvdC+ICd0aGlzJywg0L/QvtC00YHRgtCw0LLQu9GP0LXRgtGB0Y8g0L/QvtC70L7QttC10L3QuNC1IGVsLm9mZnNldCgpLnRvcCDQvNC40L3Rg9GBINC/0L7Qu9C+0LLQuNC90LAg0LLRi9GB0L7RgtGLINGN0LrRgNCw0L3QsFxyXG4gKiBAcGFyYW0ge3N0cmluZ30gW3RvZ2dsZWRDbGFzcz1zY3JvbGxlZF0gLSBjc3Mt0LrQu9Cw0YHRgSwg0LrQvtGC0L7RgNGL0Lkg0L/QtdGA0LXQutC70Y7Rh9Cw0LXQvFxyXG4gKi9cclxuZnVuY3Rpb24gdG9nZ2xlRWxlbWVudENsYXNzT25TY3JvbGwoZWwsIHNjcm9sbFZhbHVlID0gMCwgdG9nZ2xlZENsYXNzID0gJ3Njcm9sbGVkJyl7XHJcblx0aWYoZWwubGVuZ3RoID09IDApIHtcclxuXHRcdC8vY29uc29sZS5lcnJvcihcItCd0LXQvtCx0YXQvtC00LjQvNC+INC/0LXRgNC10LTQsNGC0Ywg0L7QsdGK0LXQutGCLCDRgSDQutC+0YLQvtGA0YvQvCDQstGLINGF0L7RgtC40YLQtSDQstC30LDQuNC80L7QtNC10LnRgdGC0LLQvtCy0LDRgtGMXCIpO1xyXG5cdFx0cmV0dXJuIGZhbHNlO1xyXG5cdH1cclxuXHRcclxuXHRpZihzY3JvbGxWYWx1ZSA9PSAndGhpcycpIHtcclxuXHRcdHNjcm9sbFZhbHVlID0gZWwub2Zmc2V0KCkudG9wIC0gJCh3aW5kb3cpLm91dGVySGVpZ2h0KCkgLyAyO1xyXG5cdH1cclxuXHRcclxuXHQkKHdpbmRvdykub24oJ3Njcm9sbCcsIGZ1bmN0aW9uKGUpe1xyXG5cdFx0aWYoJCh3aW5kb3cpLnNjcm9sbFRvcCgpID4gc2Nyb2xsVmFsdWUpe1xyXG5cdFx0XHRlbC5hZGRDbGFzcyh0b2dnbGVkQ2xhc3MpO1xyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0ZWwucmVtb3ZlQ2xhc3ModG9nZ2xlZENsYXNzKTtcclxuXHRcdH1cclxuXHR9KTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiDQuNC90LjRhtC40LDQu9C40LfQsNGG0LjRjyDRgdC+0LHRi9GC0LjQuSDQtNC70Y8g0L/QtdGA0LXQutC70Y7Rh9Cw0YLQtdC70LXQuSDQutC70LDRgdGB0L7QslxyXG4gKiBAZXhhbXBsZVxyXG4gKiBIZWxwZXJzLmluaXQoKTtcclxuICovXHJcbmZ1bmN0aW9uIGluaXQoKXtcclxuICBcclxuICB0b2dnbGVFbGVtZW50Q2xhc3NPblNjcm9sbCgkKCcuaGVhZGVyJyksIDUwKTtcclxuICBcclxuICAkKCcuanMtaGlkZS1ibG9jaycpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCl7XHJcbiAgICBsZXQgYmxvY2sgPSAkKHRoaXMpLmRhdGEoJ3RhcmdldCcpID09PSAnc2VsZicgPyAkKHRoaXMpLnBhcmVudCgpIDogJCh0aGlzKS5kYXRhKCd0YXJnZXQnKTtcclxuICAgIGJsb2NrLmZhZGVPdXQoNTAwKTtcclxuICB9KTtcclxuICBcclxuICAkKHdpbmRvdykub24oJ3Jlc2l6ZScsIGZ1bmN0aW9uICgpIHtcclxuICAgIHRpbWVyID0gbmV3IERhdGUoKTtcclxuICAgIGlmICh0aW1lb3V0ID09PSBmYWxzZSkge1xyXG4gICAgICB0aW1lb3V0ID0gdHJ1ZTtcclxuICAgICAgc2V0VGltZW91dChyZXNpemVFbmQsIGRlbHRhKTtcclxuICAgIH1cclxuICB9KTtcclxuICBcclxuICAkKCcuYnRuLW1lbnUnKS5vbignY2xpY2snLCBmdW5jdGlvbigpe1xyXG4gICAgJCh0aGlzKS50b2dnbGVDbGFzcygnaXMtb3BlbicpO1xyXG4gICAgJCgnLmhlYWRlcicpLnRvZ2dsZUNsYXNzKCdpcy1vcGVuJyk7XHJcbiAgICAkKCcubWFpbi1uYXYnKS5mYWRlVG9nZ2xlKDUwMCk7XHJcbiAgICBpZiAoTWFpbi5EZXZpY2VEZXRlY3Rpb24uaXNEZXNrdG9wRXh0KCkpIHtcclxuICAgICAgJCgnLm1haW4tbmF2LW9wcG9zaXRlJykuZmFkZVRvZ2dsZSg1MDApO1xyXG4gICAgfVxyXG4gICAgaWYgKE1haW4uRGV2aWNlRGV0ZWN0aW9uLmlzTW9iaWxlKCkgfHwgTWFpbi5EZXZpY2VEZXRlY3Rpb24uaXNUYWJsZXQoKSkge1xyXG4gICAgICBpZiAoJCgnLmhlYWRlcicpLmhhc0NsYXNzKCdpcy1vcGVuJykpIHtcclxuICAgICAgICAkKCdodG1sLCBib2R5JykuY3NzKCdvdmVyZmxvdy15JywgJ2hpZGRlbicpO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgICQoJ2h0bWwsIGJvZHknKS5jc3MoJ292ZXJmbG93LXknLCAnJyk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9KTtcclxuICBcclxuICAkKHdpbmRvdykuc2Nyb2xsKCQuZGVib3VuY2UoMjUwLCB0cnVlLCBmdW5jdGlvbigpIHtcclxuICAgICQoJ2h0bWwnKS5hZGRDbGFzcygnaXMtc2Nyb2xsaW5nJyk7XHJcbiAgfSkpO1xyXG4gICQod2luZG93KS5zY3JvbGwoJC5kZWJvdW5jZSgyNTAsIGZ1bmN0aW9uKCkge1xyXG4gICAgJCgnaHRtbCcpLnJlbW92ZUNsYXNzKCdpcy1zY3JvbGxpbmcnKTtcclxuICB9KSk7XHJcbiAgXHJcbn1cclxuXHJcbm1vZHVsZS5leHBvcnRzID0ge2luaXQsIHRvZ2dsZUNsYXNzSWYsIHRvZ2dsZUVsZW1lbnRDbGFzc09uU2Nyb2xsfTtcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gc3JjL2pzL2NvbXBvbmVudHMvaGVscGVycy5qcyIsIi8qKlxyXG4gKiDQmtCw0YDRg9GB0LXQu9GMXHJcbiAqIEBtb2R1bGUgQ2Fyb3VzZWxcclxuICovXHJcblxyXG5sZXQgY2Fyb3VzZWw7XHJcblxyXG4vKipcclxuICog0JjQvdC40YbQuNCw0LvQuNC30LDRhtC40Y8g0LrQsNGA0YPRgdC10LvQuFxyXG4gKi9cclxuZnVuY3Rpb24gaW5pdCgpe1xyXG4gIGNhcm91c2VsID0gJChcIi5vd2wtY2Fyb3VzZWwuY2Fyb3VzZWwtLWRlZmF1bHRcIik7XHJcblxyXG4gIGNhcm91c2VsLm93bENhcm91c2VsKHtcclxuICAgIGl0ZW1zOiAxLFxyXG4gICAgbmF2OiB0cnVlLFxyXG4gICAgbmF2VGV4dDogWyc8c3ZnIGNsYXNzPVwiaWNvblwiPjx1c2UgeGxpbms6aHJlZj1cIiNhcnItcHJldlwiLz48L3N2Zz4nLCAnPHN2ZyBjbGFzcz1cImljb25cIj48dXNlIHhsaW5rOmhyZWY9XCIjYXJyLW5leHRcIi8+PC9zdmc+J10sXHJcbiAgICBkb3RzOiB0cnVlLFxyXG4gICAgbG9vcDogdHJ1ZSxcclxuICAgIG1vdXNlRHJhZzogZmFsc2UsXHJcbiAgICBhbmltYXRlT3V0OiAnZmFkZU91dCdcclxuICB9KTtcclxufVxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSB7aW5pdH07XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHNyYy9qcy9jb21wb25lbnRzL2Nhcm91c2VsLmpzIiwiLyoqXHJcbiAqINCi0LXRgdGCXHJcbiAqIEBtb2R1bGUgVGVzdFxyXG4gKi9cclxuXHJcbmxldCByZXN1bHQgPSB7XHJcblx0XCIwXCI6IDAsXHJcblx0XCIzMFwiOiAwLFxyXG5cdFwiNzBcIjogMCxcclxuXHRcIjEwMFwiOiAwXHJcbn07XHJcblxyXG5sZXQgcSA9IDA7XHJcblxyXG5sZXQgcGFnZXMgPSB7XHJcblx0XCIwXCI6IFwiZ3JlZW5cIixcclxuXHRcIjMwXCI6IFwieWVsbG93XCIsXHJcblx0XCI3MFwiOiBcIm9yYW5nZVwiLFxyXG5cdFwiMTAwXCI6IFwicmVkXCJcclxufTtcclxuXHJcbmxldCBjYXJvdXNlbCA9ICQoXCIub3dsLWNhcm91c2VsLmNhcm91c2VsLS10ZXN0XCIpO1xyXG5sZXQgdGVzdEN0cmwgPSAkKCcuanMtdGVzdC1jdHJsJyk7XHJcbmxldCB0ZXN0ID0gJCgnLmpzLXRlc3QnKTtcclxubGV0IHRlc3RDYXJkID0gJCgnLmpzLXRlc3QtY2FyZCcpO1xyXG5sZXQgYW5pbUN0cmwgPSAkKCcuanMtdGVzdC1zY2FsZS1waW4nKTtcclxubGV0IGFuaW1DdHJsTnVtID0gJCgnLmpzLXRlc3Qtc2NhbGUtbnVtJyk7XHJcbmxldCBhbmltSW5kaWNhdG9yID0gJCgnLmpzLXRlc3QtaW5kaWNhdG9yJyk7XHJcbmxldCBjb3VudGVyID0ge3ZhcjogMH07XHJcblxyXG5mdW5jdGlvbiBjbGVhclJlc3VsdCAoKSB7XHJcblx0cmVzdWx0ID0ge1xyXG5cdFx0XCIwXCI6IDAsXHJcblx0XHRcIjMwXCI6IDAsXHJcblx0XHRcIjcwXCI6IDAsXHJcblx0XHRcIjEwMFwiOiAwXHJcblx0fTtcclxufVxyXG5cclxuZnVuY3Rpb24gaXNMYXN0U2xpZGUoKSB7XHJcblx0cmV0dXJuIGNhcm91c2VsLmZpbmQoJy5vd2wtaXRlbScpLmZpbHRlcignOmxhc3QnKS5oYXNDbGFzcygnYWN0aXZlJyk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHByb2Nlc3NUZXN0KGVsLCBpc0xhc3RTbGlkZSA9IGZhbHNlKSB7XHJcblx0bGV0IGtleSA9ICQoZWwpLmF0dHIoJ2RhdGEta2V5Jyk7XHJcblx0cmVzdWx0W2tleV0gKz0gMTtcclxuXHRxICs9IDE7XHJcblx0Z2EoJ3NlbmQnLCAnZXZlbnQnLCAncXVlc3Rpb24nLCAnY2xpY2snLCAncXVlc3Rpb24tJyArIHEpO1xyXG5cdGlmICghaXNMYXN0U2xpZGUpIHtcclxuXHRcdHNob3dOZXh0KFtlbF0pO1xyXG5cdFx0aWYgKE1haW4uRGV2aWNlRGV0ZWN0aW9uLmlzTW9iaWxlVmVyc2lvbigpKSB7XHJcblx0XHRcdGFuaW1UZXN0SW5kaWNhdG9yKGtleSk7XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHRhbmltVGVzdChrZXkpO1xyXG5cdFx0fVxyXG5cdH0gZWxzZSB7XHJcblx0XHRhbmltVGVzdChrZXkpO1xyXG5cdFx0c2V0VGltZW91dChmdW5jdGlvbiAoKSB7XHJcblx0XHRcdHNob3dSZXN1bHQocmVzdWx0KTtcclxuXHRcdH0sIDEwMDApO1xyXG5cdH1cclxufVxyXG5mdW5jdGlvbiBnZXRUcmFuc2xhdGVSYW5kb20oKSB7XHJcblx0cmV0dXJuIE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDEwMSkgLSA1MDtcclxufTtcclxuZnVuY3Rpb24gZ2V0Um90YXRpb25SYW5kb20oKSB7XHJcblx0cmV0dXJuIE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDE4MSkgLSA5MDtcclxufTtcclxuXHJcbmZ1bmN0aW9uIGFuaW1UZXN0KGtleSwgb25Db21wbGV0ZUZ1bmMsIG9uQ29tcGxldGVGdW5jUGFyYW1zKSB7XHJcblx0bGV0IHRsID0gbmV3IFRpbWVsaW5lTWF4KCk7XHJcblx0bGV0IHR3ZWVuc0FyciA9IFtdO1xyXG5cdHRsLnRvKGFuaW1DdHJsLCAxLCB7XHJcblx0XHRsZWZ0OiBrZXkgKyAnJScsIFxyXG5cdFx0ZWFzZTogUG93ZXIxLmVhc2VJbk91dCxcclxuXHRcdG9uQ29tcGxldGU6IG9uQ29tcGxldGVGdW5jLFxyXG5cdFx0b25Db21wbGV0ZVBhcmFtczogb25Db21wbGV0ZUZ1bmNQYXJhbXNcclxuXHR9KTtcclxuXHQkKCcuY2htX19zeW1ib2wnKS5lYWNoKGZ1bmN0aW9uKCl7XHJcblx0XHRsZXQgdGFyZ2V0RWwgPSAkKHRoaXMpO1xyXG5cdFx0dHdlZW5zQXJyLnB1c2goVHdlZW5NYXgudG8odGFyZ2V0RWwsIDEsIHtcclxuXHRcdFx0eFBlcmNlbnQ6IGdldFRyYW5zbGF0ZVJhbmRvbSgpLFxyXG5cdFx0XHR5UGVyY2VudDogZ2V0VHJhbnNsYXRlUmFuZG9tKCksXHJcblx0XHRcdHJvdGF0aW9uOiBnZXRSb3RhdGlvblJhbmRvbSgpLFxyXG5cdFx0XHRlYXNlOiBQb3dlcjEuZWFzZUluT3V0LFxyXG5cdFx0XHRkZWxheTogLTFcclxuXHRcdH0pKTtcclxuXHR9KTtcclxuXHR0d2VlbnNBcnIucHVzaChUd2Vlbk1heC50byhjb3VudGVyLCAxLCB7XHJcblx0XHR2YXI6IGtleSxcclxuXHRcdG9uVXBkYXRlOiBmdW5jdGlvbigpIHtcclxuXHRcdFx0YW5pbUN0cmxOdW0udGV4dChNYXRoLmNlaWwoY291bnRlci52YXIpKTtcclxuXHRcdH0sXHJcblx0XHRlYXNlOiBMaW5lYXIuZWFzZU5vbmUsXHJcblx0XHRkZWxheTogLTFcclxuXHR9KSk7XHJcblx0dGwuYWRkKHR3ZWVuc0FyciwgMSk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGFuaW1UZXN0SW5kaWNhdG9yKGtleSkge1xyXG5cdGxldCByZXMgPSBwYWdlc1trZXldO1xyXG5cdGFuaW1JbmRpY2F0b3IuYXR0cihcImRhdGEta2V5XCIsIHJlcyk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHNob3dOZXh0KGVsKSB7XHJcblx0c2V0VGltZW91dChmdW5jdGlvbigpIHtcclxuXHRcdGNhcm91c2VsLnRyaWdnZXIoJ25leHQub3dsLmNhcm91c2VsJyk7XHJcblx0fSwgMzAwKTtcclxufVxyXG5cclxuZnVuY3Rpb24gZXh0cmFjdEtleVZhbHVlKG9iaiwgdmFsdWUpIHtcclxuXHRcdHJldHVybiBPYmplY3Qua2V5cyhvYmopW09iamVjdC52YWx1ZXMob2JqKS5pbmRleE9mKHZhbHVlKV07XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGNhbGN1bGF0ZVJlc3VsdChyZXN1bHQpIHtcclxuXHRsZXQgYXJyID0gT2JqZWN0LnZhbHVlcyhyZXN1bHQpO1xyXG5cdGxldCBtYXggPSBNYXRoLm1heCguLi5hcnIpO1xyXG5cdGxldCBtYXhLZXkgPSBleHRyYWN0S2V5VmFsdWUocmVzdWx0LCBtYXgpO1xyXG5cdHJldHVybiBtYXhLZXk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGdldFBhZ2UoYW5zd2VyKSB7XHJcblx0bGV0IHBhZ2UgPSAncmVzdWx0LScgKyBwYWdlc1thbnN3ZXJdICsgJy5odG1sJztcclxuXHRsZXQgcGFnZVVybCA9IHdpbmRvdy5sb2NhdGlvbi5ocmVmLnNwbGl0KCcvJykuc2xpY2UoMCwtMSkuam9pbignLycpO1xyXG5cdHBhZ2VVcmwgKz0gJy8nICsgcGFnZTtcclxuXHRyZXR1cm4gcGFnZVVybDtcclxufVxyXG5cclxuZnVuY3Rpb24gc2hvd1Jlc3VsdChyZXN1bHQpIHtcclxuXHRsZXQgYW5zd2VyID0gY2FsY3VsYXRlUmVzdWx0KHJlc3VsdCk7XHJcblx0bGV0IHBhZ2UgPSBnZXRQYWdlKGFuc3dlcik7XHJcblx0Z2EoJ3NlbmQnLCAnZXZlbnQnLCAncmVzdWx0JywgJ2NsaWNrJywgJ3Jlc3VsdC0nICsgcGFnZXNbYW5zd2VyXSk7XHJcblx0c2V0VGltZW91dChmdW5jdGlvbiAoKSB7XHJcblx0XHR3aW5kb3cubG9jYXRpb24uaHJlZiA9IHBhZ2U7XHJcblx0fSwgNTAwKTtcclxufVxyXG5cclxuLyoqXHJcbiAqINCY0L3QuNGG0LjQsNC70LjQt9Cw0YbQuNGPINC60LDRgNGD0YHQtdC70LhcclxuICovXHJcbmZ1bmN0aW9uIGluaXQoKXtcclxuXHJcblx0Y2Fyb3VzZWwub3dsQ2Fyb3VzZWwoe1xyXG5cdFx0aXRlbXM6IDEsXHJcblx0XHRuYXY6IGZhbHNlLFxyXG5cdFx0ZG90czogZmFsc2UsXHJcblx0XHRsb29wOiBmYWxzZSxcclxuXHRcdG1vdXNlRHJhZzogZmFsc2UsXHJcblx0XHR0b3VjaERyYWc6IGZhbHNlLFxyXG5cdFx0cHVsbERyYWc6IGZhbHNlLFxyXG5cdFx0YW5pbWF0ZU91dDogJ2ZhZGVPdXQnXHJcblx0fSk7XHJcblx0XHJcblx0dGVzdEN0cmwub24oJ2NsaWNrJywgZnVuY3Rpb24oKSB7XHJcblx0XHQkKHRoaXMpLmFkZENsYXNzKCdpcy1hY3RpdmUnKTtcclxuXHRcdHByb2Nlc3NUZXN0KHRoaXMsIGlzTGFzdFNsaWRlKCkpO1xyXG5cdH0pO1xyXG5cdFxyXG5cdGlmIChNYWluLkRldmljZURldGVjdGlvbi5pc1RvdWNoKCkpe1xyXG5cdFx0dGVzdENhcmQub24oJ2NsaWNrJywgZnVuY3Rpb24oKSB7XHJcblx0XHRcdCQodGhpcykuYWRkQ2xhc3MoJ2ZvY3VzZWQnKTtcclxuXHRcdH0pO1xyXG5cdH0gZWxzZSB7XHJcblx0XHR0ZXN0Q2FyZC5vbignbW91c2VvdmVyJywgZnVuY3Rpb24oKSB7XHJcblx0XHRcdCQodGhpcykuYWRkQ2xhc3MoJ2ZvY3VzZWQnKTtcclxuXHRcdH0pO1xyXG5cdH1cclxuXHRcclxufVxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSB7aW5pdH07XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHNyYy9qcy9jb21wb25lbnRzL1Rlc3QuanMiLCJmdW5jdGlvbiBnZXRJY29uKGVsKSB7XHJcbiAgbGV0IGljb24gPSAnJztcclxuICBpZiAoZWwuaGFzQ2xhc3MoJ3lhLXNoYXJlMl9faXRlbV9zZXJ2aWNlX3Zrb250YWt0ZScpKSB7XHJcbiAgICBpY29uID0gJ3ZrJztcclxuICB9XHJcbiAgaWYgKGVsLmhhc0NsYXNzKCd5YS1zaGFyZTJfX2l0ZW1fc2VydmljZV9mYWNlYm9vaycpKSB7XHJcbiAgICBpY29uID0gJ2ZiJztcclxuICB9XHJcbiAgaWYgKGVsLmhhc0NsYXNzKCd5YS1zaGFyZTJfX2l0ZW1fc2VydmljZV90d2l0dGVyJykpIHtcclxuICAgIGljb24gPSAndHcnO1xyXG4gIH1cclxuICByZXR1cm4gJzxzdmcgY2xhc3M9XCJpY29uIHNvY2lhbC1pY29uXCI+PHVzZSB4bGluazpocmVmPVwiIycgKyBpY29uICsgJ1wiLz48L3N2Zz4nO1xyXG59XHJcbmZ1bmN0aW9uIGZpbGxJY29ucygpIHtcclxuICAkKCcjc2hhcmUgLnlhLXNoYXJlMl9faXRlbScpLmVhY2goZnVuY3Rpb24oKXtcclxuICAgICQodGhpcykuZmluZCgnLnlhLXNoYXJlMl9faWNvbicpLmh0bWwoZ2V0SWNvbigkKHRoaXMpKSk7XHJcbiAgfSk7XHJcbn1cclxuZnVuY3Rpb24gaW5pdCgpIHtcclxuICBZYS5zaGFyZTIoJ3NoYXJlJywge1xyXG4gICAgY29udGVudDoge1xyXG4gICAgICB1cmw6IHdpbmRvdy5sb2NhdGlvbi5ocmVmLFxyXG4gICAgICB0aXRsZTogJ9Cj0LfQvdCw0LksINC60LDQuiDQvdC1INC/0L7RgtC10YDRj9GC0Ywg0LPQvtC70L7RgSDQv9C+0YHQu9C1INCn0Jw/JyxcclxuICAgICAgZGVzY3JpcHRpb246IFwiXCIsXHJcbiAgICAgIC8vaW1hZ2U6ICdidWlsZC9pbWcvc2hhcmUuanBnJ1xyXG4gICAgICBpbWFnZTogJ2h0dHA6Ly9ob21lb3ZveC5tYXhpbW9ubGluZS5ydS9zaGFyZS5qcGcnXHJcbiAgICB9LFxyXG4gICAgdGhlbWU6IHtcclxuICAgICAgc2VydmljZXM6ICd2a29udGFrdGUsZmFjZWJvb2ssdHdpdHRlcicsXHJcbiAgICAgIGJhcmU6IHRydWUsXHJcbiAgICAgIGxhbmc6ICdydSdcclxuICAgIH0sXHJcbiAgICBob29rczoge1xyXG4gICAgICBvbnJlYWR5OiBmdW5jdGlvbigpIHtcclxuICAgICAgICBmaWxsSWNvbnMoKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH0pO1xyXG5cclxuICAgICQoJy55YS1zaGFyZTJfX2l0ZW1fc2VydmljZV90d2l0dGVyJykub24oJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIGdhKCdzZW5kJywgJ2V2ZW50JywgJ3NoYXJlJywgJ2NsaWNrJywgJ2NsaWNrIHNoYXJlIHR3Jyk7XHJcbiAgICB9KTtcclxuXHJcbiAgICAkKCcueWEtc2hhcmUyX19pdGVtX3NlcnZpY2VfZmFjZWJvb2snKS5vbignY2xpY2snLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgZ2EoJ3NlbmQnLCAnZXZlbnQnLCAnc2hhcmUnLCAnY2xpY2snLCAnY2xpY2sgc2hhcmUgZmInKTtcclxuICAgIH0pO1xyXG5cclxuICAgICQoJy55YS1zaGFyZTJfX2l0ZW1fc2VydmljZV92a29udGFrdGUnKS5vbignY2xpY2snLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgZ2EoJ3NlbmQnLCAnZXZlbnQnLCAnc2hhcmUnLCAnY2xpY2snLCAnY2xpY2sgc2hhcmUgdmsnKTtcclxuICAgIH0pO1xyXG59XHJcbm1vZHVsZS5leHBvcnRzID0ge2luaXR9O1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyBzcmMvanMvY29tcG9uZW50cy9zaGFyZS5qcyJdLCJtYXBwaW5ncyI6Ijs7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7OztBQ3RDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRkE7QUFJQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBRUE7Ozs7O0FBS0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBTEE7Ozs7Ozs7O0FDNURBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFKQTtBQUNBO0FBTUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7QUNqQ0E7Ozs7O0FBS0E7Ozs7OztBQU1BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7QUFJQTtBQUNBO0FBQ0E7QUFBQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7QUFJQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7QUFPQTtBQUFBO0FBQUE7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7OztBQUtBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7Ozs7Ozs7OztBQzdLQTs7Ozs7QUFLQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFQQTtBQVNBO0FBQ0E7Ozs7Ozs7Ozs7O0FDdkJBOzs7OztBQUtBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFKQTtBQUNBO0FBTUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFKQTtBQUNBO0FBTUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBSkE7QUFNQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFKQTtBQU1BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFMQTtBQU9BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFOQTtBQVFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQVJBO0FBQ0E7QUFVQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTs7Ozs7Ozs7O0FDektBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFMQTtBQU9BO0FBQ0E7QUFDQTtBQUNBO0FBSEE7QUFLQTtBQUNBO0FBQ0E7QUFDQTtBQUhBO0FBYkE7QUFDQTtBQW1CQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Iiwic291cmNlUm9vdCI6IiJ9