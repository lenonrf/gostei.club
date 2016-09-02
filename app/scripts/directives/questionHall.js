'use strict';


angular.module('gosteiclubApp')
  .directive('questionHall', function ($rootScope, $window, lodash, WsUriBuilder, WsClient) {
    
    return {

    			scope: true,
                restrict: 'AE',
                replace: false,
                templateUrl: 'scripts/directives/questionHall.html',

                link: function($scope, elem, attrs) {

                    $scope.indexItemQuestionHall = 0;
                    $scope.showButtomOpportunity = false;


                    $scope.nextItemQuenstionHall = function(offer){

                        $scope.showButtomOpportunity = false;
                        $scope.indexItemQuestionHall += 1;

                    };




                    $scope.verifyAnswersQuestionHall = function(itemAnswer, offer){

                        $scope.itemAnswerSelected = itemAnswer; 

                        var answerList = offer.mainQuestion.answerList;
                        $scope.showButtomOpportunity = false;

                        for (var i = 0; answerList.length > i; i++) {
                            $('#answer_question_'+answerList[i]._id).css('display', 'none');
                        }
                  
                        switch(itemAnswer.action.type){

                            case 'do_nothing':
                                $scope.nextItemQuenstionHall();
                            break;

                            case 'delivery':
                                $scope.defineDeliveryStrategy(offer);
                            break;    

                            case 'confirm_user_fields':
                            case 'open_new_input_field':

                                $('#answer_question_'+itemAnswer._id).css('display', 'block');
                                $scope.showButtomOpportunity = true;

                            break;
                        }
                    };




                    $scope.defineDeliveryStrategy = function(itemAnswerSelected, offer){

                        switch(offer.delivery.questionHall.type){

                            case 'tb':
                                $window.open(offer.delivery.questionHall.targetBlankUrl);
                                $scope.nextItemQuenstionHall();
                                break;
                            

                            case 'ws':
                                $scope.deliveryWS(itemAnswerSelected, offer);
                                break;

                        }
                    };




                    $scope.deliveryWS = function(itemAnswerSelected, offer){
                        
                        if($scope.validateInputField(itemAnswerSelected)){
                            
                            $scope.executeWsInQuestionHall(offer, itemAnswerSelected);
                            $scope.nextItemQuenstionHall();
                        }                        
                    };




                    $scope.validateInputField = function(itemAnswerSelected){
                       
                        if(!$scope.showButtomOpportunity){
                            return false;
                        }

                        switch(itemAnswerSelected.action.type){

                            case 'open_new_input_field':
                                var value = $('#'+itemAnswerSelected._id+'_userfield_custom').val();
                                return (!lodash.isEmpty(value));
                                                            
                            case 'confirm_user_fields':
                                return $scope.validateUserInput(itemAnswerSelected.action.field);
                        }

                        return false;
                    };




                    $scope.validateUserInput = function(field){

                        switch(field){

                            case 'cellphone':
                                return (!lodash.isEmpty($scope.user.cellphone));
                            
                            case 'email':
                                return (!lodash.isEmpty($scope.user.email));
                            
                            case 'name':
                                return (!lodash.isEmpty($scope.user.name));

                            case 'zipcode':
                                return (!lodash.isEmpty($scope.user.address.zipcode));

                        }

                        return false;
                    };




                    $scope.executeWsInQuestionHall = function(offer, itemAnswerSelected){

                        var uri = '';

                        if(itemAnswerSelected.action.type === 'open_new_input_field'){
                            
                            var customKey   = itemAnswerSelected.action.fieldTag;
                            var customValue = $('#'+itemAnswerSelected._id+'_userfield_custom').val();

                            uri = WsUriBuilder.buildUriCustom(
                                $scope.user, 'questionHall', offer, customKey, customValue);

                            console.log('uri', uri);


                            WsClient.executeUri(uri, 'questionHall', offer, $scope.user);

                        
                        }else{

                            uri = WsUriBuilder.buildUri(
                                $scope.user, 'questionHall', offer);

                            console.log('uri', uri);
                            
                            WsClient.executeUri(uri, 'questionHall', offer, $scope.user);
                        }
                
                        
                       
                    };


                }
            };
  });
