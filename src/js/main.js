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