;(function () {
	'use strict';
	var isMobile = {
		Android: function() {
			return navigator.userAgent.match(/Android/i);
		},
			BlackBerry: function() {
			return navigator.userAgent.match(/BlackBerry/i);
		},
			iOS: function() {
			return navigator.userAgent.match(/iPhone|iPad|iPod/i);
		},
			Opera: function() {
			return navigator.userAgent.match(/Opera Mini/i);
		},
			Windows: function() {
			return navigator.userAgent.match(/IEMobile/i);
		},
			any: function() {
			return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
		}
	};

	var fullHeight = function() {

		if ( !isMobile.any() ) {
			$('.js-fullheight').css('height', $(window).height());
			$(window).resize(function(){
				$('.js-fullheight').css('height', $(window).height());
			});
		}

	};

	// Animations
	var contentWayPoint = function() {
		var i = 0;
		$('.animate-box').waypoint( function( direction ) {

			if( direction === 'down' && !$(this.element).hasClass('animated') ) {

				i++;

				$(this.element).addClass('item-animate');
				setTimeout(function(){

					$('body .animate-box.item-animate').each(function(k){
						var el = $(this);
						setTimeout( function () {
							var effect = el.data('animate-effect');
							if ( effect === 'fadeIn') {
								el.addClass('fadeIn animated');
							} else if ( effect === 'fadeInLeft') {
								el.addClass('fadeInLeft animated');
							} else if ( effect === 'fadeInRight') {
								el.addClass('fadeInRight animated');
							} else {
								el.addClass('fadeInUp animated');
							}

							el.removeClass('item-animate');
						},  k * 200, 'easeInOutExpo' );
					});

				}, 100);

			}

		} , { offset: '85%' } );
	};

	var burgerMenu = function() {

		$('.js-fh5co-nav-toggle').on('click', function(event){
			event.preventDefault();
			var $this = $(this);

			if ($('body').hasClass('offcanvas')) {
				$this.removeClass('active');
				$('body').removeClass('offcanvas');
			} else {
				$this.addClass('active');
				$('body').addClass('offcanvas');
			}
		});



	};

	// Click outside of offcanvass
	var mobileMenuOutsideClick = function() {

		$(document).click(function (e) {
	    var container = $("#fh5co-aside, .js-fh5co-nav-toggle");
	    if (!container.is(e.target) && container.has(e.target).length === 0) {

	    	if ( $('body').hasClass('offcanvas') ) {

    			$('body').removeClass('offcanvas');
    			$('.js-fh5co-nav-toggle').removeClass('active');

	    	}

	    }
		});

		$(window).scroll(function(){
			if ( $('body').hasClass('offcanvas') ) {

    			$('body').removeClass('offcanvas');
    			$('.js-fh5co-nav-toggle').removeClass('active');

	    	}
		});

	};

	var sliderMain = function() {

	  	$('#fh5co-hero .flexslider').flexslider({
			animation: "fade",
			slideshowSpeed: 5000,
			directionNav: true,
			start: function(){
				setTimeout(function(){
					$('.slider-text').removeClass('animated fadeInUp');
					$('.flex-active-slide').find('.slider-text').addClass('animated fadeInUp');
				}, 500);
			},
			before: function(){
				setTimeout(function(){
					$('.slider-text').removeClass('animated fadeInUp');
					$('.flex-active-slide').find('.slider-text').addClass('animated fadeInUp');
				}, 500);
			}

	  	});

	};

	var handleForm = function() {
		$("#contact-form").on("submit", function() {
			$(".form-loading").show();
			jQuery.post("/theme/send-form.php", {
				name: $("#name").val(),
				lastname: $("#lastname").val(),
				email: $("#email").val(),
				phone: $("#phone").val(),
				message: $("#message").val()
			}).done(function(data) {
				data = $.parseJSON(data);
				var firstErrorElement = false;
				$.each(data.fields, function(index, value) {
					var el = $("#" + index);
					if (value != 'ok') {
						if (el) {
							if (firstErrorElement == false) {
								firstErrorElement = true;
								el.focus();
								$(".form-error").slideDown(400).delay(3000).slideUp(400);
							}
							el.addClass('error');
						}
					} else {
						el.removeClass('error');
					}
				});
				if (data.sent == 'ok') {
					$(".form-success").slideDown(400).delay(3000).slideUp(400);
					$("#name").val('');
					$("#lastname").val('');
					$("#email").val('');
					$("#phone").val('');
					$("#message").val('');
				} else {
					$(".form-error").slideDown(400).delay(3000).slideUp(400);
				}
				$(".form-loading").hide();
			}).fail(function(xhr, textStatus, errorThrown) {
		        $(".form-error").slideDown(400).delay(3000).slideUp(400);
		        $(".form-loading").hide();
		    });

			return false;
		});
	};

	// Document on load.
	$(function(){
		fullHeight();
		contentWayPoint();
		burgerMenu();
		mobileMenuOutsideClick();
		sliderMain();
		handleForm();
	});

	//しゅるしゅる動くjs
	$('a[href^=#]').click(function(){
		var speed = 500;
		var href= $(this).attr("href");
		var target = $(href == "#" || href == "" ? 'html' : href);
		var position = target.offset().top;
		$("html, body").animate({scrollTop:position}, speed, "swing");
		return false;
	});

	//ナビゲーションクリックでハイライト移動
	document.addEventListener("DOMContentLoaded", function () {
		const navLinks = document.querySelectorAll(".fh5co-main-menu ul li a");

		function changeActiveLink(event) {
			//event.preventDefault();
			navLinks.forEach((link) => link.parentElement.classList.remove("fh5co-active"));
			event.target.parentElement.classList.add("fh5co-active");
		}

		navLinks.forEach((link) => link.addEventListener("click", changeActiveLink));
	});
	
	//スクロール位置に応じてナビゲーションハイライト移動
	window.addEventListener('scroll', function () {
		const position = Math.floor(window.innerHeight * 0.75);

		const navLinks = Array.from(document.querySelectorAll(".fh5co-main-menu a[href^='#']")).map(link => {
			const sectionId = link.getAttribute("href");
			const section = document.querySelector(sectionId);
			return { link, section };
		});

		function updateNavActiveClass() {
			navLinks.forEach(({ link, section }) => {
				let sectionTop = section.getBoundingClientRect().top;

				if (sectionTop < position && sectionTop + section.offsetHeight > position) {
					link.parentElement.classList.add('fh5co-active');
				} else {
					link.parentElement.classList.remove('fh5co-active');
				}
			});
		}

		updateNavActiveClass();
	});

}());
