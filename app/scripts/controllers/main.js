'use strict';

/**
 * @ngdoc function
 * @name gosteiclubApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the gosteiclubApp
 */
angular.module('gosteiclubApp')
  .controller('MainCtrl', function ($scope, $location, Utils, User, $http) {

  	$scope.user = {};
    $scope.user.terms = true;
    $scope.disableButton = false;

    //console.log('User', User.resource.get());


  	$scope.checkout = function (user) {

        //if($scope.validateFields(user)){
          $scope.disableButton = true;

          $scope.user = new User();
          console.log('$scope.user', $scope.user);


          var dataBody = {
            'name' : user.name,
            'email' : user.email,
            'gender' : user.gender
          };


          $scope.user.data = dataBody;

          User.save($scope.user, onSuccess, onError);

          $http.post('/api/users', dataBody).
            success(function(data, status, headers, config) {
              console.log('onSuccess', data);
              console.log('status', status);
              console.log('headers', headers);
              console.log('config', config);
            }).
            error(function(data, status, headers, config) {
              console.log('erro', data);
              console.log('status', status);
              console.log('headers', headers);
              console.log('config', config);
            });



        //}
    };



    function onSuccess(data, status, headers, config){

      console.log('onSuccess', data);
      console.log('status', status);
      console.log('headers', headers);
      console.log('config', config);

      /*$scope.bgMsgColor = '#3498db';
      angular.element('#lname').focus();
      angular.element('#messageStatus').html('100%');

      $location.path('/perguntas');*/
    }


    function onError(data, status, headers, config){

      console.log('onError`', data);
      console.log('status', status);
      console.log('headers', headers);
      console.log('config', config);

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
