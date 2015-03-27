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

  	$scope.classMessage = 'sub-form-h5';

	$scope.checkout = function (user) {
    	$scope.validateFields(user);
  	};

  	$scope.validateFields = function(user){

  		if(isEmpty(user)){
			console.log('isEmpty(user)', isEmpty(user));

			$scope.classMessage = 'sub-form-h5-error';
			console.log('messageStatus', angular.element('#messageStatus'));


  		}else{
  			console.log('isEmpty(user)', isEmpty(user));
  		}
  	};



  	function isEmpty(object){
    	if(object !== null && object !== undefined && object !== ''){
        	return false;
        }else{
        	return true;
        }
    }

});
