'use strict';

/**
 * @ngdoc directive
 * @name gosteiclubApp.directive:slickSlider
 * @description
 * # slickSlider
 */
angular.module('gosteiclubApp')
  .directive('slickSlider', function () {
    return {
      restrict: 'A',
      link: function(scope, element, attrs) {
      	$(element).slick(scope.$eval(attrs.slickSlider));
      }
    };
  });
