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
    if (value > 350)
        $("header").css("background", "#000000").css("padding", "0px 0px 13px");
    else
        $("header").css("background", "transparent").css("padding", "20px 0px 20px");
});



/*
// Google Map
$(function() {
    var map = new GMaps({
        el: "#map",
        lat: 40.712784,
        lng: -74.005941,
        zoom: 11,
        zoomControl: false,
        scrollwheel: false,
        controls: false,
        zoomControlOpt: {
            style: "BIG",
            position: "TOP_LEFT"
        },
        panControl: true,
        streetViewControl: false,
        mapTypeControl: false,
        overviewMapControl: false,
        styles: [{"featureType": "road","elementType": "labels","stylers": [{"visibility": "simplified"}, {"lightness": 20}]}, {"featureType": "administrative.land_parcel","elementType": "all","stylers": [{"visibility": "off"}]}, {"featureType": "landscape.man_made","elementType": "all","stylers": [{"visibility": "off"}]}, {"featureType": "transit","elementType": "all","stylers": [{"visibility": "off"}]}, {"featureType": "road.local","elementType": "labels","stylers": [{"visibility": "simplified"}]}, {"featureType": "road.local","elementType": "geometry","stylers": [{"visibility": "simplified"}]}, {"featureType": "road.highway","elementType": "labels","stylers": [{"visibility": "simplified"}]}, {"featureType": "poi","elementType": "labels","stylers": [{"visibility": "off"}]}, {"featureType": "road.arterial","elementType": "labels","stylers": [{"visibility": "off"}]}, {"featureType": "water","elementType": "all","stylers": [{"hue": "#a1cdfc"}, {"saturation": 30}, {"lightness": 49}]}, {"featureType": "road.highway","elementType": "geometry","stylers": [{"hue": "#f49935"}]}, {"featureType": "road.arterial","elementType": "geometry","stylers": [{"hue": "#fad959"}]}]
    });

    map.addMarker({
        lat: 40.712784,
        lng: -74.005941,
        icon: "images/mapicon.png"
    });
});*/