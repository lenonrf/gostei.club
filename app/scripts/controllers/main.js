'use strict';

/**
 * @ngdoc function
 * @name gosteiclubApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the gosteiclubApp
 */
angular.module('gosteiclubApp')
  .controller('MainCtrl', function ($scope, Utils, User) {

  	$scope.user = {};
    $scope.user.terms = true;

    


  	$scope.checkout = function (user) {
      	
        if($scope.validateFields(user)){
          
          $scope.bgMsgColor = '#3498db';        
          angular.element('#lname').focus();
          angular.element('#messageStatus').html('100%');


          //console.log('User', User.getResource.get());
    
        }
    };




  	$scope.validateFields = function(user){

      var status = true;

      $scope.bgUserColor = '#FFFFFF';
      $scope.bgEmailColor = '#FFFFFF';
      $scope.bgGenderColor = '#FFFFFF';


  		if(!Utils.isEmpty(user)){
  			

        if(Utils.isEmpty(user.name)){

          $scope.bgMsgColor = '#CD0000';
          $scope.bgUserColor = '#FFFACD';
          
          angular.element('#lname').focus();
          angular.element('#messageStatus').html('Preencha o usu&aacuterio');

          return false;

        }


        if(Utils.isEmpty(user.email)){

          $scope.bgMsgColor = '#CD0000';
          $scope.bgEmailColor = '#FFFACD';

          angular.element('#email').focus();
          angular.element('#messageStatus').html('Preencha o email');

          return false;

        }


        if(Utils.isEmpty(user.gender)){

          $scope.bgMsgColor = '#CD0000';
          $scope.bgGenderColor = '#FFFACD';

          angular.element('#gender').focus();
          angular.element('#messageStatus').html('Preencha o sexo');

          return false;

        }

  		}else{
        
        $scope.bgMsgColor = '#CD0000';
        $scope.bgGenderColor = '#FFFACD';
        $scope.bgEmailColor = '#FFFACD';
        $scope.bgUserColor = '#FFFACD';

        angular.element('#lname').focus();
        angular.element('#messageStatus').html('Preencha o formul&aacute;rio');

        status = false;
  		}

      return status;
  	};


});
