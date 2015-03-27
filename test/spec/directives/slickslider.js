'use strict';

describe('Directive: slickSlider', function () {

  // load the directive's module
  beforeEach(module('gosteiclubApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<slick-slider></slick-slider>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the slickSlider directive');
  }));
});
