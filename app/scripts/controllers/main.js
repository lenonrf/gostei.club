'use strict';

/**
 * @ngdoc function
 * @name gosteiclubApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the gosteiclubApp
 */
angular.module('gosteiclubApp')
  .controller('MainCtrl', function ($scope, $location, Utils, User) {

  	$scope.user = {};
    $scope.user.terms = true;
    $scope.disableButton = false;

    //console.log('User', User.resource.get());


  	$scope.checkout = function (user) {
      	
        //if($scope.validateFields(user)){
          $scope.disableButton = true;
          

          var dataBody = {
            'name' : user.name,
            'email' : user.email,
            'gender' : user.gender
          };


          console.log('dataBody', dataBody);

          var users = User.resource.save(dataBody, {}, onSuccess, onError);
          
          console.log('retorno', users);
         
    
        //}
    };



    function onSuccess(){
      
      $scope.bgMsgColor = '#3498db';        
      angular.element('#lname').focus();
      angular.element('#messageStatus').html('100%');

      $location.path('/perguntas');
    }


    function onError(data){
      
      console.log('error', data);

    }



  	function validateFields(user){

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
  	}


});
