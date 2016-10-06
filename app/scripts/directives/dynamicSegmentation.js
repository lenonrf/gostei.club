'use strict';


angular.module('gosteiclubApp')
  .directive('dynamicSegmentation', function ($rootScope, $http) {
    
    return {

    			scope: true,
                restrict: 'AE',
                replace: false,
                templateUrl: 'scripts/directives/dynamicSegmentation.html',

                link: function($scope, elem, attrs) {


				    $scope.verifyOffersAvailable = function(){
				      				      	
				      	$scope.showSurveySegmented();
				      	$rootScope.questionHall = $scope.getQuestionHallSegmented();
										      
				    };




				    $scope.showSurveySegmented = function (){

				   	 	for (var x = 0; $scope.survey.length>x; x++) { 					   	 				 
					      	$('#offer_'+$scope.survey[x]._id).css("display", 'none');

					 	}

				   	 	var surveyList = $scope.getOffersAvailable($scope.survey);

				   	 	for (var x = 0; x<surveyList.length; x++) { 	
					      	
					      	$('#offer_'+surveyList[x]._id).css("display", 'block');
					      	$http.post('/api/yhall/offer/'+surveyList[x]._id+'/stats/impressions');

				   	 	}

				   	 	$scope.isNextStepAvaliableForSurvey();
				    	
				    };



				    $scope.getQuestionHallSegmented = function(){				    	

				    	return $scope.getOffersAvailable($scope.offers.questionHall);
				    };


				    $scope.getOffersAvailable = function(offerList){

				    	var status = true;
				      	var radioChoise = '';
				      	var avaliableOffers = [];

				      	for (var x = 0; offerList.length>x; x++) { 

					      	for (var y = 0; offerList[x].segmentation.dynamicSegmentation.length>y; y++) { 
			     
					      		radioChoise = $scope.getRadioChoiseValue(
					      			offerList[x].segmentation.dynamicSegmentation[y]._id);
						      		     		
					      		if(radioChoise != 'show_offer'){
					      			status = false;
					      		}
					      	}
					      	
					    	if(status){
					      		avaliableOffers.push(offerList[x]);					      	
					      	}	
				   	 	}

				   	 	return avaliableOffers;
				    };

				    $scope.getRadioChoiseValue = function (id){
				    	return $("input:radio[name ='answer_"+id+"']:checked").val();
				    };



                }
            };


  });
