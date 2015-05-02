'use strict';


angular.module('gosteiclubApp')
  .controller('HeaderCtrl', function ($scope, $rootScope) {

    $rootScope.showMenuUser = false;
    $rootScope.showMenuCheckout = true;

    $scope.click = function(){

      $('#loginForm').css('display', 'none');
      $('#formFields').css('display', 'block');
      $('#lname').focus();

    };

  });
