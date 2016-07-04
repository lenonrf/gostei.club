'use strict';


angular.module('gosteiclubApp')
  .controller('ObrigadoCtrl', function ($scope, $location, $rootScope, Menu) {

    Menu.setMenu('HomeCtrl');
    $rootScope.showFooter = false;

    $scope.isConectai = false;


    if($location.search().utm_source){
      if ($location.search().utm_source.toLowerCase() === 'conectai'){
        $scope.isConectai = true;
      }
    }

  });
