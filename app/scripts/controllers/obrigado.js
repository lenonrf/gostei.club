'use strict';


angular.module('gosteiclubApp')
  .controller('ObrigadoCtrl', function ($scope, $location, $http, $rootScope, Menu) {

    Menu.setMenu('HomeCtrl');
    $rootScope.showFooter = false;

    $scope.isConectai = false;


    if($location.search().utm_source){
      if ($location.search().utm_source.toLowerCase() === 'conectai'){
        $scope.isConectai = true;

        $http.post('/api/conectai').success(function(dataResult){
          console.log('SUCCESS', dataResult);
        }).error(function(){
          console.log('ERROR');
        });

      }
    }

  });
