var wW;
var wH;
var transitionPageDelay = 800 + 50;

var scrollTop;
var currentPage;
var currentPageClass;
var currentProjectClass;
var brandPage = $('.navbar-brand .sub-page');
var footer = $('.footer');
var footerHeight;

var currentItem;
var currentScrollTop;
var projectItemClone;

var borderWidth;
var firstTime = true;

var touch = typeof window.ontouchstart !== 'undefined';
var is_iPad = navigator.userAgent.match(/iPad/i) != null;
var $browser;


$(document).ready(function() {

	history.scrollRestoration = 'manual';

	initHeaderFooter = function(){

		$('.navbar-brand, #menu a, .porfolio-info a, .preambule__buttons a').on('click', function(e){

			var rel = $(this).prop('rel');
			if (rel == "external") {
				return;
			}

			e.preventDefault();
			var target = $(this);
			var targetURL = target.attr('href');

			if ($('body').hasClass('page-projects')) {

				if (target.is('.services-scroll')) {
					setTimeout(function () {
						TweenMax.to(window, 2, {scrollTo: {y: $('#services').offset().top}, ease: Power3.easeInOut});
					}, 2000);
				}

			} else {
				if (target.is('.services-scroll')) {
					var href = target.attr('href');

					TweenLite.to(window, 2, {scrollTo: {y: $('#services').offset().top}, ease: Power3.easeInOut});
					$('.navbar-toggle').trigger('click').delay(150);

					return;
				}
			}

			if (target.is('.navbar-brand')) {
				$('.home-link').addClass('active');
			}

			if ($('body').hasClass('openPopup')) {
				$('.popup .btn-close').trigger('click');
			}

			if ($('body').hasClass('showProject')) {
				$('body').removeClass('showProject');
			}

			if ($('body').hasClass('hideNav')) {
				$('body').removeClass('hideNav');
			}

			if ($('body').hasClass('addedProject')) {
				$('body').removeClass('addedProject');
			}

			if ($('body').hasClass('menuOpen')) {
				$('.navbar-toggle').trigger('click').delay(150).queue(function(){
					loadPage(targetURL);
					history.pushState({page:targetURL}, null, targetURL);
					$(this).dequeue();
				})
			} else {
				loadPage(targetURL);
				history.pushState({page:targetURL}, null, targetURL);
			}

			TweenLite.to(window, 0.3, {scrollTo: {y: 0}, ease: Power3.easeInOut});


		})

		var loaderTL = new TimelineMax({repeat:-1});
		loaderTL.set(".loaderpath", {drawSVG:"0%"})
		.to(".loaderpath", 0.8, {drawSVG:"0% 70%", ease:Power3.easeIn})
		.to(".loaderpath", 0.1, {drawSVG:"10% 80%", ease:Power3.easeNone})
		.to(".loaderpath", 0.1, {drawSVG:"20% 90%", ease:Power3.easeNone})
		.to(".loaderpath", 0.1, {drawSVG:"30% 100%", ease:Power3.easeOut})
		.to(".loaderpath", 0.8, {drawSVG:"100% 100%", ease:Power3.easeOut});

		$('.navbar-toggle').on('click', function(e){

			e.preventDefault();
			$('body').toggleClass('menuOpen');

			if(!$('body').hasClass('menuOpen')) {
				$(".navbar-toggle").trigger('mouseleave');
				if (is_iPad) { $('html').css({overflow:'auto', height:'auto'}); }
			} else {
				if (is_iPad) { $('html').css({overflow:'hidden', height:'100%'}); }
			}
		})

		$(".navbar-toggle").hover( function (e) {
			$('body').toggleClass('menuHover', e.type === 'mouseenter');
		});

		$('.scrolltop').on('click', function(e){
			e.preventDefault();
			TweenLite.to(window, 0.8, {scrollTo: {y:0, autoKill:false}, ease: Power3.easeInOut});
		});

		$('.menuColor').on('click',function(e){
			$('.navbar-toggle').trigger('click');
		})

		

		TweenLite.ticker.addEventListener("tick", onScroll);

		function onScroll() {

			scrollTop = $(window).scrollTop();

			if ( scrollTop > wH && !$('.scrolltop').hasClass('showed') ) {
				$('.scrolltop').addClass('visible');
			} else {
				$('.scrolltop').removeClass('visible');
			}


			if (scrollTop > $('.page-container').outerHeight() - window.innerHeight + borderWidth - 60) {

				if (wW > 768) {
					TweenLite.set($('footer .briefLink'), { y: - footerHeight * 1 + ((scrollTop - ($('.page-container').outerHeight() - window.innerHeight)) * 1) , ease: Linear.easeNone });
					TweenLite.set($('footer .contact'), { y: - footerHeight * 0.5 + ((scrollTop - ($('.page-container').outerHeight() - window.innerHeight)) * 0.5) , ease: Linear.easeNone });
					TweenLite.set($('footer .credits'), { y: - footerHeight * 0.1 + ((scrollTop - ($('.page-container').outerHeight() - window.innerHeight)) * 0.1) , ease: Linear.easeNone });
				}
				TweenLite.set($('.scrolltop'), { y: - ( scrollTop - ($('.page-container').outerHeight() - window.innerHeight + borderWidth - 60)), ease: Linear.easeNone });
				TweenLite.set($('.scrolldown'), { y: - ( scrollTop - ($('.page-container').outerHeight() - window.innerHeight + borderWidth - 60)), ease: Linear.easeNone });
				TweenLite.set($('.scrolldown'), {css:{ opacity : 1 - (( scrollTop - ($('.page-container').outerHeight() - window.innerHeight + borderWidth)) * 0.01)}});
				TweenLite.set($('.scrolltop'), {css:{ opacity : 1 - (( scrollTop - ($('.page-container').outerHeight() - window.innerHeight + borderWidth)) * 0.01)}});

				/*if (!$('.footer').hasClass('show')) {
					$('.footer').addClass('show');
					footerTl.restart(0);
				};*/

			} else {
				if (wW > 768) {
					TweenLite.set($('footer .briefLink'),{ y: - footerHeight * 1 , ease: Linear.easeNone });
					TweenLite.set($('footer .contact'),{ y: - footerHeight * 0.5 , ease: Linear.easeNone });
					TweenLite.set($('footer .credits'),{ y: - footerHeight * 0.1 , ease: Linear.easeNone });
				}
				TweenLite.set($('.scrolltop'),{ y: 0 , ease: Linear.easeNone });
				TweenLite.set($('.scrolldown'),{ y: 0 , ease: Linear.easeNone });
				TweenLite.set($('.scrolldown'),{css:{ opacity :1}});
				TweenLite.set($('.scrolltop'),{css:{ opacity :1}});

				/*if ($('.footer').hasClass('show')) {
					$('.footer').removeClass('show');
				};*/

			}


		}

	};

	initCarusel = function() {
		$('.j-carusel').slick({
			slidesToShow: 3,
			slidesToScroll: 1,
			dots: false,
			infinite: false,
			speed: 500,
			appendArrows: '.carusel-arrows',
			prevArrow: '<button class="slider-prev"><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Capa_1" x="0px" y="0px" viewBox="0 0 477.175 477.175" style="enable-background:new 0 0 477.175 477.175;" xml:space="preserve" width="512px" height="512px"><g><g><path d="M145.188,238.575l215.5-215.5c5.3-5.3,5.3-13.8,0-19.1s-13.8-5.3-19.1,0l-225.1,225.1c-5.3,5.3-5.3,13.8,0,19.1l225.1,225   c2.6,2.6,6.1,4,9.5,4s6.9-1.3,9.5-4c5.3-5.3,5.3-13.8,0-19.1L145.188,238.575z" data-original="#000000" class="active-path" data-old_color="#0264af" fill="#0264af"/></g></g> </svg></button>',
			nextArrow: '<button class="slider-next"><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Capa_1" x="0px" y="0px" viewBox="0 0 477.175 477.175" style="enable-background:new 0 0 477.175 477.175;" xml:space="preserve" width="512px" height="512px"><g><g><path d="M360.731,229.075l-225.1-225.1c-5.3-5.3-13.8-5.3-19.1,0s-5.3,13.8,0,19.1l215.5,215.5l-215.5,215.5   c-5.3,5.3-5.3,13.8,0,19.1c2.6,2.6,6.1,4,9.5,4c3.4,0,6.9-1.3,9.5-4l225.1-225.1C365.931,242.875,365.931,234.275,360.731,229.075z   " data-original="#000000" class="active-path" data-old_color="#0264af" fill="#0264af"/></g></g> </svg></button>',
		});
	};

	initSlider = function () {
		$('.j-slider').not('.slick-initialized').slick({
			slidesToShow: 1,
			slidesToScroll: 1,
			dots: false,
			infinite: true,
			speed: 200,
			fade: true,
			draggable: false,
			appendArrows: '.skills__arrows',
			prevArrow: '<button class="slider-prev"><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Capa_1" x="0px" y="0px" viewBox="0 0 477.175 477.175" style="enable-background:new 0 0 477.175 477.175;" xml:space="preserve" width="512px" height="512px"><g><g><path d="M145.188,238.575l215.5-215.5c5.3-5.3,5.3-13.8,0-19.1s-13.8-5.3-19.1,0l-225.1,225.1c-5.3,5.3-5.3,13.8,0,19.1l225.1,225   c2.6,2.6,6.1,4,9.5,4s6.9-1.3,9.5-4c5.3-5.3,5.3-13.8,0-19.1L145.188,238.575z" data-original="#000000" class="active-path" data-old_color="#0264af" fill="#0264af"/></g></g> </svg></button>',
			nextArrow: '<button class="slider-next"><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Capa_1" x="0px" y="0px" viewBox="0 0 477.175 477.175" style="enable-background:new 0 0 477.175 477.175;" xml:space="preserve" width="512px" height="512px"><g><g><path d="M360.731,229.075l-225.1-225.1c-5.3-5.3-13.8-5.3-19.1,0s-5.3,13.8,0,19.1l215.5,215.5l-215.5,215.5   c-5.3,5.3-5.3,13.8,0,19.1c2.6,2.6,6.1,4,9.5,4c3.4,0,6.9-1.3,9.5-4l225.1-225.1C365.931,242.875,365.931,234.275,360.731,229.075z   " data-original="#000000" class="active-path" data-old_color="#0264af" fill="#0264af"/></g></g> </svg></button>',
			asNavFor: '.j-slider-dots',
		});
		$('.j-slider-dots').not('.slick-initialized').slick({
			slidesToShow: 7,
			arrows: false,
			dots: false,
			asNavFor: '.j-slider',
			focusOnSelect: true,
			infinite: true,
			vertical: true,
			speed: 200,
		});
	};

	initForms = function () {
		var callPopup = $('#call-popup');

		var tlClosePopup;

		$('.popup-open').click(function(e) {
			e.preventDefault();

			tlClosePopup = TweenMax.to(callPopup, 1, {opacity: '1', x: '0', display: 'block', ease:Power3.easeOut });
			$('body').css('overflow-y', 'hidden');
			$('.overlay').fadeIn('slow');
		});

		$('.skills__close, .overlay').click(function(e) {
			e.preventDefault();

			tlClosePopup.reverse();
			$('body').css('overflow-y', 'scroll');
			$('.overlay').fadeOut('slow');
		});
		
		var $formNext = $('.form__next');
		var $formPrev = $('.form__prev');
		var $formSubmit = $('.form__submit');

		$('.form__input.active input').on('input', function () {
			if($(this).find('input').val() == '') {
				$formNext.hide();
			} else {
				$formNext.fadeIn();
				$('.form__error span').remove();
			}
		});

		tlNext = new TimelineMax(); 

		$formNext.on('click', function nextActive () {
			var formBlCount = $('.form__input.active').data('field');
			var valueForm = $('.form__input.active').find('input').val();

			$('.form__error span').remove();
			if(valueForm != '') {
				$('.form__input').removeClass('active');

				if(formBlCount > 0) {
					$formPrev.fadeIn();
				}
				if(formBlCount == 2) {
					$formNext.hide();
					$formSubmit.fadeIn();
				} else {
					$formNext.fadeIn();
					$formSubmit.hide();
				}
				$('.form__input[data-field=' + (formBlCount + 1) + ']').addClass('active');

				tlNext.to('.form__input[data-field=' + (formBlCount) + ']', 0.6, {skewX: '10px', rotation:"-5px", perspective: "100px", opacity: 0, display: "none", ease:Power3.easeOut});
				tlNext.to('.form__input[data-field=' + (formBlCount + 1) + ']', 0.6, {opacity: 1, skewX: '0', rotation:"0", perspective: "0", opacity: 1, display: "block", ease:Power3.easeOut});
				$('.form__error span').remove();
			} else {
				$('.form__error').append('<span></span>');
				$('.form__error span').text('Заполните пожалуйста поле.');
			}
		});

		$formPrev.on('click', function prevActive () {
			var formBlCount = $('.form__input.active').data('field');

			$('.form__input').removeClass('active');

			if(formBlCount > 2) {
				$formPrev.fadeIn();
			} else {
				$formPrev.hide();
			}
			if(formBlCount < 4) {
				$formNext.fadeIn();
				$formSubmit.hide();
			} 

			$('.form__input[data-field=' + (formBlCount - 1) + ']').addClass('active');
			tlNext.to('.form__input[data-field=' + (formBlCount) + ']', 0.6, {skewX: '10px', rotation:"-5px", perspective: "100px", opacity: 0, display: "none", ease:Power3.easeOut});
			tlNext.to('.form__input[data-field=' + (formBlCount - 1) + ']', 0.6, {opacity: 1, skewX: '0', rotation:"0", perspective: "0", display: "block", ease:Power3.easeOut});

		});
	};

	var tlHello;
	var tlWoldak;
	var tlPreambule;
	var preambuleText;
	var preambuleLines;
	var tlVision;
	var tlCreativity;
	var tlVideoStart;

	initHome = function(){
		initSlider();
		initForms();

		console.log('Home Page initialised');
		$('body').addClass('showHello');

		///ANIMATIONS PREAMBULE
		tlHello = new TimelineLite({ paused: true});
		tlHello.staggerFrom($("#hello_h > *"), 0.6, {drawSVG:"0%", ease:Power3.easeOut},  0.2, 0.8);
		tlHello.staggerFrom($("#hello_e > *"), 0.6, {drawSVG:"0%", ease:Power3.easeOut},  0.2, "-=0.7");
		tlHello.staggerFrom($("#hello_l1 > *"), 0.6, {drawSVG:"0%", ease:Power3.easeOut},  0.4, "-=1.2");
		tlHello.staggerFrom($("#hello_l2 > *"), 0.6, {drawSVG:"0%", ease:Power3.easeOut},  0.4, "-=1");
		tlHello.staggerFrom($("#hello_o > *"), 1.2, {drawSVG:"0%", ease:Power3.easeOut},  0.2, "=1.2");
		tlHello.staggerFrom($("#hello_dot > *"), 0.6, {scale:0, transformOrigin:"50% 50%", ease:Power3.easeOut },  0.2, "-=0.8");
		tlHello.staggerFrom($(".hello-scrolldown"), 1.2, {bottom:-50, ease:Power3.easeOut },  0.2, "-=0.8");

		tlHello.staggerFrom($(".hello__woldak__path"), 0.5, {scale:0, transformOrigin:"50% 50%", ease:Power3.easeOut}, 0.2, "-=0.8");

		if($browser.name == "Safari" && $browser.version < 10) {
			tlHello.progress(1, false);
		} else {
			tlHello.play().timeScale(1);
		}

		tlPreambule= new TimelineLite({ paused: true});
		preambuleText = new SplitText(".preambule p", {type:"lines"});
		preambuleLines = preambuleText.lines;
		for(var i = 0; i<preambuleLines.length; i++){
			preambuleLines[i].innerHTML = '<span>'+preambuleLines[i].innerHTML+'</span>';
		}
		tlPreambule.from(".preambule .block-title svg > *", 0.8, {drawSVG:"0%", ease:Power3.easeOut}, 0.5)
		tlPreambule.from(".preambule .block-title .mskd", 1, {x:"-20%", opacity:0, ease:Power3.easeOut}, "-=0.60");
		tlPreambule.staggerFrom($(preambuleLines).find('span'), 1.2, {y:"100%", ease: Power3.easeInOut},  0.05, "-=1.6");

		var prllxVideoContainer = TweenLite.to(".parallax .video-bg", 1, { yPercent: 50, ease: Linear.easeNone, paused: true });

		tlVideoStart = new TimelineLite({ paused: true});

		$('.video-container__number span').each(function () {
			tlVideoStart.staggerTo($(this), 1, {display: 'block', opacity: '1', scale: '1', ease: Power3.easeInOut}, 1);
			tlVideoStart.staggerTo($(this), 1, {display: 'none', opacity: '0', scale: '.5', ease: Power3.easeInOut}, 1);
		});
		tlVideoStart.staggerTo('.video-bg', 0.01, {background: '#262b4e', ease: Power3.easeInOut});
		tlVideoStart.staggerTo('.video-container__rocket', 1, {display: 'block', opacity: '1', ease: Power3.easeInOut});
		
		tlVideoStart
		.addLabel('start', 0)
		.add(TweenMax.from(".takeoff", 0.5, {scaleY:0, y: -200, ease:Expo.easeInOut, delay:3}))
		.add(TweenMax.to("#rocket", 1 ,{className:"+=shake", delay:-1}))
		.add(TweenMax.to(".smoke", 2,{y: -50, delay: 1}))
		.add(TweenMax.to("#rocket", 1 ,{className: "-=shake"}))
		.add(TweenMax.to("#rocket",1, {y: -300,  delay:-1}))
		.add(TweenMax.to(".takeoff",1, {y: -300, delay:-1}))
		.add(TweenMax.to(".smoke", 5,{scale: 1, y: -20, delay: -1}))
		.add(TweenMax.to("#rocket",1, {y: -10, rotate: 40, delay: -3}))
		.add(TweenMax.to(".takeoff",0.2, {opacity: 0, delay: -3}))
		.add(TweenMax.to(".stars",0.2, {opacity: 0, delay: -3}))
		.add(TweenMax.from(".stars2",0.2, {opacity: 0, delay: -3}))
		.add(TweenMax.to(".smoke", 2,{opacity: 0, delay: -2}))

		tlVideoStart.staggerTo('.woldak__bl', 1, {display: 'block', opacity: '1', scale: '1', ease: Power3.easeInOut}, 0.3);



		//ANIMATION WOLDAK
		tlWoldak= new TimelineLite({ paused: true});
		tlWoldak.to(".woldak .padding__border", 7, {height: "100%", ease:Power3.easeInOut}, 0);
		tlWoldak.to(".woldak .woldak__img-inner", 0.8, {y: "0%", ease:Power3.easeInOut}, 0.4);

		//ANIMATION SERVICES
		tlServices = new TimelineLite({ paused: true});
		tlServices.to(".services .service__overflow", 1.5, {x: "0", y: "0", ease:Power3.easeInOut}, 0, "-=1");

		//ANIMATIONS VISION
		tlVision = new TimelineLite({ paused: true});
		
		tlVision.from(".services p.intro2", 0.8, {y:60, opacity:0, ease:Power3.easeOut}, "-=1")
		tlVision.from(".vision .block-content a", 0.8, {y:60, opacity:0, ease:Power3.easeOut}, "-=0.8")
		tlVision.to(".vision .padding__border", 7, {height: "100%", ease:Power3.easeInOut}, 0, "-=1");
		
		TweenLite.set(".vision .skills-container", {y: '25%'});
		var prllxVisionSills = TweenLite.to(".vision .skills-container", 1, { y: '-25%', ease: Linear.easeNone, paused: true });
		

		//Animation img skills 
		tlSkillsimg = new TimelineLite({ paused: true});
		tlSkillsimg.staggerFromTo($(".skills__item .skills__img svg > g *"), 2,{drawSVG:"0"},{drawSVG:true},0.2);



		$('.animated').viewportChecker({
			repeat: false,
			offset:-100,
			callbackFunction: function(elem, action){

				if (elem.is('.vision')) {
					if( elem.hasClass('visible') && action == "add" && !elem.hasClass('animating') ) {
						elem.addClass('animating');
						tlVision.play().timeScale(1);
					}
				} 
				if (elem.is('.woldak')) {
					elem.addClass('animating');
					tlWoldak.play().timeScale(1);
				} 
				if (elem.is('.services')) {
					elem.addClass('animating');
					tlServices.play().timeScale(1);
				} 
				if(elem.is('.parallax')) {
					elem.addClass('animating');
					tlVideoStart.play().timeScale(1);
				}
				
			}
		});


		TweenLite.ticker.addEventListener("tick", onScroll);
		function onScroll() {

			if(!$('body').hasClass('page-home')) return;

			scrollAmount = $(window).scrollTop();

			offsetWoldak = $('.woldak').offset().top;
			offsetSkills = $('.skills-container').offset().top;

			//Animation video woldak

			if (scrollAmount > offsetWoldak - 100) {
				TweenMax.to($('.woldak-video__circle'), 4, {scale:1.3, ease:Power3.easeOut },  0.2, "-=0.8");
				TweenMax.to($('.woldak-video__absolute > img'), 8, {scale:1.3, opacity: 1, ease:Power3.easeOut },  2).delay(1);
			} else {
				
			}


			//ANIMATION PREAMBULE
			if (scrollAmount > 10 && $('body').hasClass('showHello')) {
				$('body').removeClass('showHello');
				tlPreambule.play().timeScale(1);
			} else if (scrollAmount <= 10 && !$('body').hasClass('showHello')){
				$('body').addClass('showHello');
				tlPreambule.reverse().timeScale(2);
			}

			if ( !$('body').hasClass('page-home') || wW < 768  ) {
				return;
			};

			//PRLLX PREAMBULE

			if (scrollAmount < $('.preambule').outerHeight() + wH) {
				$('.hello, .preambule').show();
			} else {
				$('.hello, .preambule').hide();
			}

			if (scrollAmount > $('.preambule').outerHeight() && scrollAmount < $('.preambule').outerHeight() + wH ) {

				TweenLite.to($('.hello'), 0, { y:  -  ( scrollAmount - $('.preambule').outerHeight() ) * 1 , ease: Linear.easeNone });
				TweenLite.to($('.preambule'), 0, { y:  -  ( scrollAmount - $('.preambule').outerHeight() ) * 1 , ease: Linear.easeNone });
			} else {

				TweenLite.to($('.hello'), 0, { y: 0 , ease: Linear.easeNone });
				TweenLite.to($('.preambule'), 0, { y: 0 , ease: Linear.easeNone });
			}

			// PRLLX VIDEOCONTAINER
			var minVideo = $(".video-container").offset().top;
			var maxVideo = $(".video-container").offset().top + $(".video-container").outerHeight();
			var normVideo = clamp(normalize(window.pageYOffset, minVideo, maxVideo), 0, 1);
			prllxVideoContainer.progress(normVideo);

			// PRLLX ZAKAZ
			/*
			var minZakaz = $(".zakaz").offset().top;
			var maxZakaz = $(".zakaz").offset().top+ $(".zakaz").outerHeight();
			var normZakaz = clamp(normalize(window.pageYOffset, minZakaz, maxZakaz), 0, 1);
			prllxZakaz.progress(normZakaz);
			*/
			//PRLLX SKILLS
			var minSkills = $(".vision .skills-container").offset().top - wH;
			var maxSkills= $(".vision .skills-container").offset().top + $(".vision .skills-container").outerHeight();
			var normSkills = clamp(normalize(window.pageYOffset, minSkills, maxSkills), 0, 1);
			prllxVisionSills.progress(normSkills);
			
		}

	};


	initAbout = function(){
		initForms();

		//ANIMATION WOLDAK
		tlWoldak= new TimelineLite({ paused: true});
		tlWoldak.to(".woldak .padding__border", 7, {height: "100%", ease:Power3.easeInOut}, 0);
		tlWoldak.to(".woldak .woldak__img-inner", 0.8, {y: "0%", ease:Power3.easeInOut}, 0.4);


		$('.animated').viewportChecker({
			repeat: false,
			offset:-100,
			callbackFunction: function(elem, action){
				if (elem.is('.woldak')) {
					elem.addClass('animating');
					tlWoldak.play().timeScale(1);
				} 				
			}
		});

		TweenLite.ticker.addEventListener("tick", onScroll);
		function onScroll() {

			if(!$('body').hasClass('page-about')) return;

			scrollAmount = $(window).scrollTop();
			offsetWoldak = $('.woldak').offset().top;

		}

	};


	initServices = function() {
		initForms();

		//ANIMATIONS VISION

		tlServices = new TimelineLite({ paused: true});
		tlServices.to(".services .service__overflow", 1.5, {x: "0", y: "0", ease:Power3.easeInOut}, 0, "-=1");

		tlVision = new TimelineLite({ paused: true});
		
		tlVision.from(".services p.intro2", 0.8, {y:60, opacity:0, ease:Power3.easeOut}, "-=1")
		tlVision.from(".vision .block-content a", 0.8, {y:60, opacity:0, ease:Power3.easeOut}, "-=0.8")
		tlVision.to(".vision .padding__border", 7, {height: "100%", ease:Power3.easeInOut}, 0, "-=1");


		$('.animated').viewportChecker({
			repeat:false,
			offset:-100,
			callbackFunction: function(elem, action){

				if (elem.is('.vision')) {
					if( elem.hasClass('visible') && action == "add" && !elem.hasClass('animating') ) {
						elem.addClass('animating');
						tlVision.play().timeScale(1);
					}
				}
				if (elem.is('.services')) {
					elem.addClass('animating');
					tlServices.play().timeScale(1);
				} 

			}
		});		

	};


	var tlProjects;
	initProjects = function(){
		initForms();

		console.log('Projects Page initialised');

		$('.list-projects .project-item').on('mouseenter touchstart', function(){
			var descHeight = $(this).find('.project-intro').outerHeight();
			TweenLite.set($(this).find('.inner'), {y : -descHeight });
		})

		$('.list-projects .project-item').on('mouseleave', function(){
			TweenLite.set($(this).find('.inner'), {y : 0 });
		})


		$('.animated').viewportChecker({
			repeat:false,
			offset:"-15%",
		});

		//ANIMATIONS INTRO
		tlProjects= new TimelineLite({ paused: true});
		/*
		var projetcsIntroTxt = new SplitText("section.intro p.intro", {type:"lines"});
		var projetcsIntroLines = projetcsIntroTxt.lines;
		for(var i = 0; i<projetcsIntroLines.length; i++){
			projetcsIntroLines[i].innerHTML = '<span>'+projetcsIntroLines[i].innerHTML+'</span>';
		}
		*/
		tlProjects.from("section.intro h1 svg > *", 0.8, {drawSVG:"0%", ease:Power3.easeOut}, 0.5);
		tlProjects.staggerFrom($('section.intro h1 .msk').find('span'), 0.8, {y:"100%", ease: Power3.easeInOut},  0.08, "-=1");

		tlProjects.play().timeScale(1);

	};

	
	build = function(){

		TweenLite.set(window, {scrollTo: {y: 0, autoKill:false}, delay:0.1});

		var targetURL = $('main.page').data( 'href' );

		// Убрал
		// history.pushState({page:targetURL}, null, targetURL);

		$browser = checkNavigateur();

		FastClick.attach(document.body);

		$(window).on('resize',function(){
			wW = $(window).width();
			wH = $(window).height();
			footerHeight = footer.outerHeight();
			$('.page-container').css({marginBottom:footerHeight});
			calculBorderSize();
		});
		$(window).trigger('resize');

		initHeaderFooter();

		currentPage = $('main');
		var targetPageClass = currentPage.data('class');
		currentProjectColor = currentPage.data('color');
		if (currentProjectColor) {
			console.log('projetColor', currentProjectColor);
			TweenLite.set($('.loader .color'), {"background-color":currentProjectColor});
		}
		$('body').addClass(targetPageClass).delay(800).queue(function(){

			TweenLite.set(window, {scrollTo: {y: 0, autoKill:false}, delay:0.3});
			$(window).trigger('resize');
			initPage(targetPageClass);

			$(this).removeClass('loading').delay(800).queue(function(){
				$(this).addClass('loaded');
				$(this).dequeue();
			}).dequeue();

		});

		currentPageClass = targetPageClass;

		$(window).on('popstate', function(event) {
			var state = event.originalEvent.state;
			if (state) {
				loadPage(location.href);
				TweenLite.to(window, 0.3, {scrollTo: {y: 0}, ease: Power3.easeInOut});
			}
		});



	}
	build();

	function loadPage(url) {

		$('body').removeClass('loaded loadProject showProject hideNav').addClass('loading').delay(transitionPageDelay).queue(function(){

			$.ajax({ type: "GET",
				url: url,
				success : function(data)
				{

					var pageData  = $(data).find('main.page');
					var new_title = pageData.data( 'wp-title' );
					var targetPageClass = pageData.data('class');
					document.title = "Woldak. "+new_title;

				    /*var new_url   = pageData.data( 'href' );
				    history.pushState( { page: targetPageClass }, null, new_url );*/
					//

				    //deleteLastPage;
				    $('.page-container > * ').remove();

				    var prev = brandPage.find('span');
				    if (prev){
				    	TweenLite.to(prev, 0.6, { y: -10, opacity:0, ease: Power3.easeInOut, onComplete:function(){ prev.remove(); }});
				    }

				    //Add NewPage
				    $('.page-container').prepend(pageData);
				    currentPage = $('main');

				    console.log(targetPageClass);

				    if (currentProjectColor && targetPageClass != "page-projects") {
				    	TweenLite.set($('.loader .color'), {"background-color":""});
				    }

				    currentProjectColor = currentPage.data('color');
				    if (currentProjectColor) {
				    	TweenLite.set($('.loader .color'), {"background-color":currentProjectColor});
				    }

				    TweenLite.set(window, {scrollTo: {y: 0}, delay:0.1});

					//PageTransition
					$('body').removeClass(currentPageClass)
					.addClass(targetPageClass)
					.delay(800).queue(function(){
						$(this).removeClass('loading').delay(800).queue(function(){
							$(this).addClass('loaded');

							if (targetPageClass == "page-projects") {
								TweenLite.set($('.loader .color'), {"background-color":""});
							}

							$(this).dequeue();
						});

						initPage(targetPageClass);
						$(this).dequeue();
					});

					currentPageClass = targetPageClass;

				}
			});

			$(this).dequeue();

		});

	}


	function initPage(pageClass){

		$('.page-container').css({marginBottom:footerHeight});

		if (currentPage.data('page')) {
			var newPageTitle = "<span>"+currentPage.data('page')+"</span>";
			brandPage.append(newPageTitle);
			var current = brandPage.find('span');
			TweenLite.set(current, { y: 10, opacity:0, ease: Power3.easeInOut });
			TweenLite.to(current, 0.6, { y: 0, opacity:1, ease: Power3.easeInOut });
		}

		$('.menu-nav .active').removeClass('active');
		$('.menu-nav li a.'+pageClass+'-link').addClass('active');

		//setupLinksAjax;
		

		if($('body').hasClass('first')) {
			$('body').delay(250).queue(function(){
				$(this).removeClass('first').dequeue();
			});
		}


		//initCurrentPage;
		switch(pageClass) {
			case 'page-home':
			initHome();
			break;
			case 'page-about':
			initAbout();
			break;
			case 'page-services':
			initServices();
			break;
			case 'page-projects':
			initProjects();
			break;
			default:
			return;
		}
	}

	function normalize(value, min, max) {
		return (value - min) / (max - min);
	}
	function clamp(value, min, max) {
		return value < min ? min : (value > max ? max : value);
	}
	function calculBorderSize() {

		switch (true) {
			case (wW >= 1600) :
			borderWidth =  60;
			break;
			case (992 >= 4 && wW < 1600) :
			borderWidth = 40;
			break;
			borderWidth = 20;
		}

	};
	function checkNavigateur() {

		var nVer = navigator.appVersion;
		var nAgt = navigator.userAgent;
		var browserName  = navigator.appName;
		var fullVersion  = ''+parseFloat(navigator.appVersion);
		var majorVersion = parseInt(navigator.appVersion,10);
		var nameOffset,verOffset,ix;

		// In Opera, the true version is after "Opera" or after "Version"
		if ((verOffset=nAgt.indexOf("Opera"))!=-1) {
			browserName = "Opera";
			fullVersion = nAgt.substring(verOffset+6);
			if ((verOffset=nAgt.indexOf("Version"))!=-1)
				fullVersion = nAgt.substring(verOffset+8);
		}
		// In MSIE, the true version is after "MSIE" in userAgent
		else if ((verOffset=nAgt.indexOf("MSIE"))!=-1) {
			browserName = "Microsoft Internet Explorer";
			fullVersion = nAgt.substring(verOffset+5);
		}
		// In Chrome, the true version is after "Chrome"
		else if ((verOffset=nAgt.indexOf("Chrome"))!=-1) {
			browserName = "Chrome";
			fullVersion = nAgt.substring(verOffset+7);
		}
		// In Safari, the true version is after "Safari" or after "Version"
		else if ((verOffset=nAgt.indexOf("Safari"))!=-1) {
			browserName = "Safari";
			fullVersion = nAgt.substring(verOffset+7);
			if ((verOffset=nAgt.indexOf("Version"))!=-1)
				fullVersion = nAgt.substring(verOffset+8);
		}
		// In Firefox, the true version is after "Firefox"
		else if ((verOffset=nAgt.indexOf("Firefox"))!=-1) {
			browserName = "Firefox";
			fullVersion = nAgt.substring(verOffset+8);
		}
		// In most other browsers, "name/version" is at the end of userAgent
		else if ( (nameOffset=nAgt.lastIndexOf(' ')+1) <
			(verOffset=nAgt.lastIndexOf('/')) )
		{
			browserName = nAgt.substring(nameOffset,verOffset);
			fullVersion = nAgt.substring(verOffset+1);
			if (browserName.toLowerCase()==browserName.toUpperCase()) {
				browserName = navigator.appName;
			}
		}
		// trim the fullVersion string at semicolon/space if present
		if ((ix=fullVersion.indexOf(";"))!=-1)
		fullVersion=fullVersion.substring(0,ix);
		if ((ix=fullVersion.indexOf(" "))!=-1)
			fullVersion=fullVersion.substring(0,ix);

		majorVersion = parseInt(''+fullVersion,10);

		if (isNaN(majorVersion)) {
			fullVersion  = ''+parseFloat(navigator.appVersion);
			majorVersion = parseInt(navigator.appVersion,10);
		}

		return {name : browserName, version : majorVersion};

	}

});