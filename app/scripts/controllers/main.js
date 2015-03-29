'use strict';

/**
 * @ngdoc function
 * @name gosteiclubApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the gosteiclubApp
 */
angular.module('gosteiclubApp')
  .controller('MainCtrl', function ($scope) {

  	$scope.user = {};
    $scope.user.terms = true;



  	$scope.checkout = function (user) {
      	
        if($scope.validateFields(user)){
          

          $scope.bgMsgColor = '#3498db';        
          angular.element('#lname').focus();
          angular.element('#messageStatus').html('100%');

          alert('Vai pra tela de perguntas');
        }
    };

  	$scope.validateFields = function(user){

      var status = true;


      console.log('user', user);

      $scope.bgUserColor = '#FFFFFF';
      $scope.bgEmailColor = '#FFFFFF';
      $scope.bgGenderColor = '#FFFFFF';


  		if(!isEmpty(user)){
  			

        if(isEmpty(user.name)){

          $scope.bgMsgColor = '#CD0000';
          $scope.bgUserColor = '#FFFACD';
          
          angular.element('#lname').focus();
          angular.element('#messageStatus').html('Preencha o usu&aacuterio');

          return false;

        }


        if(isEmpty(user.email)){

          $scope.bgMsgColor = '#CD0000';
          $scope.bgEmailColor = '#FFFACD';

          angular.element('#email').focus();
          angular.element('#messageStatus').html('Preencha o email');

          return false;

        }


        if(isEmpty(user.gender)){

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

  			console.log('isEmpty(user)', isEmpty(user));
  		}

      return status;
  	};



  	function isEmpty(object){
    	if(object !== null && object !== undefined && object !== ''){
        	return false;
        }else{
        	return true;
        }
    }
});
