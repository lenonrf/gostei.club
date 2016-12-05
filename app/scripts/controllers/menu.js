'use strict';


angular.module('gosteiclubApp')
  .controller('MenuCtrl', function ($scope, $rootScope, Menu) {

    $rootScope.showMenuItems = true;
    $rootScope.menu = {};
    $rootScope.isStepButtonDisabled = false;
    $rootScope.isShowPushNotification = false;


    $scope.nextStep = function(){

      for(var x=0; x<$rootScope.steps.length; x++){

        if($rootScope.sessionLandingData.isAmostras){

          if($rootScope.steps[x] === 'active'){
            $rootScope.steps[x] = 'complete';
            $rootScope.isStepButtonDisabled = true;
            $rootScope.steps[x+1] = 'active';
            break;
          }

        }else{

          if($rootScope.steps[x] === 'active'){

            if(x === 1){
              onSuccess($scope.user);
              break;
            }

            $rootScope.steps[x] = 'complete';
            $rootScope.isStepButtonDisabled = true;
            $rootScope.steps[x+1] = 'active';
            break;
          }
        }
      }
    };

  });
