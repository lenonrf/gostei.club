$(document).ready(function($) {
    "use strict";

    // Anchor Smooth Scroll
    $('body').on('click', '.page-scroll', function(event) {
        var $anchor = $(this);
        $('html, body').stop().animate({
            scrollTop: $($anchor.attr('href')).offset().top
        }, 1500, 'easeInOutExpo');
        event.preventDefault();
    });
});

// Custom Popup
$(".term-popup").on("click", function() {
    $(".terms").addClass("terms-active");
    $(".overlay-dark").addClass("active");
});

$(".t-close").on("click", function() {
    $(".terms").removeClass("terms-active");
    $(".overlay-dark").removeClass("active");
});

// Fixed Header
$(window).scroll(function() {
    var value = $(this).scrollTop();
    if (value > 150)
        $("header").css("background", "#000000").css("padding", "0px 0px 13px");
    else
        $("header").css("background", "transparent").css("padding", "20px 0px 20px");
});