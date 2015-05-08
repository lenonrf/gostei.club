'use strict';


angular.module('gosteiclubApp')
  .controller('HeaderCtrl', function ($scope, $rootScope) {

    $rootScope.showMenuItems = true;
    $rootScope.showMenuUser = false;
    $rootScope.showMenuCheckout = false;

    $scope.click = function(){

      $('#loginForm').css('display', 'none');
      $('#formFields').css('display', 'block');
      $('#lname').focus();

    };

  });
