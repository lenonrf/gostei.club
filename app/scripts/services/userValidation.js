'use strict';

/**
 * @ngdoc service
 * @name gosteiclubApp.ValidationUser
 * @description
 * # ValidationUser
 * Service in the gosteiclubApp.
 */
angular.module('gosteiclubApp')
  .service('UserValidation', function (Utils) {
    
  	
  	this.validateFields = function(user){

        var status = true;

        console.log('user', user);

    	$scope.bgUserColor = '#FFFFFF';
        $scope.bgEmailColor = '#FFFFFF';
        $scope.bgGenderColor = '#FFFFFF';


  		if(!Utils.isEmpty(user)){
  			

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



	this.setMassageStatus = function(message){
		angular.element('#messageStatus').html(message);
	}
});
