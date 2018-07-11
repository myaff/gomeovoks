let DeviceDetection = require("./components/device-detection");
let Helpers = require("./components/helpers");
//let Animation = require("./components/animation");
let Carousel = require("./components/carousel");
let Test = require("./components/Test");
let Share = require("./components/share");

$(document).ready(function(){
	
	DeviceDetection.run();
	Helpers.init();
	Carousel.init();
	Test.init();
	Share.init();
	
	$.afterlag(function(){
		$('html').addClass('is-loaded');
	});
	
	$('html').addClass('is-animating');

	$('body').mousemove(function(e) {
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
			let $this = $(".home-back");
			let relX = e.pageX - $this.offset().left;
			let relY = e.pageY - $this.offset().top;

			TweenMax.to(target, 1, {
					x: (relX - $this.width() / 2) / $this.width() * movement,
					y: (relY - $this.height() / 2) / $this.height() * movement
			});
	}
	
	let start = newDate();
	
	$(window).unload(function() {
		let end = newDate();
		let res = Math.round((end - start) / 1000);
		ga('send', 'event', 'time', 'click', 'time is ' + res);
	});
	
});


/**
 * Список экспортируемых модулей, чтобы иметь к ним доступ извне
 * @example
 * Main.Form.isFormValid();
 */
module.exports = {
	DeviceDetection,
	Helpers,
	Carousel,
	Test,
	Share
};