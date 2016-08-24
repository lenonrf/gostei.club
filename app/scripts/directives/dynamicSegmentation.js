'use strict';


angular.module('gosteiclubApp')
  .directive('dynamicSegmentation', function ($rootScope) {
    
    return {

    			scope: true,
                restrict: 'AE',
                replace: false,
                templateUrl: 'scripts/directives/dynamicSegmentation.html',

                link: function($scope, elem, attrs) {


				    $scope.showOffers = function(){
				      
				      var status = true;
				      var radioChoise = '';

				      $rootScope.avaliableOffers = [];

				      for (var x = 0; $scope.survey.length>x; x++) { 
				      	for (var y = 0; $scope.survey[x].segmentation.dynamicSegmentation.length>y; y++) { 

				      		radioChoise = 
					      		$("input:radio[name ='answer_"
					      			+$scope.survey[x].segmentation.dynamicSegmentation[y]._id
					      			+"']:checked").val();
				      		
				      		if(radioChoise != 'show_offer'){
				      			status = false;
				      		}
				      	}

				      	if(status){
				      		
				      		$rootScope.avaliableOffers.push($scope.survey[x]._id);
				      		$('#offer_'+$scope.survey[x]._id).css("display", 'block');
				      	
				      	}else{
							
							$('#offer_'+$scope.survey[x]._id).css("display", 'none');
				      	}
				      	
				      }


				      $scope.isNextStepAvaliableForSurvey();
				      
				    };

                },
            };


  });
