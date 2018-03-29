import $ from 'jquery';
import './header.scss';

$(function () {
	$('[data-toggle="tooltip"]').tooltip();
	$().alert()
// Closes the Responsive Menu on Menu Item Click
	$('.navbar-collapse ul li a').click(function () {
		$('.navbar-toggle:visible').click();
	});

// Highlight the top nav as scrolling occurs
	$('body').scrollspy({
		target: '.navbar-fixed-top'
	});

	// data-scroll-link
	$('a.page-scroll').bind('click', function (event) {
		const $anchor = $(this);

		event.preventDefault();

		$('html, body').stop().animate({
			scrollTop: $($anchor.attr('href')).offset().top
		}, 1500, 'easeInOutExpo');

	});


	//const document

});
