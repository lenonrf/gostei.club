'use strict';


angular.module('gosteiclubApp')
  .controller('HeaderCtrl', function ($scope, $rootScope, Menu) {

    Menu.setMenu('MainCtrl');

    $scope.click = function(){

      $('#loginForm').css('display', 'none');
      $('#formFields').css('display', 'block');
      $('#lname').focus();

    };

  });
