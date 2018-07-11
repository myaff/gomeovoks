/**
 * Тест
 * @module Test
 */

let result = {
	"0": 0,
	"30": 0,
	"70": 0,
	"100": 0
};

let q = 0;

let pages = {
	"0": "green",
	"30": "yellow",
	"70": "orange",
	"100": "red"
};

let carousel = $(".owl-carousel.carousel--test");
let testCtrl = $('.js-test-ctrl');
let test = $('.js-test');
let testCard = $('.js-test-card');
let animCtrl = $('.js-test-scale-pin');
let animCtrlNum = $('.js-test-scale-num');
let animIndicator = $('.js-test-indicator');
let counter = {var: 0};

function clearResult () {
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

function processTest(el, isLastSlide = false) {
	let key = $(el).attr('data-key');
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
	let tl = new TimelineMax();
	let tweensArr = [];
	tl.to(animCtrl, 1, {
		left: key + '%', 
		ease: Power1.easeInOut,
		onComplete: onCompleteFunc,
		onCompleteParams: onCompleteFuncParams
	});
	$('.chm__symbol').each(function(){
		let targetEl = $(this);
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
		onUpdate: function() {
			animCtrlNum.text(Math.ceil(counter.var));
		},
		ease: Linear.easeNone,
		delay: -1
	}));
	tl.add(tweensArr, 1);
}

function animTestIndicator(key) {
	let res = pages[key];
	animIndicator.attr("data-key", res);
}

function showNext(el) {
	setTimeout(function() {
		carousel.trigger('next.owl.carousel');
	}, 300);
}

function extractKeyValue(obj, value) {
		return Object.keys(obj)[Object.values(obj).indexOf(value)];
}

function calculateResult(result) {
	let arr = Object.values(result);
	let max = Math.max(...arr);
	let maxKey = extractKeyValue(result, max);
	return maxKey;
}

function getPage(answer) {
	let page = 'result-' + pages[answer] + '.html';
	let pageUrl = window.location.href.split('/').slice(0,-1).join('/');
	pageUrl += '/' + page;
	return pageUrl;
}

function showResult(result) {
	let answer = calculateResult(result);
	let page = getPage(answer);
	ga('send', 'event', 'result', 'click', 'result-' + pages[answer]);
	setTimeout(function () {
		window.location.href = page;
	}, 500);
}

/**
 * Инициализация карусели
 */
function init(){

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
	
	testCtrl.on('click', function() {
		$(this).addClass('is-active');
		processTest(this, isLastSlide());
	});
	
	if (Main.DeviceDetection.isTouch()){
		testCard.on('click', function() {
			$(this).addClass('focused');
		});
	} else {
		testCard.on('mouseover', function() {
			$(this).addClass('focused');
		});
	}
	
}

module.exports = {init};