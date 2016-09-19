'use strict';


angular.module('gosteiclubApp')
  .directive('survey', function ($rootScope, $window, lodash) {
    
    return {

    			scope: true,
                restrict: 'AE',
                replace: false,
                templateUrl: 'scripts/directives/survey.html',

                link: function($scope, elem, attrs) {

                    for (var x = 0; $scope.dynamicSegmentation.length>x; x++) { 
                        for (var y = 0; $scope.dynamicSegmentation[x].relatedOffers.length>y; y++) {                             
                            $('#offer_'+$scope.dynamicSegmentation[x].relatedOffers[y]).css("display", "none");
                        }
                    }

                    $scope.verifyAnswers = function(itemAnswer, survey){

                        var answerList = survey.mainQuestion.answerList;

                        for (var i = 0; answerList.length > i; i++) {
                            $('#answer_'+answerList[i]._id).css('display', 'none');
                        }

                        
                        switch(itemAnswer.action.type){

                            case 'do_nothing':

                                lodash.remove($scope.deliveryWS.survey, function(currentObject) { 
                                    return currentObject._id === survey._id;
                                });

                            break;

                            case 'delivery':
                                $scope.defineDeliveryStrategy(itemAnswer, survey);
                            break;    

                            case 'confirm_user_fields':
                            case 'open_new_input_field':

                                $('#answer_'+itemAnswer._id).css('display', 'block');
                                $scope.defineDeliveryStrategy(itemAnswer, survey);

                            break;
                        }

                        $scope.isNextStepAvaliableForSurvey(survey);

                    };



                    $scope.defineDeliveryStrategy = function(itemAnswer, survey){
                    
                        if(survey.delivery.survey.type === 'tb'){
                            $window.open(survey.delivery.survey.targetBlankUrl);
                                
                        }else if(survey.delivery.survey.type === 'ws'){

                            $scope.deliveryWS.survey.push(survey);

                            $scope.deliveryWS.survey = 
                                lodash.uniq($scope.deliveryWS.survey, function(item, key, _id) { 
                                    return item._id;
                                });

                        }
                    };

                }
            };
  });
